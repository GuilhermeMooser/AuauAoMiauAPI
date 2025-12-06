/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalConfig } from './global-config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { EnvConfigService } from './shared/infrastructure/env-config/env-config.service';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const envConfigService = app.get(EnvConfigService);

  await applyGlobalConfig(app, envConfigService);

  await app.listen(envConfigService.getAppPort() ?? 3000);
}
bootstrap();
