import { Session } from '@/session/domain/session.entity';
import type { SessionRepository } from '@/session/domain/session.repository';
import { AuthConstants } from '@/shared/application/constants/auth-constants';
import { CookieOptions } from '@/shared/application/cookies/cookies';
import { UnauthorizedError } from '@/shared/application/errors/unauthorized-error';
import type { JwtService } from '@/shared/application/jwt/jwt.service';
import { UseCase } from '@/shared/application/usecases/use-case';
import type { Encryption } from '@/shared/application/utils/encryption';
import type { EnvConfig } from '@/shared/infrastructure/env-config/env-config.interface';
import type { UserRepository } from '@/user/domain/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { LoginOutput, LoginOutputMapper } from './outputs/login.output';

type Input = {
  email: string;
  password: string;
  token?: string;
  setCookie: (key: string, value: string, options?: CookieOptions) => void;
};
type Output = LoginOutput;

@Injectable()
export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('Encryption') private readonly encryption: Encryption,
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('EnvConfig') private readonly envConfig: EnvConfig,
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository,
    private readonly loginOutputMapper: LoginOutputMapper
  ) {}

  async execute({ setCookie, ...loginRequestDto }: Input): Promise<Output> {
    const user = await this.userRepository.findByUserEmail(
      loginRequestDto.email,
    );

    if (!user) {
      throw new UnauthorizedError();
    }

    if (!user.active) {
      throw new UnauthorizedError('Acesso não autorizado');
    }

    if (
      !user ||
      !user.password ||
      !this.encryption.compareHash(loginRequestDto.password, user.password)
    ) {
      throw new UnauthorizedError();
    }

    const tokenJti = crypto.randomUUID().toString();

    const { token } = await this.jwtService.generateJwt(user, {
      jti: tokenJti,
    });

    const jwtExpiresInSeconds = this.envConfig.getJwtExpiresInSeconds();

    const now = new Date();
    const expiresAt = new Date(now.getTime() + jwtExpiresInSeconds * 1000);

    const session = new Session({ jti: tokenJti, user, expiresAt });

    const isPreviousJwtValid = await this.jwtService.verifyJwt(
      loginRequestDto.token,
    );

    if (isPreviousJwtValid) {
      await this.sessionRepository.deleteByJti(isPreviousJwtValid.jti);
    }

    await this.sessionRepository.create(session);

    const options: CookieOptions = {
      httpOnly: true,
      maxAge: jwtExpiresInSeconds,
      path: '/',
      domain: this.envConfig.getCookieDomain(),
      secure: this.envConfig.getCookieSecure(),
      sameSite: this.envConfig.getCookieSameSite(),
    };

    setCookie(AuthConstants.tokenName, token, options);

    delete user.props.password;

    return this.loginOutputMapper.toOutput(user)
  }
}
