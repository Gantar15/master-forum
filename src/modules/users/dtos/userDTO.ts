export interface UserDTO {
  username: string;
  userId?: string;
  email?: string;
  isEmailVerified?: boolean;
  emailVerificationCode?: string;
  isAdminUser?: boolean;
  isManagerUser?: boolean;
  isDeleted?: boolean;
}
