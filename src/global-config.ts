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
import fastifyCookie from '@fastify/cookie';
import { UnauthorizedErrorFilter } from './shared/infrastructure/exception-filters/unauthorized-error.filter';
import { join } from 'path';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { StorageConstants } from './shared/application/constants/storage-constants';

export async function applyGlobalConfig(
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
    new UnauthorizedErrorFilter(),
  );

  app.enableCors({
    origin: envConfigService.getOrigin().split(','),
    methods: envConfigService.getAllowedMethods(),
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  await app.register(fastifyCookie, {
    secret: envConfigService.getCookieSecret(),
  });

  await app.register(multipart, {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    },
  });

  await app.register(fastifyStatic, {
    root: StorageConstants.dirPath,
    prefix:
      envConfigService.getNodeEnv() === 'production'
        ? '/storage'
        : '/api/storage',
  });
}
