import { HttpStatus } from "@nestjs/common";
import { BaseException } from "../core/base.exception";
import { ERROR_CODE } from "../core/error-code";

export class InsufficientRoleException extends BaseException {
  constructor(requiredRoles: string[], userRole?: string) {
    const roleList = requiredRoles.join(", ");
    const userRoleMsg = userRole ? ` (현재 권한: ${userRole})` : "";

    super(
      ERROR_CODE.AUTH_INSUFFICIENT_ROLE,
      `🔒 권한이 부족합니다. 필요한 권한: ${roleList}${userRoleMsg}`,
      HttpStatus.FORBIDDEN
    );
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message?: string) {
    super(
      ERROR_CODE.AUTH_UNAUTHORIZED,
      `🔐 ${message || "인증되지 않은 사용자입니다. 로그인이 필요합니다."}`,
      HttpStatus.UNAUTHORIZED
    );
  }
}
