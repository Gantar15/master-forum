
export interface UserDTO {
  username: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isManagerUser?: boolean;
  isDeleted?: boolean;
}