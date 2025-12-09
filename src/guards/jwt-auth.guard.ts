import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

interface UserPayload {
  userId: string;
  accountId: string;
  role: string;
}

declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userPayloadJson = request.headers["x-user-payload"] as string;
    if (!userPayloadJson) {
      throw new UnauthorizedException("인증된 사용자 정보가 누락되었습니다.");
    }
    try {
      const payload: UserPayload = JSON.parse(userPayloadJson);
      request.user = payload;
      if (!request.user || !request.user.userId) {
        throw new UnauthorizedException("페이로드에 userId가 없습니다.");
      }
    } catch (e) {
      throw new UnauthorizedException("유효하지 않은 사용자 정보 형식입니다.");
    }
    return true;
  }
}
