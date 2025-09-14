import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConflictErrorFilter } from './shared/infrastructure/exception-filters/conflict-error.filter';
import { ResourceFoundErrorFilter } from './shared/infrastructure/exception-filters/resource-found-error.filter';
import { ForbiddenErrorFilter } from './shared/infrastructure/exception-filters/forbidden.filter';

export function applyGlobalConfig(app: INestApplication) {
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
  );
}
