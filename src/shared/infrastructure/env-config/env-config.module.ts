import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';
import { EnvConfigService } from './env-config.service';

@Module({
  imports: [ConfigModule],
  providers: [
    EnvConfigService,
    { provide: 'EnvConfig', useClass: EnvConfigService },
  ],
  exports: [EnvConfigService, 'EnvConfig'],
})
export class EnvConfigModule extends ConfigModule {
  static async forRoot(
    options: ConfigModuleOptions = {},
  ): Promise<DynamicModule> {
    return await super.forRoot({
      ...options,
      isGlobal: true,
      envFilePath: [
        join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
      ],
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    });
  }
}
