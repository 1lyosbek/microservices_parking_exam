import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResData } from './resData';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: any, host: ArgumentsHost): void {
    
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    console.log("exception: ", exception);
    console.log("exception.message: ", exception.message);

    const responseBody = new ResData(
      '',
      HttpStatus.INTERNAL_SERVER_ERROR,
      null,
      exception,
    );

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      
      const response = exception.getResponse() as Error;

      if (typeof response === 'string') {
        responseBody.message = response;
      } else {
        responseBody.message = response?.message.toString();
      }
    } else if (exception instanceof HttpException) {
      const [message, status] = exception.message.split("_$_");
      responseBody.message = message;
      status ? responseBody.statusCode = Number(status) : responseBody.statusCode = 500;
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}