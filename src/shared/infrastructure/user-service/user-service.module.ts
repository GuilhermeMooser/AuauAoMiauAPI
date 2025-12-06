import { Global, Module } from '@nestjs/common';
import { LoggedUserServiceImpl } from './logged-user';

@Global()
@Module({
  providers: [
    {
      provide: 'LoggedUserService',
      useClass: LoggedUserServiceImpl,
    },
  ],
  exports: ['LoggedUserService'],
})
export class UserServiceModule {}
