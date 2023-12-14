import { createUser } from './createUser';
import { getUserProfile } from './getUserProfile';
import { login } from './login';
import { logout } from './logout';

export interface IUserOperators {
  getUserProfile(): void;
  login(username: string, password: string): void;
  logout(): void;
  createUser(
    email: string,
    username: string,
    password: string,
    role?: 'admin' | 'manager'
  ): void;
  deleteUser(userId: string): void;
  getUsers(): void;
  createCategory(category: string): void;
  deleteUser(userId: string): void;
  getUsers(): void;
}

export { getUserProfile, login, logout, createUser };
