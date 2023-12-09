import { UserRole } from "../../domain/userRole";

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  isAdminUser?: boolean;
  role?: UserRole;
}
