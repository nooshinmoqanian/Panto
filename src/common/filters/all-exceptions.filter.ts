import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const r = exception.getResponse();
      message = typeof r === 'string' ? r : ((r as any).message ?? r);
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
