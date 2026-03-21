import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FastifyRequest } from 'fastify';
import { extname } from 'node:path';
import { FileDto } from '../dto/file.dto';

@Injectable()
export class ParseMultipartInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    if (!request.isMultipart()) {
      return next.handle();
    }

    const parts = request.parts();

    const result: Record<string, any> = {};

    for await (const part of parts) {
      if ('file' in part) {
        const buffer = await part.toBuffer();

        const extension = extname(part.filename);

        const file: FileDto = {
          buffer,
          filename: part.filename,
          extension,
        };

        if (result[part.fieldname]) {
          // Se já existe, transforma em array
          if (Array.isArray(result[part.fieldname])) {
            result[part.fieldname].push(file);
          } else {
            result[part.fieldname] = [result[part.fieldname], file];
          }
        } else {
          result[part.fieldname] = file;
        }
      } else {
        try {
          result[part.fieldname] = JSON.parse(part.value as string);
        } catch {
          result[part.fieldname] = part.value;
        }
      }
    }

    if (result.data && typeof result.data === 'object') {
      const { data, ...rest } = result;
      request.body = { ...data, ...rest };
    } else {
      request.body = result;
    }

    return next.handle().pipe(map((data) => data));
  }
}
