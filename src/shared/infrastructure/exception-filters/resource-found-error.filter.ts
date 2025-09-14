import { ResourceFoundError } from "@/shared/application/errors/resource-found-error";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { FastifyReply } from 'fastify';

@Catch(ResourceFoundError)
export class ResourceFoundErrorFilter implements ExceptionFilter {
  catch(exception: ResourceFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}
