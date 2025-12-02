import { AuthProvider, UserRole } from "../../../enums";

// Internal
export interface IUserBasicDto {
  id: string;
  accountId: string;
  role: UserRole;
}

export interface IUserDetailDto extends IUserBasicDto {
  phone?: string;
  oauth: boolean;
  provider: AuthProvider;
  createdAt: Date;
}

// Request
export interface IGetUserReqDto {
  accountId: string;
}

export interface IValidateUserReqDto {
  accountId: string;
  password: string;
}

// Response
export interface IGetUserResDto {
  user: IUserDetailDto | null;
}

export interface IValidateUserResDto {
  isValid: boolean;
  user?: IUserDetailDto;
}
