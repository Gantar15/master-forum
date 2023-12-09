import { MemberId } from "../domain/memberId";
import { Post } from "../domain/post";
import { PostDetails } from "../domain/postDetails";
import { PostId } from "../domain/postId";
import { PostTitle } from "../domain/postTitle";
import { SearchString } from "../domain/SearchString";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface IPostRepo {
  getPostDetailsBySlug(slug: string, memberId?: MemberId): Promise<PostDetails>;
  getPostBySlug(slug: string): Promise<Post>;
  getRecentPosts(offset?: number, memberId?: MemberId): Promise<PostDetails[]>;
  getPopularPosts(offset?: number, memberId?: MemberId): Promise<PostDetails[]>;
  getPostsByCategory(
    categoryId: UniqueEntityID,
    memberId?: MemberId
  ): Promise<PostDetails[]>;
  getNumberOfCommentsByPostId(postId: PostId | string): Promise<number>;
  getPostByPostId(postId: PostId | string): Promise<Post>;
  getPostByTitle(postTitle: PostTitle): Promise<Post>;
  search(
    searchString: SearchString,
    memberId?: MemberId
  ): Promise<PostDetails[]>;
  exists(postId: PostId): Promise<boolean>;
  save(post: Post): Promise<void>;
  deleteBySlug(slug: string): Promise<void>;
  delete(postId: PostId): Promise<void>;
}
