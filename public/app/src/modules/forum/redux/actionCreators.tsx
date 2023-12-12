import * as actions from './actions';

import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

export type ForumAction = { [key: string]: actions.ForumActionType | any };

//get categories

function getPostsByCategory(): ForumAction {
  return {
    type: actions.GET_POSTS_BY_CATEGORY
  };
}

function getPostsByCategorySuccess(
  posts: Post[]
): ForumAction & { posts: Post[] } {
  return {
    type: actions.GET_POSTS_BY_CATEGORY_SUCCESS,
    posts
  };
}

function getPostsByCategoryFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GET_POSTS_BY_CATEGORY_FAILURE,
    error
  };
}

//get categories

function getCategories(): ForumAction {
  return {
    type: actions.GET_CATEGORIES
  };
}

function getCategoriesSuccess(
  categories: string[]
): ForumAction & { categories: string[] } {
  return {
    type: actions.GET_CATEGORIES_SUCCESS,
    categories
  };
}

function getCategoriesFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GET_CATEGORIES_FAILURE,
    error
  };
}

//delete post

function deletePost(): ForumAction {
  return {
    type: actions.DELETE_POST
  };
}

function deletePostSuccess(post: Post): ForumAction & { post: Post } {
  return {
    type: actions.DELETE_POST_SUCCESS,
    post
  };
}

function deletePostFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.DELETE_POST_FAILURE,
    error
  };
}

//update post
function updatePost(): ForumAction {
  return {
    type: actions.UPDATE_POST
  };
}

function updatePostSuccess(post: Post): ForumAction & { post: Post } {
  return {
    type: actions.UPDATE_POST_SUCCESS,
    post
  };
}

function updatePostFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.UPDATE_POST_FAILURE,
    error
  };
}

function setEditPost(editPost: Post): ForumAction & { editPost: Post } {
  return {
    type: actions.SET_EDIT_POST,
    editPost
  };
}

//delete comment

function deleteComment(): ForumAction {
  return {
    type: actions.DELETE_COMMENT
  };
}

function deleteCommentSuccess(
  comment: Comment
): ForumAction & { comment: Comment } {
  return {
    type: actions.DELETE_COMMENT_SUCCESS,
    comment
  };
}

function deleteCommentFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.DELETE_COMMENT_FAILURE,
    error
  };
}

//update comment

function updateComment(): ForumAction {
  return {
    type: actions.UPDATE_COMMENT
  };
}

function updateCommentSuccess(
  comment: Comment
): ForumAction & { comment: Comment } {
  return {
    type: actions.UPDATE_COMMENT_SUCCESS,
    comment
  };
}

function updateCommentFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.UPDATE_COMMENT_FAILURE,
    error
  };
}

function setEditComment(
  editComment: Comment
): ForumAction & { editComment: Comment } {
  return {
    type: actions.SET_EDIT_COMMENT,
    editComment
  };
}

//submit post

function submittingPost(): ForumAction {
  return {
    type: actions.SUBMITTING_POST
  };
}

function submittingPostSuccess(): ForumAction {
  return {
    type: actions.SUBMITTING_POST_SUCCESS
  };
}

function submittingPostFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.SUBMITTING_POST_FAILURE,
    error
  };
}

//get recent posts

function getRecentPosts(): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS
  };
}

function getRecentPostsSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS_SUCCESS,
    posts
  };
}

function getRecentPostsFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_RECENT_POSTS_FAILURE,
    error
  };
}

//get post by slug

function gettingPostBySlug(): ForumAction {
  return {
    type: actions.GETTING_POST_BY_SLUG
  };
}

function gettingPostBySlugSuccess(post: Post): ForumAction & { post: Post } {
  return {
    type: actions.GETTING_POST_BY_SLUG_SUCCESS,
    post
  };
}

function gettingPostBySlugFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POST_BY_SLUG_FAILURE,
    error
  };
}

//create reply to post

function creatingReplyToPost(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST
  };
}

function creatingReplyToPostSuccess(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_SUCCESS
  };
}

function creatingReplyToPostFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_FAILURE,
    error
  };
}

//get comments

function gettingComments(): ForumAction {
  return {
    type: actions.GETTING_COMMENTS
  };
}

function gettingCommentsSuccess(comments: Comment[]): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_SUCCESS,
    comments
  };
}

function gettingCommentsFailure(error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_FAILURE,
    error
  };
}

//get popular posts

function getPopularPosts(): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS
  };
}

function getPopularPostsSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS_SUCCESS,
    posts
  };
}

function getPopularPostsFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POPULAR_POSTS_FAILURE,
    error
  };
}

//get comment by comment id

function gettingCommentByCommentId(): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID
  };
}

function gettingCommentByCommentIdSuccess(comment: Comment): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID_SUCCESS,
    comment
  };
}

function gettingCommentByCommentIdFailure(error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID_FAILURE,
    error
  };
}

//create reply to comment

function creatingReplyToComment(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT
  };
}

function creatingReplyToCommentSuccess(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT_SUCCESS
  };
}

function creatingReplyToCommentFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT_FAILURE,
    error
  };
}

//upvote post

function upvotingPost(): ForumAction {
  return {
    type: actions.UPVOTING_POST
  };
}

function upvotingPostSuccess(postSlug: string): ForumAction {
  return {
    type: actions.UPVOTING_POST_SUCCESS,
    postSlug
  };
}

function upvotingPostFailure(error: string): ForumAction {
  return {
    type: actions.UPVOTING_POST_FAILURE,
    error
  };
}

//downvote post

function downvotingPost(): ForumAction {
  return {
    type: actions.DOWNVOTING_POST
  };
}

function downvotingPostSuccess(postSlug: string): ForumAction {
  return {
    type: actions.DOWNVOTING_POST_SUCCESS,
    postSlug
  };
}

function downvotingPostFailure(error: string): ForumAction {
  return {
    type: actions.DOWNVOTING_POST_FAILURE,
    error
  };
}

//upvote comment

function upvotingComment(): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT
  };
}

function upvotingCommentSuccess(commentId: string): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT_SUCCESS,
    commentId
  };
}

function upvotingCommentFailure(error: string): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT_FAILURE,
    error
  };
}

//downvote comment

function downvotingComment(): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT
  };
}

function downvotingCommentSuccess(commentId: string): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT_SUCCESS,
    commentId
  };
}

function downvotingCommentFailure(error: string): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT_FAILURE,
    error
  };
}

export {
  updatePost,
  updatePostSuccess,
  updatePostFailure,
  deletePost,
  deletePostSuccess,
  deletePostFailure,
  updateComment,
  updateCommentSuccess,
  updateCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
  getPostsByCategory,
  getPostsByCategorySuccess,
  getPostsByCategoryFailure,
  getCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
  setEditComment,
  setEditPost,
  submittingPost,
  submittingPostSuccess,
  submittingPostFailure,
  getRecentPosts,
  getRecentPostsSuccess,
  getRecentPostsFailure,
  gettingPostBySlug,
  gettingPostBySlugSuccess,
  gettingPostBySlugFailure,
  creatingReplyToPost,
  creatingReplyToPostSuccess,
  creatingReplyToPostFailure,
  gettingComments,
  gettingCommentsSuccess,
  gettingCommentsFailure,
  getPopularPosts,
  getPopularPostsSuccess,
  getPopularPostsFailure,
  gettingCommentByCommentId,
  gettingCommentByCommentIdSuccess,
  gettingCommentByCommentIdFailure,
  creatingReplyToComment,
  creatingReplyToCommentSuccess,
  creatingReplyToCommentFailure,
  upvotingPost,
  upvotingPostSuccess,
  upvotingPostFailure,
  downvotingPost,
  downvotingPostSuccess,
  downvotingPostFailure,
  upvotingComment,
  upvotingCommentSuccess,
  upvotingCommentFailure,
  downvotingComment,
  downvotingCommentSuccess,
  downvotingCommentFailure
};
