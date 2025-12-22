import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { ROLES_KEY } from "../decorators/role.decorator";
import { UserRole, ROLE_HIERARCHY } from "../enums/user-role.enum";
import {
  InsufficientRoleException,
  UnauthorizedException,
} from "../exceptions/domain/role.exception";

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = Reflect.getMetadata(
      ROLES_KEY,
      context.getHandler()
    ) as UserRole[] | undefined;
    if (!requiredRoles || requiredRoles.length === 0) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new UnauthorizedException();
    const userAccessibleRoles = ROLE_HIERARCHY[user.role as UserRole] || [];
    const hasRole = requiredRoles.some((role) =>
      userAccessibleRoles.includes(role)
    );
    if (!hasRole) throw new InsufficientRoleException(requiredRoles, user.role);
    return true;
  }
}
