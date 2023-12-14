export interface UserDTO {
  username: string;
  userId?: string;
  email?: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isManagerUser?: boolean;
  isDeleted?: boolean;
}
