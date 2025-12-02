import { BaseException } from "../core/BaseException";
import { ErrorCode } from "../core/ErrorCode";
import { HttpStatus } from "@nestjs/common";

// 사용자 인증 실패
export class AuthFailedException extends BaseException {
  constructor() {
    super(
      ErrorCode.AUTH_FAILED,
      `👾 사용자 인증에 실패했습니다.`,
      HttpStatus.UNAUTHORIZED
    );
  }
}

// 사용자 이미 존재
export class AuthUserAlreadyExistsException extends BaseException {
  constructor() {
    super(
      ErrorCode.AUTH_USER_ALREADY_EXISTS,
      `👾 요청하신 아이디는 이미 사용 중이거나 사용할 수 없습니다.`,
      HttpStatus.CONFLICT
    );
  }
}
