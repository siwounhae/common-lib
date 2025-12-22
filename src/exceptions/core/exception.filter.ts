import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BaseException } from "./base.exception";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception instanceof BaseException) {
      const status = exception.getStatus();
      return response.status(status).json({
        success: false,
        statusCode: status,
        errorCode: exception.code,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        typeof exceptionResponse === "string"
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
      return response.status(status).json({
        success: false,
        statusCode: status,
        errorCode: `HTTP_${status}`,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: "UNHANDLED_ERROR",
      message: "👾 알 수 없는 서버 에러",
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
