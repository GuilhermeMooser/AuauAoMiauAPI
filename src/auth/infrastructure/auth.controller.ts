import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginPresenter } from './presenters/login.presenter';
import { LoginUseCase } from '../application/login.usecase';
import { AuthConstants } from '@/shared/application/constants/auth-constants';

@Controller('/api/auth/v1')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('/login')
  async login(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginPresenter> {
    return await this.loginUseCase.execute({
      ...loginRequestDto,
      token: request.cookies[AuthConstants.tokenName],
      setCookie: reply.setCookie.bind(reply),
    });
  }

  // @Post('/logout')
  // async logout(
  //   @Req() request: FastifyRequest,
  //   @Res({ passthrough: true }) reply: FastifyReply,
  // ): Promise<void> {
  //   return await this.logoutUseCase.execute({
  //     clearCookie: reply.clearCookie.bind(reply),
  //     token: request.cookies[AuthConstants.tokenName],
  //   });
  // }
}
