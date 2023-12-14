import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

export interface ForumState {
  isSearchPosts: boolean;
  isSearchPostsSuccess: boolean;
  isSearchPostsFailure: boolean;

  isGetPostsByCategory: boolean;
  isGetPostsByCategorySuccess: boolean;
  isGetPostsByCategoryFailure: boolean;

  isDeleteComment: boolean;
  isDeleteCommentSuccess: boolean;
  isDeleteCommentFailure: boolean;

  isUpdateComment: boolean;
  isUpdateCommentSuccess: boolean;
  isUpdateCommentFailure: boolean;

  isDeletePost: boolean;
  isDeletePostSuccess: boolean;
  isDeletePostFailure: boolean;

  isUpdatePost: boolean;
  isUpdatePostSuccess: boolean;
  isUpdatePostFailure: boolean;

  isSubmittingPost: boolean;
  isSubmittingPostSuccess: boolean;
  isSubmittingPostFailure: boolean;

  isGettingRecentPosts: boolean;
  isGettingRecentPostsSuccess: boolean;
  isGettingRecentPostsFailure: boolean;

  isGettingPostBySlug: boolean;
  isGettingPostBySlugSuccess: boolean;
  isGettingPostBySlugFailure: boolean;

  isCreatingReplyToPost: boolean;
  isCreatingReplyToPostSuccess: boolean;
  isCreatingReplyToPostFailure: boolean;

  isGettingComments: boolean;
  isGettingCommentsSuccess: boolean;
  isGettingCommentsFailure: boolean;

  isGettingPopularPosts: boolean;
  isGettingPopularPostsSuccess: boolean;
  isGettingPopularPostsFailure: boolean;

  isGettingCommentByCommentId: boolean;
  isGettingCommentByCommentIdSuccess: boolean;
  isGettingCommentByCommentIdFailure: boolean;

  isCreatingReplyToComment: boolean;
  isCreatingReplyToCommentSuccess: boolean;
  isCreatingReplyToCommentFailure: boolean;

  isUpvotingComment: boolean;
  isUpvotingCommentSuccess: boolean;
  isUpvotingCommentFailure: boolean;

  isDownvotingComment: boolean;
  isDownvotingCommentSuccess: boolean;
  isDownvotingCommentFailure: boolean;

  isUpvotingPost: boolean;
  isUpvotingPostSuccess: boolean;
  isUpvotingPostFailure: boolean;

  isDownvotingPost: boolean;
  isDownvotingPostSuccess: boolean;
  isDownvotingPostFailure: boolean;

  recentPosts: Post[];
  popularPosts: Post[];
  categoryPosts: Post[];
  searchPosts: Post[];

  post: Post | {};

  editPost?: Post;

  editComment?: Comment;

  comments: Comment[];

  comment: Comment | {};

  error: string;
}

const initialForumState: ForumState = {
  isSearchPosts: false,
  isSearchPostsSuccess: false,
  isSearchPostsFailure: false,

  isGetPostsByCategory: false,
  isGetPostsByCategorySuccess: false,
  isGetPostsByCategoryFailure: false,

  isDeleteComment: false,
  isDeleteCommentSuccess: false,
  isDeleteCommentFailure: false,

  isUpdateComment: false,
  isUpdateCommentSuccess: false,
  isUpdateCommentFailure: false,

  isDeletePost: false,
  isDeletePostSuccess: false,
  isDeletePostFailure: false,

  isUpdatePost: false,
  isUpdatePostSuccess: false,
  isUpdatePostFailure: false,

  isSubmittingPost: false,
  isSubmittingPostSuccess: false,
  isSubmittingPostFailure: false,

  isGettingRecentPosts: false,
  isGettingRecentPostsSuccess: false,
  isGettingRecentPostsFailure: false,

  isGettingPostBySlug: false,
  isGettingPostBySlugSuccess: false,
  isGettingPostBySlugFailure: false,

  isCreatingReplyToPost: false,
  isCreatingReplyToPostSuccess: false,
  isCreatingReplyToPostFailure: false,

  isGettingComments: false,
  isGettingCommentsSuccess: false,
  isGettingCommentsFailure: false,

  isGettingPopularPosts: false,
  isGettingPopularPostsSuccess: false,
  isGettingPopularPostsFailure: false,

  isGettingCommentByCommentId: false,
  isGettingCommentByCommentIdSuccess: false,
  isGettingCommentByCommentIdFailure: false,

  isCreatingReplyToComment: false,
  isCreatingReplyToCommentSuccess: false,
  isCreatingReplyToCommentFailure: false,

  isUpvotingComment: false,
  isUpvotingCommentSuccess: false,
  isUpvotingCommentFailure: false,

  isDownvotingComment: false,
  isDownvotingCommentSuccess: false,
  isDownvotingCommentFailure: false,

  isUpvotingPost: false,
  isUpvotingPostSuccess: false,
  isUpvotingPostFailure: false,

  isDownvotingPost: false,
  isDownvotingPostSuccess: false,
  isDownvotingPostFailure: false,

  comments: [],

  recentPosts: [],
  popularPosts: [],
  categoryPosts: [],
  searchPosts: [],

  post: {},

  editPost: undefined,

  editComment: undefined,

  comment: {},

  error: ''
};

export default initialForumState;
