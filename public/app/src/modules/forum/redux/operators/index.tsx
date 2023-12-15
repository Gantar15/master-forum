import { Post, PostType } from '../../models/Post';

import { Comment } from '../../models/Comment';
import { createReplyToComment } from './createReplyToComment';
import { createReplyToPost } from './createReplyToPost';
import { creatingReplyToComment } from '../actionCreators';
import { deleteComment } from './deleteComment';
import { deletePost } from './deletePost';
import { downvoteComment } from './downvoteComment';
import { downvotePost } from './downvotePost';
import { getCommentByCommentId } from './getCommentByCommentId';
import { getCommentReplies } from './getCommentReplies';
import { getComments } from './getComments';
import { getPopularPosts } from './getPopularPosts';
import { getPostBySlug } from './getPostBySlug';
import { getPostsByCategory } from './getPostsByCategory';
import { getRecentPosts } from './getRecentPosts';
import { searchPosts } from './searchPosts';
import { setEditComment } from './setEditComment';
import { setEditPost } from './setEditPost';
import { submitPost } from './submitPost';
import { updateComment } from './updateComment';
import { updatePost } from './updatePost';
import { upvoteComment } from './upvoteComment';
import { upvotePost } from './upvotePost';

export interface IForumOperations {
  searchPosts(searchString: string): void;
  getPostsByCategory(category: string): void;
  getCategories(): void;
  updateComment(slug: string, text: string): void;
  deleteComment(commentId: string, postSlug?: string): void;
  updatePost(
    slug: string,
    title: string,
    type: PostType,
    category: string,
    text?: string,
    link?: string,
    tags?: string[]
  ): void;
  deletePost(postSlug: string): void;
  setEditComment(comment: Comment | undefined): void;
  setEditPost(post: Post): void;
  submitPost: (
    title: string,
    type: PostType,
    category: string,
    text?: string,
    link?: string,
    tags?: string[]
  ) => void;
  getRecentPosts: (offset?: number) => void;
  getPostBySlug(slug: string): void;
  createReplyToPost(text: string, slug: string): void;
  getComments(slug: string, offset?: number): void;
  getPopularPosts(offset?: number): void;
  getCommentByCommentId(commentId: string): void;
  createReplyToComment(
    comment: string,
    parentCommentId: string,
    slug: string
  ): void;
  getCommentReplies(slug: string, commentId: string, offset?: number): void;
  downvotePost(postSlug: string): void;
  upvotePost(postSlug: string): void;
  upvoteComment(commentId: string, slug: string): void;
  downvoteComment(commentId: string, slug: string): void;
}

export {
  searchPosts,
  getPostsByCategory,
  deleteComment,
  updateComment,
  deletePost,
  updatePost,
  setEditComment,
  setEditPost,
  submitPost,
  getRecentPosts,
  getPostBySlug,
  createReplyToPost,
  getComments,
  getPopularPosts,
  getCommentByCommentId,
  creatingReplyToComment,
  getCommentReplies,
  createReplyToComment,
  downvotePost,
  upvotePost,
  upvoteComment,
  downvoteComment
};
