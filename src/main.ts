import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalConfig } from './global-config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { EnvConfigService } from './shared/infrastructure/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const envConfigService = app.get(EnvConfigService);

  applyGlobalConfig(app, envConfigService);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
