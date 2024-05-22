import { UserRole } from "../../domain/userRole";

export interface UpdateUserDTO {
  userId: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isAdminUser: boolean;
  isCurrentUser: boolean;
}
