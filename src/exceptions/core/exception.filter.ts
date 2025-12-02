import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { BaseException } from "./BaseException";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof BaseException) {
      const status = exception.getStatus();
      return response.status(status).json({
        success: false,
        statusCode: status,
        errorCode: exception.code,
        message: exception.message,
      });
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: "UNHANDLED_ERROR",
      message: "👾 알 수 없는 서버 에러",
    });
  }
}
