import { Module } from '@nestjs/common';
import { RoleRepositoryImpl } from './role.repository';
import { RoleSchema } from './role.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema]),],
  providers: [
    {
      provide: 'RoleRepository',
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: ['RoleRepository'],
})
export class RoleModule {}
