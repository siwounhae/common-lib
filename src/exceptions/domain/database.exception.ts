import { BaseException } from "../core/base.exception";
import { ErrorCode } from "../core/ErrorCode";
import { HttpStatus } from "@nestjs/common";

export class DatabaseFailedException extends BaseException {
  constructor(message?: string) {
    super(
      ErrorCode.DATABASE_OPERATION_FAILED,
      `👾 ${message} 데이터베이스 작업 중 알 수 없는 오류가 발생했습니다.`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
