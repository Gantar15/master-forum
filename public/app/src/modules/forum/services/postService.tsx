import { Post, PostType } from '../models/Post';
import { left, right } from '../../../shared/core/Either';

import { APIResponse } from '../../../shared/infra/services/APIResponse';
import { BaseAPI } from '../../../shared/infra/services/BaseAPI';
import { IAuthService } from '../../users/services/authService';
import { PostDTO } from '../dtos/postDTO';
import { PostUtil } from '../utils/PostUtil';
import { Result } from '../../../shared/core/Result';
import { result } from 'lodash';

export interface IPostService {
  createPost(
    title: string,
    type: PostType,
    category: string,
    text?: string,
    link?: string,
    tags?: string[]
  ): Promise<APIResponse<void>>;
  getRecentPosts(offset?: number): Promise<APIResponse<Post[]>>;
  getPopularPosts(offset?: number): Promise<APIResponse<Post[]>>;
  getPostsByCategory(categtory: string): Promise<APIResponse<Post[]>>;
  searchPosts(searchString: string): Promise<APIResponse<Post[]>>;
  deletePost(slug: string): Promise<APIResponse<Post>>;
  updatePost(
    slug: string,
    title: string,
    type: PostType,
    category: string,
    text?: string,
    link?: string,
    tags?: string[]
  ): Promise<APIResponse<Post>>;
  getPostBySlug(slug: string): Promise<APIResponse<Post>>;
  upvotePost(slug: string): Promise<APIResponse<void>>;
  downvotePost(slug: string): Promise<APIResponse<void>>;
}

export class PostService extends BaseAPI implements IPostService {
  constructor(authService: IAuthService) {
    super(authService);
  }
  async deletePost(slug: string): Promise<APIResponse<Post>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.delete(
        `/posts/${slug}`,
        null,
        null,
        isAuthenticated ? auth : null
      );

      return right(Result.ok(PostUtil.toViewModel(response.data.post)));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async updatePost(
    slug: string,
    title: string,
    type: PostType,
    category: string,
    text?: string | undefined,
    link?: string | undefined,
    tags?: string[] | undefined
  ): Promise<APIResponse<Post>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.patch(
        `/posts/${slug}`,
        { title, postType: type, text, link, category, tags },
        null,
        isAuthenticated ? auth : null
      );
      return right(Result.ok(PostUtil.toViewModel(response.data.post)));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async getPostsByCategory(categtory: string): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts',
        { categoryTitle: categtory },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async searchPosts(searchString: string): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts/search',
        { searchString: searchString },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getPostBySlug(slug: string): Promise<APIResponse<Post>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts',
        { slug },
        isAuthenticated ? auth : null
      );

      return right(Result.ok<Post>(PostUtil.toViewModel(response.data.post)));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getRecentPosts(offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts/recent',
        { offset },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getPopularPosts(offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.get(
        '/posts/popular',
        { offset },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async createPost(
    title: string,
    type: PostType,
    category: string,
    text?: string,
    link?: string,
    tags: string[] = []
  ): Promise<APIResponse<void>> {
    try {
      await this.post(
        '/posts',
        { title, postType: type, text, link, category, tags },
        null,
        {
          authorization: this.authService.getToken('access-token')
        }
      );
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async upvotePost(slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/posts/upvote', { slug }, null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async downvotePost(slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/posts/downvote', { slug }, null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
}
