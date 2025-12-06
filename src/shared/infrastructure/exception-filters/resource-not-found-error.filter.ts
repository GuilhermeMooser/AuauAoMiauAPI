import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ResourceNotFoundError } from 'src/shared/application/errors/resource-not-found-error';

@Catch(ResourceNotFoundError)
export class ResourceNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}
