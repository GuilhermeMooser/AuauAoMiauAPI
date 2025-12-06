import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSchema } from './session.schema';
import { SessionRepositoryImpl } from './session.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionSchema])],
  providers: [
    {
      provide: 'SessionRepository',
      useClass: SessionRepositoryImpl,
    },
  ],
  exports: ['SessionRepository'],
})
export class SessionModule {}
