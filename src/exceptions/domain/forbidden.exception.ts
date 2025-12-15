import { BaseException } from "../core/base.exception";
import { ERROR_CODE } from "../core/error-code";
import { HttpStatus } from "@nestjs/common";

export class ForbiddenException extends BaseException {
  constructor(message?: string) {
    super(
      ERROR_CODE.DATABASE_OPERATION_FAILED,
      `👾 ${message} 관련 인증 권한이 없습니다.`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
