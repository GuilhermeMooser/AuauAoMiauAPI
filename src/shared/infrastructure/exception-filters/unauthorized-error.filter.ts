import { UnauthorizedError } from '@/shared/application/errors/unauthorized-error';
import { FastifyReply } from 'fastify';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}
