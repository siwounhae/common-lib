import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { UserRole } from "../enums";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. 필요한 권한 메타데이터 먼저 읽기
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    console.log("Required Roles:", requiredRoles);

    // 권한 설정이 없으면 체크 없이 통과
    if (!requiredRoles) {
      return true;
    }

    // 2. Request 객체에서 user 꺼내기
    const request = context.switchToHttp().getRequest();
    const user = request.user; // JwtAuthGuard가 넣어준 유저 정보

    // 🔍 로그로 확인
    console.log("User found in request:", user);

    // 3. user가 없거나 role이 없으면 에러 방지를 위해 즉시 거절
    if (!user || !user.role) {
      console.log("RoleGuard: No user or role found in request");
      return false;
    }

    // 4. 권한 비교
    const hasRole = requiredRoles.some((role) => user.role === role);
    console.log("User Role from JWT:", user.role);
    console.log("Has Sufficient Role?:", hasRole);

    return hasRole;
  }
}
