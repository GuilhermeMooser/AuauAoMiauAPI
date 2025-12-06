import type { SessionRepository } from '@/session/domain/session.repository';
import { AuthConstants } from '@/shared/application/constants/auth-constants';
import { CookieOptions } from '@/shared/application/cookies/cookies';
import { UseCase } from '@/shared/application/usecases/use-case';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { Transaction } from '@/shared/infrastructure/database/decorators/transaction.decorator';
import type { EnvConfig } from '@/shared/infrastructure/env-config/env-config.interface';
import { Inject, Injectable } from '@nestjs/common';

type Input = {
  clearCookie: (key: string, options: CookieOptions) => void;
};
type Output = void;

@Injectable()
export class LogoutUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('EnvConfig')
    private readonly envConfig: EnvConfig,
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
  ) {}

  @Transaction()
  async execute({ clearCookie }: Input): Promise<Output> {
    const loggedUser = this.loggedUserService.getLoggedUser();

    await this.deleteSession(loggedUser.id);

    clearCookie(AuthConstants.tokenName, {
      httpOnly: true,
      maxAge: this.envConfig.getJwtExpiresInSeconds(),
      path: '/',
      domain: this.envConfig.getCookieDomain(),
      secure: this.envConfig.getCookieSecure(),
      sameSite: this.envConfig.getCookieSameSite(),
    });
  }

  private async deleteSession(userId: string) {
    await this.sessionRepository.deleteByUserId(userId);
  }
}
