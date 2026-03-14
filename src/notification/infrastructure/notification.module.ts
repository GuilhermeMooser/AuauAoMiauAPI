import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationUseCase } from '../application/notification.usecase';

@Module({
  controllers: [NotificationController],
  providers: [NotificationUseCase],
  exports: [NotificationUseCase],
})
export class NotificationModule {}
