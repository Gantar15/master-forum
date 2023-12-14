import { MemberId } from "../domain/memberId";
import { Post } from "../domain/post";
import { PostDetails } from "../domain/postDetails";
import { PostId } from "../domain/postId";
import { PostTitle } from "../domain/postTitle";
import { SearchString } from "../domain/SearchString";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface IPostRepo {
  getPostDetailsBySlug(slug: string, memberId?: MemberId): Promise<PostDetails>;
  getPostRawBySlug(slug: string): Promise<any>;
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
  searchByEs(
    searchString: SearchString,
    memberId?: MemberId
  ): Promise<PostDetails[]>;
  exists(postId: PostId): Promise<boolean>;
  updateTotalNumberComments(postId: PostId): Promise<void>;
  save(post: Post): Promise<PostDetails>;
  deleteBySlug(slug: string): Promise<PostDetails>;
  delete(postId: string): Promise<void>;
}
