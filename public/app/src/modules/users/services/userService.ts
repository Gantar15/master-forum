import { left, right } from '../../../shared/core/Either';

import { APIResponse } from '../../../shared/infra/services/APIResponse';
import { BaseAPI } from '../../../shared/infra/services/BaseAPI';
import { IAuthService } from './authService';
import { LoginDTO } from '../dtos/loginDTO';
import { Result } from '../../../shared/core/Result';
import { User } from '../models/user';

export interface IUsersService {
  getCurrentUserProfile(): Promise<User>;
  createUser(
    email: string,
    username: string,
    password: string
  ): Promise<APIResponse<User>>;
  login(username: string, password: string): Promise<APIResponse<LoginDTO>>;
  logout(): Promise<APIResponse<void>>;
}

export class UsersService extends BaseAPI implements IUsersService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  async getCurrentUserProfile(): Promise<User> {
    const response = await this.get('/users/me', null, {
      authorization: this.authService.getToken('access-token')
    });
    return response.data.user as User;
  }

  public async logout(): Promise<APIResponse<void>> {
    try {
      await this.post('/users/logout', null, null, {
        authorization: this.authService.getToken('access-token')
      });
      this.authService.removeToken('access-token');
      this.authService.removeToken('refresh-token');
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async login(
    username: string,
    password: string
  ): Promise<APIResponse<LoginDTO>> {
    try {
      const response = await this.post('/users/login', { username, password });
      const dto: LoginDTO = response.data as LoginDTO;
      this.authService.setToken('access-token', dto.accessToken);
      this.authService.setToken('refresh-token', dto.refreshToken);
      return right(Result.ok<LoginDTO>(dto));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async createUser(
    email: string,
    username: string,
    password: string,
    role?: 'admin' | 'manager'
  ): Promise<APIResponse<User>> {
    try {
      const response = await this.post(
        '/users',
        {
          email,
          username,
          password,
          role
        },
        null,
        role
          ? {
              authorization: this.authService.getToken('access-token')
            }
          : null
      );
      return right(Result.ok<User>(response.data.user));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async verifyEmail(code: string): Promise<APIResponse<void>> {
    try {
      await this.patch('/users/verify', {
        code
      });
      return right(Result.ok());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async getUsers(): Promise<APIResponse<User[]>> {
    try {
      const response = await this.get('/users', null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<User[]>(response.data.users));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async deleteUser(userId: string): Promise<APIResponse<void>> {
    try {
      await this.delete(`/users/${userId}`, null, null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async createCategory(category: string): Promise<APIResponse<void>> {
    try {
      await this.post(
        '/categories',
        {
          title: category
        },
        null,
        {
          authorization: this.authService.getToken('access-token')
        }
      );
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async getCategories(): Promise<APIResponse<string[]>> {
    try {
      const response = await this.get('/categories');
      return right(Result.ok<string[]>(response.data.categories));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async deleteCategory(category: string): Promise<APIResponse<void>> {
    try {
      await this.delete(`/categories/${category}`, null, null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
}
