import * as actions from './actions';

import states, { ForumState } from './states';

import { ForumAction } from './actionCreators';
import { Post } from '../models/Post';
import { PostUtil } from '../utils/PostUtil';
import { ReduxUtils } from '../../../shared/utils/ReduxUtils';

export default function forum(
  state: ForumState = states,
  action: ForumAction
): ForumState {
  switch (action.type as actions.ForumActionType) {
    case actions.GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetPostsByCategory'),
        error: ''
      };
    case actions.GET_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetPostsByCategory', true),
        categoryPosts: action.categoryPosts
      };
    case actions.GET_POSTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetPostsByCategory', false),
        error: action.error
      };
    case actions.GET_CATEGORIES:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetCategories'),
        error: ''
      };
    case actions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetCategories', true),
        categories: action.categories
      };
    case actions.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetCategories', false),
        error: action.error
      };
    case actions.DELETE_COMMENT:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteComment'),
        error: ''
      };
    case actions.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteComment', true)
      };
    case actions.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteComment', false),
        error: action.error
      };
    case actions.UPDATE_COMMENT:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isUpdateComment'),
        error: ''
      };
    case actions.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isUpdateComment', true)
      };
    case actions.UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isUpdateComment', false),
        error: action.error
      };
    case actions.DELETE_POST:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeletePost'),
        error: ''
      };
    case actions.DELETE_POST_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeletePost', true),
        recentPosts: state.recentPosts.filter(
          (post) => post.slug !== action.post.slug
        ),
        popularPosts: state.recentPosts.filter(
          (post) => post.slug !== action.post.slug
        )
      };
    case actions.DELETE_POST_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeletePost', false),
        error: action.error
      };
    case actions.UPDATE_POST:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isUpdatePost'),
        error: ''
      };
    case actions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isUpdatePost', true),
        recentPosts: state.recentPosts.map((post) =>
          post.slug === action.post.slug ? action.post : post
        ),
        popularPosts: state.popularPosts.map((post) =>
          post.slug === action.post.slug ? action.post : post
        )
      };
    case actions.UPDATE_POST_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isUpdatePost', false),
        error: action.error
      };
    case actions.SET_EDIT_POST:
      return {
        ...state,
        editPost: action.editPost
      };
    case actions.SET_EDIT_COMMENT:
      return {
        ...state,
        editComment: action.editComment
      };
    case actions.SUBMITTING_POST:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isSubmittingPost'),
        error: ''
      };
    case actions.SUBMITTING_POST_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isSubmittingPost', true)
      };
    case actions.SUBMITTING_POST_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isSubmittingPost', false),
        error: action.error
      };

    case actions.GETTING_RECENT_POSTS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingRecentPosts'),
        error: ''
      };
    case actions.GETTING_RECENT_POSTS_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingRecentPosts', true),
        recentPosts: action.posts
      };
    case actions.GETTING_RECENT_POSTS_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingRecentPosts', false),
        error: action.error
      };

    case actions.GETTING_POST_BY_SLUG:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingPostBySlug'),
        error: ''
      };
    case actions.GETTING_POST_BY_SLUG_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingPostBySlug', true),
        post: action.post
      };
    case actions.GETTING_POST_BY_SLUG_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingPostBySlug', false),
        error: action.error
      };

    case actions.CREATING_REPLY_TO_POST:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingReplyToPost'),
        error: ''
      };
    case actions.CREATING_REPLY_TO_POST_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingReplyToPost', true)
      };
    case actions.CREATING_REPLY_TO_POST_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingReplyToPost', false),
        error: action.error
      };

    case actions.GETTING_COMMENTS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingComments'),
        error: ''
      };

    case actions.GETTING_COMMENTS_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingComments', true),
        comments: action.comments
      };

    case actions.GETTING_COMMENTS_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingComments', false),
        error: action.error
      };

    case actions.GETTING_POPULAR_POSTS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingPopularPosts'),
        error: ''
      };
    case actions.GETTING_POPULAR_POSTS_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingPopularPosts', true),
        popularPosts: action.posts
      };
    case actions.GETTING_POPULAR_POSTS_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingPopularPosts', false),
        error: action.error
      };

    case actions.GETTING_COMMENT_BY_COMMENT_ID:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingCommentByCommentId'),
        error: ''
      };
    case actions.GETTING_COMMENT_BY_COMMENT_ID_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingCommentByCommentId', true),
        comment: action.comment
      };
    case actions.GETTING_COMMENT_BY_COMMENT_ID_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGettingCommentByCommentId', false),
        error: action.error
      };

    case actions.CREATING_REPLY_TO_COMMENT:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingReplyToComment'),
        error: ''
      };
    case actions.CREATING_REPLY_TO_COMMENT_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingReplyToComment', true)
      };
    case actions.CREATING_REPLY_TO_COMMENT_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingReplyToComment', false),
        error: action.error
      };

    case actions.UPVOTING_POST_SUCCESS:
      return {
        ...state,
        recentPosts: state.recentPosts.map((p) =>
          p.slug === action.postSlug ? PostUtil.computePostAfterUpvote(p) : p
        ),
        popularPosts: state.popularPosts.map((p) =>
          p.slug === action.postSlug ? PostUtil.computePostAfterUpvote(p) : p
        ),
        post:
          Object.keys(state.post).length !== 0 &&
          (state.post as Post).slug === action.postSlug
            ? PostUtil.computePostAfterUpvote(state.post as Post)
            : state.post
      };

    case actions.DOWNVOTING_POST_SUCCESS:
      return {
        ...state,
        recentPosts: state.recentPosts.map((p) =>
          p.slug === action.postSlug ? PostUtil.computePostAfterDownvote(p) : p
        ),
        popularPosts: state.popularPosts.map((p) =>
          p.slug === action.postSlug ? PostUtil.computePostAfterDownvote(p) : p
        ),
        post:
          Object.keys(state.post).length !== 0 &&
          (state.post as Post).slug === action.postSlug
            ? PostUtil.computePostAfterDownvote(state.post as Post)
            : state.post
      };

    default:
      return state;
  }
}
