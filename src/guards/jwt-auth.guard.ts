import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { UserPayload } from "src/interfaces";

declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const rawPayload = request.headers["x-user-payload"];
    if (!rawPayload || typeof rawPayload !== "string") {
      throw new UnauthorizedException("인증된 사용자 정보가 누락되었습니다.");
    }
    let payload: UserPayload;
    try {
      payload = JSON.parse(rawPayload);
    } catch {
      throw new UnauthorizedException("유효하지 않은 사용자 정보 형식입니다.");
    }
    if (!payload.userId) {
      throw new UnauthorizedException("페이로드에 userId가 없습니다.");
    }
    request.user = payload;
    return true;
  }
}
