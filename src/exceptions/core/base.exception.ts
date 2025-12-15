import { HttpException, HttpStatus } from "@nestjs/common";
import { ERROR_CODE } from "./error-code";

export class BaseException extends HttpException {
  public readonly code: ERROR_CODE;

  constructor(
    code: ERROR_CODE,
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message, status);
    this.code = code;
  }
}
