import { HttpStatus } from "@nestjs/common";
import { CustomException } from "../custum.exception";

export class MicroserviceUnavailableException extends CustomException {
  constructor() {
    super(
      "📡 마이크로서비스에 연결할 수 없습니다. 서버 상태를 확인해주세요.",
      HttpStatus.SERVICE_UNAVAILABLE
    );
  }
}
