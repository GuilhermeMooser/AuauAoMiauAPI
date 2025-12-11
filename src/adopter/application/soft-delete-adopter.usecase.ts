import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AdopterRepository } from '../domain/adopter.repository';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import type { AdopterContactRepository } from '@/adopter-contact/domain/adopter-contact.repository';
import type { AdopterAddressRepository } from '@/adopter-address/domain/adopter-address.repository';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';

type Input = {
  id: string;
};

type Output = void;

@Injectable()
export class SoftDeleteAdopterUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    @Inject('AdopterContactRepository')
    private readonly adopterContactRepository: AdopterContactRepository,
    @Inject('AdopterAddressRepository')
    private readonly adopterAddressRepository: AdopterAddressRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const adopter = await this.adopterRepository.findById(input.id);

    if (!adopter) {
      throw new NotFoundError('Adotante não encontrado!');
    }

    await Promise.all([
      this.adopterAddressRepository.softDeleteById(input.id),
      this.adopterContactRepository.softDeleteById(input.id),
    ]);

    const loggedUser = this.loggedUserService.getLoggedUser();
    await this.adopterRepository.softDeleteByUserId(input.id, loggedUser.id);
  }
}
