import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import { Comment } from '../modules/forum/models/Comment';
import { CommentUtil } from '../modules/forum/utils/CommentUtil';
import Editor from '../modules/forum/components/comments/components/Editor';
import EntityActions from '../shared/components/entity-actions/components/EntityActions';
import { ForumState } from '../modules/forum/redux/states';
import Header from '../shared/components/header/components/Header';
import { Layout } from '../shared/layout';
import { Loader } from '../shared/components/loader';
import ModalWindow from '../shared/components/modal-window/components/ModalWindow';
import PointHover from '../modules/forum/components/posts/points/components/PointHover';
import { Post } from '../modules/forum/models/Post';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import PostCommentAuthorAndText from '../modules/forum/components/posts/post/components/PostCommentAuthorAndText';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { SubmitButton } from '../shared/components/button';
import { TextUtil } from '../shared/utils/TextUtil';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import withVoting from '../modules/forum/hocs/withVoting';

//@ts-ignore

interface CommentState {
  newCommentText: string;
  updateCommentText: string;
  commentFetched: boolean;
  isDeleteCommentModalOpen: boolean;
  commentToDelete?: Comment;
  editorHover: boolean;
}

interface CommentPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  history: any;
}

class CommentPage extends React.Component<CommentPageProps, CommentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      commentFetched: false,
      newCommentText: '',
      updateCommentText: '',
      isDeleteCommentModalOpen: false,
      commentToDelete: undefined,
      editorHover: false
    };
  }

  getRawTextLength(tags: string) {
    return tags.replace(/<[^>]*>?/gm, '').length;
  }

  isFormReady() {
    const { newCommentText } = this.state;
    const commentTextLength = this.getRawTextLength(newCommentText);
    const commentIsOK =
      !!newCommentText === true &&
      commentTextLength < CommentUtil.maxCommentLength &&
      commentTextLength > CommentUtil.minCommentLength;

    return commentIsOK;
  }

  updateValue(name: any, value: any) {
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  getCommentIdFromWindow(): string {
    if (typeof window !== 'undefined') {
      var pathname = window.location.pathname;
      var slug = pathname.substring(pathname.lastIndexOf('/') + 1);
      return slug;
    } else {
      return '';
    }
  }

  getComment(): void {
    const commentId = this.getCommentIdFromWindow();
    this.props.getCommentByCommentId(commentId);
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
    }
  }

  afterSuccessfulCommentPost(prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
    if (
      currentProps.forum.isCreatingReplyToCommentSuccess ===
        !prevProps.forum.isCreatingReplyToCommentSuccess ||
      currentProps.forum.isUpdateCommentSuccess ===
        !prevProps.forum.isUpdateCommentSuccess
    ) {
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  afterFailedCommentPost(prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
    if (
      currentProps.forum.isCreatingReplyToCommentFailure ===
        !prevProps.forum.isCreatingReplyToCommentFailure ||
      currentProps.forum.isUpdateCommentFailure ===
        !prevProps.forum.isUpdateCommentFailure
    ) {
      const error: string = currentProps.forum.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      });
    }
  }

  afterCommentFetched(prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
    if (
      currentProps.forum.isGettingCommentByCommentIdSuccess &&
      !this.state.commentFetched
    ) {
      const currentComment = this.props.forum.comment as Comment;
      this.setState({
        ...this.state,
        commentFetched: true,
        updateCommentText: currentComment.text
      });
      this.props.getCommentReplies(
        currentComment.postSlug,
        currentComment.commentId
      );
    }
  }

  afterSuccessfulCommentDelete(prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
    if (
      currentProps.forum.isDeleteCommentSuccess ===
      !prevProps.forum.isDeleteCommentSuccess
    ) {
      this.setState({
        ...this.state,
        isDeleteCommentModalOpen: false
      });
      this.props.history.push(
        `/discuss/${(this.props.forum.post as Post).slug}`
      );
    }
  }

  afterFailedCommentDelete(prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
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

  componentDidUpdate(prevProps: CommentPageProps) {
    if (
      'commentId' in this.props.forum.comment &&
      !this.props.forum.isGettingCommentByCommentId &&
      this.props.forum.comment.commentId !== this.getCommentIdFromWindow()
    ) {
      this.setState({
        ...this.state,
        commentFetched: false
      });
      this.getComment();
    }

    this.afterCommentFetched(prevProps);
    this.afterSuccessfulCommentPost(prevProps);
    this.afterFailedCommentPost(prevProps);
    this.afterFailedCommentDelete(prevProps);
    this.afterSuccessfulCommentDelete(prevProps);
  }

  componentDidMount() {
    this.getComment();
  }

  isFormValid(): boolean {
    const editComment = this.props.forum.editComment;
    const isEditMode = !!editComment;
    const { newCommentText, updateCommentText } = this.state;

    if (!isEditMode) {
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
    } else {
      if (
        !!updateCommentText === false ||
        TextUtil.atLeast(updateCommentText, CommentUtil.minCommentLength) ||
        TextUtil.atMost(updateCommentText, CommentUtil.maxCommentLength)
      ) {
        toast.error(
          `Yeahhhhh, comments should be ${CommentUtil.minCommentLength} to ${CommentUtil.maxCommentLength} characters. Yours was ${updateCommentText.length}. 🤠`,
          {
            autoClose: 3000
          }
        );
        return false;
      }
    }

    return true;
  }

  async updateComment() {
    if (this.isFormValid()) {
      const text = this.state.updateCommentText;
      const comment = this.props.forum.comment as Comment;
      this.props.updateComment(comment.commentId, text);
    }
  }

  async submitComment() {
    if (this.isFormValid()) {
      const text = this.state.newCommentText;
      const comment = this.props.forum.comment as Comment;
      this.props.createReplyToComment(
        text,
        comment.commentId,
        comment.postSlug
      );
    }
  }

  render() {
    const comment = this.props.forum.comment as Comment;
    const user = this.props.users.user;
    const isCommentFetched =
      this.props.forum.isGettingCommentByCommentIdSuccess &&
      'member' in comment;
    const editComment = this.props.forum.editComment;
    let isCommentAuthor = false;
    if (isCommentFetched && 'username' in user) {
      const commentAuthorUsername = comment.member.username;
      isCommentAuthor =
        commentAuthorUsername === user.username ||
        user.isAdminUser ||
        user.isManagerUser;
    }
    const isEditMode = !!editComment && isCommentAuthor;

    return (
      <Layout>
        <ModalWindow
          title="Confirmation!"
          text="Are you sure you want to delete this comment?"
          isOpen={this.state.isDeleteCommentModalOpen}
          onOk={() =>
            this.props.deleteComment(this.state.commentToDelete!.commentId)
          }
          onCancel={() => this.setState({ isDeleteCommentModalOpen: false })}
          okTitle="Yes, delete"
        />
        <div className="header-container flex flex-row flex-center flex-between">
          {!isCommentFetched ? (
            <Loader />
          ) : (
            <BackNavigation
              to={`/discuss/${comment.postSlug}`}
              text={`Back to "${comment.postTitle}"`}
            />
          )}
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
        <Header
          user={
            'username' in this.props.users.user
              ? this.props.users.user
              : undefined
          }
          title={``}
        />
        <br />
        {!isCommentFetched ? (
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            <Loader />
          </div>
        ) : (
          <>
            <PostCommentAuthorAndText
              {...comment}
              updateCommentText={this.state.updateCommentText}
              isEditable={isEditMode}
              handleChange={(v: any) =>
                this.updateValue('updateCommentText', v)
              }
            />
            {isEditMode ? (
              <SubmitButton
                text="Update comment"
                onClick={() => this.updateComment()}
              />
            ) : null}
            {!isEditMode && (
              <>
                {isCommentAuthor ? (
                  <div>
                    <EntityActions
                      actions={['delete', 'edit']}
                      onAction={(action) =>
                        this.onCommentAction(action, comment)
                      }
                    />
                  </div>
                ) : null}
                <br />
                <br />
                <div
                  className="editor-container"
                  onMouseEnter={() => this.setState({ editorHover: true })}
                  onMouseLeave={() => this.setState({ editorHover: false })}
                >
                  <Editor
                    text={this.state.newCommentText}
                    maxLength={CommentUtil.maxCommentLength}
                    placeholder="Post your reply"
                    handleChange={(v: any) =>
                      this.updateValue('newCommentText', v)
                    }
                    disabled={!this.props.users.isAuthenticated}
                  />
                  {!this.props.users.isAuthenticated && (
                    <PointHover
                      isHover={this.state.editorHover}
                      text="Want to reply? You need to sign up"
                    />
                  )}
                </div>
                {this.props.users.isAuthenticated && (
                  <>
                    <SubmitButton
                      text="Submit reply"
                      onClick={() => this.submitComment()}
                    />
                    <br />
                    <br />
                  </>
                )}
                <br />
              </>
            )}
          </>
        )}

        {!isEditMode &&
          this.props.forum.comments.map((c, i) => (
            <PostComment
              key={i}
              isDownvoted={c.wasDownvotedByMe}
              isUpvoted={c.wasUpvotedByMe}
              onUpvoteClicked={() =>
                this.props.upvoteComment(c.commentId, c.postSlug)
              }
              onDownvoteClicked={() =>
                this.props.downvoteComment(c.commentId, c.postSlug)
              }
              isLoggedIn={this.props.users.isAuthenticated}
              onAction={
                isCommentAuthor
                  ? (actions, comment) => this.onCommentAction(actions, comment)
                  : undefined
              }
              {...c}
            />
          ))}
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
)(withLogoutHandling(withVoting(CommentPage)));
