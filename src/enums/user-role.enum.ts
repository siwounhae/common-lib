export enum UserRole {
  USER = "user",
  OWNER = "owner",
  ADMIN = "admin",
}

export const { USER, OWNER, ADMIN } = UserRole;

export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.OWNER, UserRole.USER],
  [UserRole.OWNER]: [UserRole.OWNER, UserRole.USER],
  [UserRole.USER]: [UserRole.USER],
};
