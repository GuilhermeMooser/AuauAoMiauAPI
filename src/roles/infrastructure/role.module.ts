import { Module } from '@nestjs/common';
import { RoleRepositoryImpl } from './role.repository';

@Module({
  providers: [
    {
      provide: 'RoleRepository',
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [],
})
export class RoleModule {}
