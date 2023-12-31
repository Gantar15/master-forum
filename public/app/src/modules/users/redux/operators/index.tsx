import { createCategory } from './createCategory';
import { createUser } from './createUser';
import { deleteCategory } from './deleteCategory';
import { deleteUser } from './deleteUser';
import { getCategories } from './getCategories';
import { getUserProfile } from './getUserProfile';
import { getUsers } from './getUsers';
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
  deleteCategory(category: string): void;
  getCategories(): void;
}

export {
  getUserProfile,
  login,
  logout,
  createUser,
  deleteUser,
  getUsers,
  createCategory,
  deleteCategory,
  getCategories
};
