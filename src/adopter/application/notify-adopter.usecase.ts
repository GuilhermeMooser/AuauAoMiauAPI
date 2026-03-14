import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { AdopterRepository } from '../domain/adopter.repository';
import { Cron } from '@nestjs/schedule';
import { Adopter } from '../domain/adopter.entity';
import { NotificationUseCase } from '@/notification/application/notification.usecase';

type Input = void;
type Output = void;

@Injectable()
export class NotifyAdopterUseCase implements UseCase<Input, Output> {
  private readonly logger = new Logger(NotifyAdopterUseCase.name);

  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    private readonly notificationUseCase: NotificationUseCase,
  ) {}

  @Cron('0 7 * * *')
  // @Cron('*/1 * * * *') //TODO TESTE
  async execute(): Promise<void> {
    this.logger.log('Verificando adotantes para notificar...');

    const today = new Date();

    // Interval of actual day: 00:00:00 até 23:59:59
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const adoptersToNotify =
      await this.adopterRepository.findAdoptersByDtNotification(
        startOfDay,
        endOfDay,
      );

    if (!adoptersToNotify.length) {
      this.logger.log('Nenhum adotante para notificar hoje.');
      return;
    }

    this.logger.log(`${adoptersToNotify.length} adotante(s) para notificar.`);

    await Promise.allSettled(
      adoptersToNotify.map(adopter => this.notify(adopter)),
    );
  }

  private async notify(adopter: Adopter): Promise<void> {
    try {
      this.logger.log(
        `Notificando adotante: ${adopter.name} (${adopter.email})`,
      );

      const adopterPrincipalContact = adopter.contacts.find(
        c => c.props.isPrincipal,
      )?.props.value;

      this.notificationUseCase.emitToAll({
        adoptersCount: 1,
        adopters: [
          {
            id: adopter.id,
            name: adopter.name,
            email: adopter.email,
            phone: adopterPrincipalContact,
          },
        ],
      });

      // Exemplo: após notificar, limpa a data para não renotificar
      await this.adopterRepository.update({
        id: adopter.id,
        activeNotification: false,
        dtToNotify: null,
      });
    } catch (error) {
      this.logger.error(`Erro ao notificar ${adopter.email}:`, error);
    }
  }
}
