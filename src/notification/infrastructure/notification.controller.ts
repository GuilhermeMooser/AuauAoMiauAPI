// notification/notification.controller.ts
import { Controller, Delete, Get, Param, Req, Sse, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { FastifyRequest } from 'fastify';
import { Inject } from '@nestjs/common';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { NotificationUseCase } from '../application/notification.usecase';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';

@UseGuards(AuthGuard)
@Controller('/api/notifications/v1')
export class NotificationController {
  constructor(
    private readonly notificationUseCase: NotificationUseCase,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
  ) {}

  @Sse('stream')
  stream(@Req() req: FastifyRequest): Observable<MessageEvent> {
    const user = this.loggedUserService.getLoggedUser();
    const userId = user?.id;

    req.socket.on('close', () => this.notificationUseCase.removeStream(userId));

    return this.notificationUseCase.getStream(userId);
  }

  @Get('pending')
  getPending() {
    return this.notificationUseCase.getPending();
  }

  @Delete('pending')
  clearPending() {
    this.notificationUseCase.clearPending();
    return { ok: true };
  }

  @Delete('pending/:adopterId')
  removePending(@Param('adopterId') adopterId: string) {
    this.notificationUseCase.removePending(adopterId);
    return { ok: true };
  }
}
