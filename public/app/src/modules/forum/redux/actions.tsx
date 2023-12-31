export type ForumActionType =
  | 'UPDATE_POST'
  | 'UPDATE_POST_SUCCESS'
  | 'UPDATE_POST_FAILURE'
  | 'DELETE_POST'
  | 'DELETE_POST_SUCCESS'
  | 'DELETE_POST_FAILURE'
  | 'UPDATE_COMMENT'
  | 'UPDATE_COMMENT_SUCCESS'
  | 'UPDATE_COMMENT_FAILURE'
  | 'DELETE_COMMENT'
  | 'DELETE_COMMENT_SUCCESS'
  | 'DELETE_COMMENT_FAILURE'
  | 'GET_POSTS_BY_CATEGORY'
  | 'GET_POSTS_BY_CATEGORY_SUCCESS'
  | 'GET_POSTS_BY_CATEGORY_FAILURE'
  | 'SEARCH_POSTS'
  | 'SEARCH_POSTS_SUCCESS'
  | 'SEARCH_POSTS_FAILURE'
  | 'SET_EDIT_POST'
  | 'SET_EDIT_COMMENT'
  | 'SUBMITTING_POST'
  | 'SUBMITTING_POST_SUCCESS'
  | 'SUBMITTING_POST_FAILURE'
  | 'GETTING_RECENT_POSTS'
  | 'GETTING_RECENT_POSTS_SUCCESS'
  | 'GETTING_RECENT_POSTS_FAILURE'
  | 'GETTING_POST_BY_SLUG'
  | 'GETTING_POST_BY_SLUG_SUCCESS'
  | 'GETTING_POST_BY_SLUG_FAILURE'
  | 'CREATING_REPLY_TO_POST'
  | 'CREATING_REPLY_TO_POST_SUCCESS'
  | 'CREATING_REPLY_TO_POST_FAILURE'
  | 'GETTING_COMMENTS'
  | 'GETTING_COMMENTS_SUCCESS'
  | 'GETTING_COMMENTS_FAILURE'
  | 'GETTING_POPULAR_POSTS'
  | 'GETTING_POPULAR_POSTS_SUCCESS'
  | 'GETTING_POPULAR_POSTS_FAILURE'
  | 'GETTING_COMMENT_BY_COMMENT_ID'
  | 'GETTING_COMMENT_BY_COMMENT_ID_SUCCESS'
  | 'GETTING_COMMENT_BY_COMMENT_ID_FAILURE'
  | 'CREATING_REPLY_TO_COMMENT'
  | 'CREATING_REPLY_TO_COMMENT_SUCCESS'
  | 'CREATING_REPLY_TO_COMMENT_FAILURE'
  | 'UPVOTING_POST'
  | 'UPVOTING_POST_SUCCESS'
  | 'UPVOTING_POST_FAILURE'
  | 'DOWNVOTING_POST'
  | 'DOWNVOTING_POST_SUCCESS'
  | 'DOWNVOTING_POST_FAILURE'
  | 'UPVOTING_COMMENT'
  | 'UPVOTING_COMMENT_SUCCESS'
  | 'UPVOTING_COMMENT_FAILURE'
  | 'DOWNVOTING_COMMENT'
  | 'DOWNVOTING_COMMENT_SUCCESS'
  | 'DOWNVOTING_COMMENT_FAILURE';

const UPDATE_POST: ForumActionType = 'UPDATE_POST';
const UPDATE_POST_SUCCESS: ForumActionType = 'UPDATE_POST_SUCCESS';
const UPDATE_POST_FAILURE: ForumActionType = 'UPDATE_POST_FAILURE';
const DELETE_POST: ForumActionType = 'DELETE_POST';
const DELETE_POST_SUCCESS: ForumActionType = 'DELETE_POST_SUCCESS';
const DELETE_POST_FAILURE: ForumActionType = 'DELETE_POST_FAILURE';
const UPDATE_COMMENT: ForumActionType = 'UPDATE_COMMENT';
const UPDATE_COMMENT_SUCCESS: ForumActionType = 'UPDATE_COMMENT_SUCCESS';
const UPDATE_COMMENT_FAILURE: ForumActionType = 'UPDATE_COMMENT_FAILURE';
const DELETE_COMMENT: ForumActionType = 'DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS: ForumActionType = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE: ForumActionType = 'DELETE_COMMENT_FAILURE';
const SEARCH_POSTS: ForumActionType = 'SEARCH_POSTS';
const SEARCH_POSTS_SUCCESS: ForumActionType = 'SEARCH_POSTS_SUCCESS';
const SEARCH_POSTS_FAILURE: ForumActionType = 'SEARCH_POSTS_FAILURE';
const GET_POSTS_BY_CATEGORY: ForumActionType = 'GET_POSTS_BY_CATEGORY';
const GET_POSTS_BY_CATEGORY_SUCCESS: ForumActionType =
  'GET_POSTS_BY_CATEGORY_SUCCESS';
const GET_POSTS_BY_CATEGORY_FAILURE: ForumActionType =
  'GET_POSTS_BY_CATEGORY_FAILURE';
const SET_EDIT_POST: ForumActionType = 'SET_EDIT_POST';
const SET_EDIT_COMMENT: ForumActionType = 'SET_EDIT_COMMENT';
const SUBMITTING_POST: ForumActionType = 'SUBMITTING_POST';
const SUBMITTING_POST_SUCCESS: ForumActionType = 'SUBMITTING_POST_SUCCESS';
const SUBMITTING_POST_FAILURE: ForumActionType = 'SUBMITTING_POST_FAILURE';

const GETTING_RECENT_POSTS: ForumActionType = 'GETTING_RECENT_POSTS';
const GETTING_RECENT_POSTS_SUCCESS: ForumActionType =
  'GETTING_RECENT_POSTS_SUCCESS';
const GETTING_RECENT_POSTS_FAILURE: ForumActionType =
  'GETTING_RECENT_POSTS_FAILURE';

const GETTING_POST_BY_SLUG: ForumActionType = 'GETTING_POST_BY_SLUG';
const GETTING_POST_BY_SLUG_SUCCESS: ForumActionType =
  'GETTING_POST_BY_SLUG_SUCCESS';
const GETTING_POST_BY_SLUG_FAILURE: ForumActionType =
  'GETTING_POST_BY_SLUG_FAILURE';

const CREATING_REPLY_TO_POST: ForumActionType = 'CREATING_REPLY_TO_POST';
const CREATING_REPLY_TO_POST_SUCCESS: ForumActionType =
  'CREATING_REPLY_TO_POST_SUCCESS';
const CREATING_REPLY_TO_POST_FAILURE: ForumActionType =
  'CREATING_REPLY_TO_POST_FAILURE';

const GETTING_COMMENTS: ForumActionType = 'GETTING_COMMENTS';
const GETTING_COMMENTS_SUCCESS: ForumActionType = 'GETTING_COMMENTS_SUCCESS';
const GETTING_COMMENTS_FAILURE: ForumActionType = 'GETTING_COMMENTS_FAILURE';

const GETTING_POPULAR_POSTS: ForumActionType = 'GETTING_POPULAR_POSTS';
const GETTING_POPULAR_POSTS_SUCCESS: ForumActionType =
  'GETTING_POPULAR_POSTS_SUCCESS';
const GETTING_POPULAR_POSTS_FAILURE: ForumActionType =
  'GETTING_POPULAR_POSTS_FAILURE';

const GETTING_COMMENT_BY_COMMENT_ID: ForumActionType =
  'GETTING_COMMENT_BY_COMMENT_ID';
const GETTING_COMMENT_BY_COMMENT_ID_SUCCESS: ForumActionType =
  'GETTING_COMMENT_BY_COMMENT_ID_SUCCESS';
const GETTING_COMMENT_BY_COMMENT_ID_FAILURE: ForumActionType =
  'GETTING_COMMENT_BY_COMMENT_ID_FAILURE';

const CREATING_REPLY_TO_COMMENT: ForumActionType = 'CREATING_REPLY_TO_COMMENT';
const CREATING_REPLY_TO_COMMENT_SUCCESS: ForumActionType =
  'CREATING_REPLY_TO_COMMENT_SUCCESS';
const CREATING_REPLY_TO_COMMENT_FAILURE: ForumActionType =
  'CREATING_REPLY_TO_COMMENT_FAILURE';

const UPVOTING_POST: ForumActionType = 'UPVOTING_POST';
const UPVOTING_POST_SUCCESS: ForumActionType = 'UPVOTING_POST_SUCCESS';
const UPVOTING_POST_FAILURE: ForumActionType = 'UPVOTING_POST_FAILURE';

const DOWNVOTING_POST: ForumActionType = 'DOWNVOTING_POST';
const DOWNVOTING_POST_SUCCESS: ForumActionType = 'DOWNVOTING_POST_SUCCESS';
const DOWNVOTING_POST_FAILURE: ForumActionType = 'DOWNVOTING_POST_FAILURE';

const UPVOTING_COMMENT: ForumActionType = 'UPVOTING_COMMENT';
const UPVOTING_COMMENT_SUCCESS: ForumActionType = 'UPVOTING_COMMENT_SUCCESS';
const UPVOTING_COMMENT_FAILURE: ForumActionType = 'UPVOTING_COMMENT_FAILURE';

const DOWNVOTING_COMMENT: ForumActionType = 'DOWNVOTING_COMMENT';
const DOWNVOTING_COMMENT_SUCCESS: ForumActionType =
  'DOWNVOTING_COMMENT_SUCCESS';
const DOWNVOTING_COMMENT_FAILURE: ForumActionType =
  'DOWNVOTING_COMMENT_FAILURE';

export {
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_POSTS_BY_CATEGORY,
  GET_POSTS_BY_CATEGORY_SUCCESS,
  GET_POSTS_BY_CATEGORY_FAILURE,
  SEARCH_POSTS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  SET_EDIT_POST,
  SET_EDIT_COMMENT,
  SUBMITTING_POST,
  SUBMITTING_POST_SUCCESS,
  SUBMITTING_POST_FAILURE,
  GETTING_RECENT_POSTS,
  GETTING_RECENT_POSTS_SUCCESS,
  GETTING_RECENT_POSTS_FAILURE,
  GETTING_POST_BY_SLUG,
  GETTING_POST_BY_SLUG_SUCCESS,
  GETTING_POST_BY_SLUG_FAILURE,
  CREATING_REPLY_TO_POST,
  CREATING_REPLY_TO_POST_SUCCESS,
  CREATING_REPLY_TO_POST_FAILURE,
  GETTING_COMMENTS,
  GETTING_COMMENTS_SUCCESS,
  GETTING_COMMENTS_FAILURE,
  GETTING_POPULAR_POSTS,
  GETTING_POPULAR_POSTS_SUCCESS,
  GETTING_POPULAR_POSTS_FAILURE,
  GETTING_COMMENT_BY_COMMENT_ID,
  GETTING_COMMENT_BY_COMMENT_ID_SUCCESS,
  GETTING_COMMENT_BY_COMMENT_ID_FAILURE,
  CREATING_REPLY_TO_COMMENT,
  CREATING_REPLY_TO_COMMENT_SUCCESS,
  CREATING_REPLY_TO_COMMENT_FAILURE,
  UPVOTING_POST,
  UPVOTING_POST_SUCCESS,
  UPVOTING_POST_FAILURE,
  DOWNVOTING_POST,
  DOWNVOTING_POST_SUCCESS,
  DOWNVOTING_POST_FAILURE,
  UPVOTING_COMMENT,
  UPVOTING_COMMENT_SUCCESS,
  UPVOTING_COMMENT_FAILURE,
  DOWNVOTING_COMMENT,
  DOWNVOTING_COMMENT_SUCCESS,
  DOWNVOTING_COMMENT_FAILURE
};
