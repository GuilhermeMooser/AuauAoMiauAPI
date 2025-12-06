/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../env-config/env-config.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigService } from '../env-config/env-config.service';
import { JwtServiceImpl } from './jwt.service';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getJwtExpiresInSeconds(),
        },
      }),
      inject: [EnvConfigService],
    }),
  ],
  controllers: [],
  providers: [{ provide: 'JwtService', useClass: JwtServiceImpl }],
  exports: ['JwtService'],
})
export class JwtConfigModule {}
