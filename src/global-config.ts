import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConflictErrorFilter } from './shared/infrastructure/exception-filters/conflict-error.filter';
import { ResourceFoundErrorFilter } from './shared/infrastructure/exception-filters/resource-found-error.filter';
import { ForbiddenErrorFilter } from './shared/infrastructure/exception-filters/forbidden.filter';
import { NotFoundErrorFilter } from './shared/infrastructure/exception-filters/not-found-error.filter';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvConfigService } from './shared/infrastructure/env-config/env-config.service';

export function applyGlobalConfig(
  app: NestFastifyApplication,
  envConfigService: EnvConfigService,
) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(
    new ConflictErrorFilter(),
    new ResourceFoundErrorFilter(),
    new ForbiddenErrorFilter(),
    new NotFoundErrorFilter(),
  );

  app.enableCors({
    origin: envConfigService.getOrigin().split(','),
    methods: envConfigService.getAllowedMethods(),
    preflightContinue: false,
    optionsSuccessStatus: 204,
    // credentials: true,
  });
}
