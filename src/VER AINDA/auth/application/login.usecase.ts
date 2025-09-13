// import { UseCase } from '@/shared/application/usecases/use-case';
// import type { UserRepository } from '@/users/domain/user.repository';
// import {
//   ForbiddenException,
//   Inject,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';

// type Input = {
//   email: string;
//   password: string;
//   userAgent: string;
//   ipAddress: string;
// };
// type Output = any;

// @Injectable()
// export class LoginUseCase implements UseCase<Input, Output> {
//   constructor(
//     @Inject('UserRepository') private readonly userRepository: UserRepository,
//   ) {}

//   async execute({
//     email,
//     password,
//     ipAddress,
//     userAgent,
//   }: Input): Promise<Output> {
//     const user = await this.userRepository.findByUserEmail(email);

//     if (!user) {
//       throw new UnauthorizedException('Credenciais inválidas');
//     }

//     if (!user.active) {
//       throw new ForbiddenException('Conta desativada');
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Credenciais inválidas');
//     }

//     // Atualizar último login
//     user.lastLoginAt = new Date();
//     user.lastLoginIp = ipAddress;
//     await this.userRepo.update(user);

//     // Criar nova sessão
//     const session = await this.createUserSession(user, userAgent, ipAddress);

//     // Gerar tokens
//     const { accessToken, refreshToken } = await this.generateTokens(
//       user,
//       session.id,
//     );

//     // Salvar refresh token na sessão
//     session.refreshToken = await this.hashRefreshToken(refreshToken);
//     await this.sessionRepo.save(session);

//     return {
//       user: this.sanitizeUser(user),
//       accessToken,
//       refreshToken,
//       session: {
//         id: session.id,
//         userAgent: session.userAgent,
//         location: session.location,
//       },
//     };
//   }
// }
