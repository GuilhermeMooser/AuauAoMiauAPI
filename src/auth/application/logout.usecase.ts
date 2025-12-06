// import { SessionRepository } from '@/session/domain/session.repository';
// import { CookieOptions } from '@/shared/application/cookies/cookies';
// import { UseCase } from '@/shared/application/usecases/use-case';
// import { EnvConfig } from '@/shared/infrastructure/env-config/env-config.interface';
// import { Inject, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// type Input = {
//   token: string;
//   clearCookie: (key: string, options: CookieOptions) => void;
// };
// type Output = void;

// @Injectable()
// export class LogoutUseCase implements UseCase<Input, Output> {
//   constructor(
//     @Inject('EnvConfig')
//     private readonly envConfig: EnvConfig,
//     @Inject('SessionRepository')
//     private readonly sessionRepository: SessionRepository,
//     @Inject('LoggedUserService')
//     private readonly loggedUserService: LoggedUserService,
//     @Inject('JwtService')
//     private readonly jwtService: JwtService,
//   ) {}

//   async execute(input: Input): Promise<Output> {
//     throw new Error('Method not implemented.');
//   }
// }
