// import { Public } from '@/shared/infrastructure/decorators/public.decorator';
// import { ThrottleShort } from '@/shared/infrastructure/decorators/throttle.decorator';
// import {
//   Body,
//   Controller,
//   HttpCode,
//   HttpStatus,
//   Post,
//   Req,
//   Res,
// } from '@nestjs/common';
// import { LoginRequestDto } from './dto/login-request.dto';
// import type { Response, Request } from 'express';
// import { LoginUseCase } from '../application/login.usecase';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly loginUseCase: LoginUseCase) {}

//   @Public()
//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @ThrottleShort()
//   async login(
//     @Body() loginRequestDto: LoginRequestDto,
//     @Res({ passthrough: true }) response: Response,
//     @Req() request: Request,
//   ) {
//     const userAgent = request.get('User-Agent') || '';
//     const ipAddress = request.ip || request.socket.remoteAddress || '';

//     const result = await this.loginUseCase.execute({
//       ...loginRequestDto,
//       userAgent,
//       ipAddress,
//     });

//     // this.setAuthCookies(response, result.accessToken, result.refreshToken);

//     // return {
//     //   user: result.user,
//     //   session: result.session,
//     // };
//     return null;
//   }
// }
