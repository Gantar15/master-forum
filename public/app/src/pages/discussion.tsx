import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import { Comment } from '../modules/forum/models/Comment';
import { CommentUtil } from '../modules/forum/utils/CommentUtil';
import Editor from '../modules/forum/components/comments/components/Editor';
import EntityActions from '../shared/components/entity-actions/components/EntityActions';
import { ForumState } from '../modules/forum/redux/states';
import { FullPageLoader } from '../shared/components/loader';
import Header from '../shared/components/header/components/Header';
import { Layout } from '../shared/layout';
import ModalWindow from '../shared/components/modal-window/components/ModalWindow';
import NotFound from '../shared/components/not-found/components/NotFound';
import PointHover from '../modules/forum/components/posts/points/components/PointHover';
import { Post } from '../modules/forum/models/Post';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import PostSummary from '../modules/forum/components/posts/post/components/PostSummary';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { SubmitButton } from '../shared/components/button';
import { TextUtil } from '../shared/utils/TextUtil';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
//@ts-ignore
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import withVoting from '../modules/forum/hocs/withVoting';

interface DiscussionPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  history: any;
}

interface DiscussionState {
  comments: Comment[];
  newCommentText: string;
  isDeletePostModalOpen: boolean;
  isDeleteCommentModalOpen: boolean;
  commentToDelete?: Comment;
  editorHover: boolean;
}

class DiscussionPage extends React.Component<
  DiscussionPageProps,
  DiscussionState
> {
  constructor(props: DiscussionPageProps) {
    super(props);

    this.state = {
      comments: [],
      newCommentText: '',
      isDeletePostModalOpen: false,
      isDeleteCommentModalOpen: false,
      commentToDelete: undefined,
      editorHover: false
    };
  }

  getSlugFromWindow(): string {
    if (typeof window !== 'undefined') {
      var pathname = window.location.pathname;
      var slug = pathname.substring(pathname.lastIndexOf('/') + 1);
      return slug;
    } else {
      return '';
    }
  }

  getPost(): void {
    const slug = this.getSlugFromWindow();
    this.props.getPostBySlug(slug);
  }

  getComments(offset?: number): void {
    const slug = this.getSlugFromWindow();
    this.props.getComments(slug, offset);
  }

  componentDidMount() {
    this.getPost();
    this.getComments();
  }

  updateValue(fieldName: string, newValue: any) {
    this.setState({
      ...this.state,
      [fieldName]: newValue
    });
  }

  isFormValid(): boolean {
    const { newCommentText } = this.state;

    if (
      !!newCommentText === false ||
      TextUtil.atLeast(newCommentText, CommentUtil.minCommentLength) ||
      TextUtil.atMost(newCommentText, CommentUtil.maxCommentLength)
    ) {
      toast.error(
        `Yeahhhhh, comments should be ${CommentUtil.minCommentLength} to ${CommentUtil.maxCommentLength} characters. Yours was ${newCommentText.length}. 🤠`,
        {
          autoClose: 3000
        }
      );
      return false;
    }

    return true;
  }

  onSubmitComment() {
    if (this.isFormValid()) {
      const text = this.state.newCommentText;
      const slug = (this.props.forum.post as Post).slug;
      this.props.createReplyToPost(text, slug);
    }
  }

  onPostAction(action: string) {
    if (!('slug' in this.props.forum.post)) return;
    if (action === 'delete') {
      this.setState((state) => ({
        ...state,
        isDeletePostModalOpen: !state.isDeletePostModalOpen
      }));
    } else if (action === 'edit') {
      this.props.setEditPost(this.props.forum.post);
      this.props.history.push('/submit');
    }
  }

  onCommentAction(action: string, comment: Comment) {
    if (action === 'delete') {
      this.setState((state) => ({
        ...state,
        isDeleteCommentModalOpen: !state.isDeleteCommentModalOpen,
        commentToDelete: comment
      }));
    } else if (action === 'edit') {
      this.props.setEditComment(comment);
      this.props.history.push(`/comment/${comment.commentId}`);
    }
  }

  afterSuccessfulPostDelete(prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (
      currentProps.forum.isDeletePostSuccess ===
      !prevProps.forum.isDeletePostSuccess
    ) {
      this.setState({
        ...this.state,
        isDeletePostModalOpen: false
      });
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
      setTimeout(() => {
        this.props.history.push('/');
      }, 1000);
    }
  }

  afterFailedPostDelete(prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (
      currentProps.forum.isDeletePostFailure ===
      !prevProps.forum.isDeletePostFailure
    ) {
      this.setState({
        ...this.state,
        isDeletePostModalOpen: false
      });
      const error: string = currentProps.forum.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      });
    }
  }

  afterSuccessfulCommentDelete(prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (
      currentProps.forum.isDeleteCommentSuccess ===
      !prevProps.forum.isDeleteCommentSuccess
    ) {
      this.setState({
        ...this.state,
        isDeleteCommentModalOpen: false
      });
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
    }
  }

  afterFailedCommentDelete(prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (
      currentProps.forum.isDeleteCommentFailure ===
      !prevProps.forum.isDeleteCommentFailure
    ) {
      this.setState({
        ...this.state,
        isDeleteCommentModalOpen: false
      });
      const error: string = currentProps.forum.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      });
    }
  }

  afterSuccessfulCommentPost(prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (
      currentProps.forum.isCreatingReplyToPostSuccess ===
      !prevProps.forum.isCreatingReplyToPostSuccess
    ) {
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  afterFailedCommentPost(prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (
      currentProps.forum.isCreatingReplyToPostFailure ===
      !prevProps.forum.isCreatingReplyToPostFailure
    ) {
      const error: string = currentProps.forum.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      });
    }
  }

  componentDidUpdate(prevProps: DiscussionPageProps) {
    this.afterSuccessfulCommentPost(prevProps);
    this.afterFailedCommentPost(prevProps);
    this.afterSuccessfulPostDelete(prevProps);
    this.afterFailedPostDelete(prevProps);
    this.afterFailedCommentDelete(prevProps);
    this.afterSuccessfulCommentDelete(prevProps);
  }

  render() {
    const post = this.props.forum.post;
    const user = this.props.users.user;
    const comments = this.props.forum.comments;
    let isPostAuthor = false;
    if ('username' in user && 'slug' in post) {
      const postAuthorUsername = post.postAuthor;
      isPostAuthor =
        postAuthorUsername === user.username ||
        user.isAdminUser ||
        user.isManagerUser;
    }

    if (!('slug' in post) && this.props.forum.isGettingPostBySlug) {
      return <FullPageLoader />;
    } else if (!('slug' in post)) {
      return <NotFound />;
    }

    return (
      <Layout>
        <ModalWindow
          title="Confirmation!"
          text="Are you sure you want to delete this post?"
          isOpen={this.state.isDeletePostModalOpen}
          onOk={() => this.props.deletePost(post.slug)}
          onCancel={() => this.setState({ isDeletePostModalOpen: false })}
          okTitle="Yes, delete"
        />
        <ModalWindow
          title="Confirmation!"
          text="Are you sure you want to delete this comment?"
          isOpen={this.state.isDeleteCommentModalOpen}
          onOk={() =>
            this.props.deleteComment(
              this.state.commentToDelete!.commentId,
              this.state.commentToDelete!.postSlug
            )
          }
          onCancel={() => this.setState({ isDeleteCommentModalOpen: false })}
          okTitle="Yes, delete"
        />
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation text="Back to all discussions" to="/" />
          <ProfileButton
            isLoggedIn={this.props.users.isAuthenticated}
            username={
              this.props.users.isAuthenticated
                ? (this.props.users.user as User).username
                : ''
            }
            onLogout={() => this.props.logout()}
          />
        </div>

        {this.props.forum.isGettingPostBySlug ? (
          ''
        ) : (
          <>
            <Header
              user={
                'username' in this.props.users.user
                  ? this.props.users.user
                  : undefined
              }
              isDownvoted={post.wasDownvotedByMe}
              isUpvoted={post.wasUpvotedByMe}
              title={`"${post.title}"`}
              isUpvotable={true}
              onUpvoteClicked={() => this.props.upvotePost(post.slug)}
              onDownvoteClicked={() => this.props.downvotePost(post.slug)}
              points={post.points}
              isLoggedIn={this.props.users.isAuthenticated}
            />

            <br />
            <br />
            <PostSummary {...(post as Post)} />

            {isPostAuthor ? (
              <div>
                <EntityActions
                  actions={['delete', 'edit']}
                  onAction={(action) => this.onPostAction(action)}
                />
              </div>
            ) : null}

            <h3>Leave a comment</h3>
            <div
              className="editor-container"
              onMouseEnter={() => this.setState({ editorHover: true })}
              onMouseLeave={() => this.setState({ editorHover: false })}
            >
              <Editor
                text={this.state.newCommentText}
                maxLength={CommentUtil.maxCommentLength}
                placeholder="Post your reply"
                handleChange={(v: any) => this.updateValue('newCommentText', v)}
                disabled={!this.props.users.isAuthenticated}
              />
              {!this.props.users.isAuthenticated && (
                <PointHover
                  isHover={this.state.editorHover}
                  text="Want to comment? You need to sign up"
                />
              )}
            </div>
            {this.props.users.isAuthenticated && (
              <>
                <SubmitButton
                  text="Post comment"
                  onClick={() => this.onSubmitComment()}
                />
                <br />
                <br />
              </>
            )}
          </>
        )}

        <br />
        {comments.map((c, i) => (
          <PostComment
            key={i}
            isDownvoted={c.wasDownvotedByMe}
            isUpvoted={c.wasUpvotedByMe}
            onDownvoteClicked={this.props.downvoteComment}
            onUpvoteClicked={this.props.upvoteComment}
            isLoggedIn={this.props.users.isAuthenticated}
            onAction={
              isPostAuthor
                ? (actions, comment) => this.onCommentAction(actions, comment)
                : undefined
            }
            {...c}
          />
        ))}

        {this.props.forum.isCreatingReplyToPost ? <FullPageLoader /> : ''}
      </Layout>
    );
  }
}

function mapStateToProps({
  users,
  forum
}: {
  users: UsersState;
  forum: ForumState;
}) {
  return {
    users,
    forum
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators,
      ...forumOperators
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(withLogoutHandling(withVoting(DiscussionPage)));
