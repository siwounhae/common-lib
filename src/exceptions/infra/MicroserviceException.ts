import { BaseException } from "../core/BaseException";
import { ErrorCode } from "../core/ErrorCode";
import { HttpStatus } from "@nestjs/common";

export class MicroserviceException extends BaseException {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.INFRA_GATEWAY_ERROR
  ) {
    let status: HttpStatus;
    let baseMessage: string;

    if (code === ErrorCode.INFRA_RPC_TIMEOUT) {
      status = HttpStatus.GATEWAY_TIMEOUT;
      baseMessage = "📡 마이크로서비스 응답 시간이 초과되었습니다.";
    } else {
      status = HttpStatus.BAD_GATEWAY;
      baseMessage = "📡 마이크로서비스 통신 오류가 발생했습니다.";
    }

    super(code, `${baseMessage} (세부 정보: ${message})`, status);
  }
}
