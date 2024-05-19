import './styles/member.scss';

import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { BackNavigation } from '../shared/components/header';
import { Comment } from '../modules/forum/models/Comment';
import { ForumState } from '../modules/forum/redux/states';
import { Layout } from '../shared/layout';
import { Loader } from '../shared/components/loader';
import MemberIcon from '../assets/img/member-icon.png';
import ModalWindow from '../shared/components/modal-window/components/ModalWindow';
import { Post } from '../modules/forum/models/Post';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import { PostRow } from '../modules/forum/components/posts/postRow';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { User } from '../modules/users/models/user';
import { UserSectionType } from '../modules/users/components/users/filters/components/UserSections';
import { UserSections } from '../modules/users/components/users/filters';
import { UsersState } from '../modules/users/redux/states';
import { VoteRow } from '../modules/forum/components/votes/voteRow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postService } from '../modules/forum/services';
import { toast } from 'react-toastify';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';

interface MemberPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations,
    RouteComponentProps {
  match: any;
  users: UsersState;
  forum: ForumState;
}

interface MemberPageState {
  posts: Post[];
  votesPosts: Post[];
  groupedComments: { [postTitle: string]: Comment[] };
  commentToDelete?: Comment;
  isDeleteCommentModalOpen: boolean;
  isPostsLoading: boolean;
  isVotesLoading: boolean;
  isCommentsLoading: boolean;
  activeUserSection: UserSectionType;
}

const SECTION_TYPE_KEY = 'section';

export class MemberPage extends React.Component<
  MemberPageProps,
  MemberPageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      votesPosts: [],
      groupedComments: {},
      commentToDelete: undefined,
      isDeleteCommentModalOpen: false,
      isPostsLoading: false,
      isVotesLoading: false,
      isCommentsLoading: false,
      activeUserSection: 'POSTS'
    };
  }

  componentDidMount(): void {
    const query = new URLSearchParams(window.location.search);
    const sectionType = query.get(SECTION_TYPE_KEY);
    if (sectionType) {
      this.setState({ activeUserSection: sectionType as UserSectionType });
    }
    if (sectionType === 'POSTS' || !sectionType) {
      this.getUserPosts();
    }
  }

  componentDidUpdate(
    prevProps: Readonly<MemberPageProps>,
    prevState: Readonly<MemberPageState>
  ) {
    this.afterUserSectionChange(prevState);
    this.afterUserChange(prevProps);
    this.afterSuccessfulCommentDelete(prevProps);
    this.afterFailedCommentDelete(prevProps);
  }

  afterUserChange(prevProps: Readonly<MemberPageProps>) {
    if (prevProps.match.params.username === this.getUserName()) return;
    this.getUserPosts();
    this.getUserVotes();
    this.getUserComments();
  }

  afterUserSectionChange(prevState: Readonly<MemberPageState>) {
    if (prevState.activeUserSection === this.state.activeUserSection) return;

    switch (this.state.activeUserSection) {
      case 'POSTS':
        this.getUserPosts();
        break;
      case 'VOTES':
        this.getUserVotes();
        break;
      case 'COMMENTS':
        this.getUserComments();
        break;
    }
  }

  afterSuccessfulCommentDelete(prevProps: MemberPageProps) {
    const currentProps: MemberPageProps = this.props;
    if (
      currentProps.forum.isDeleteCommentSuccess ===
      !prevProps.forum.isDeleteCommentSuccess
    ) {
      this.getUserComments();
      this.setState({
        ...this.state,
        isDeleteCommentModalOpen: false
      });
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
    }
  }

  afterFailedCommentDelete(prevProps: MemberPageProps) {
    const currentProps: MemberPageProps = this.props;
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

  getUserPosts() {
    const username = this.getUserName();
    this.setState({
      isPostsLoading: true
    });
    postService.getPostsByUser(username).then((response) => {
      if (response.isLeft()) {
        this.setState({
          isPostsLoading: false
        });
        return;
      }

      const posts = response.value.getValue();
      this.setState({
        posts,
        isPostsLoading: false
      });
    });
  }

  getUserVotes() {
    const username = this.getUserName();
    this.setState({
      isVotesLoading: true
    });
    postService.getVotesByUser(username).then((response) => {
      if (response.isLeft()) {
        this.setState({
          isVotesLoading: false
        });
        return;
      }

      const votesPosts = response.value.getValue();
      this.setState({
        votesPosts,
        isVotesLoading: false
      });
    });
  }

  getUserComments() {
    const username = this.getUserName();
    this.setState({
      isCommentsLoading: true
    });
    postService.getCommentsByUser(username).then((response) => {
      if (response.isLeft()) {
        this.setState({
          isCommentsLoading: false
        });
        return;
      }

      const comments = response.value.getValue();
      const groupedComments = comments.reduce((acc, comment) => {
        if (!acc[comment.postTitle]) {
          acc[comment.postTitle] = [];
        }
        acc[comment.postTitle].push(comment);
        return acc;
      }, {} as MemberPageState['groupedComments']);
      this.setState({
        groupedComments: groupedComments,
        isCommentsLoading: false
      });
    });
  }

  getUserName() {
    return this.props.match.params.username;
  }

  setActiveUserSection(section: UserSectionType) {
    const newQuery = new URLSearchParams();
    newQuery.set(SECTION_TYPE_KEY, section);
    this.props.history.push({ search: newQuery.toString() });
    this.setState({
      ...this.state,
      activeUserSection: section
    });
  }

  render() {
    const username = this.getUserName();
    return (
      <Layout>
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
          <BackNavigation to={`/`} text={'Back to all discussions'} />
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
        <br />
        <div className="member__presentation">
          <img src={MemberIcon} alt="Member icon" />
          <h2>{username}</h2>
        </div>

        <UserSections
          activeFilter={this.state.activeUserSection}
          onClick={(section) => this.setActiveUserSection(section)}
        />

        {this.state.activeUserSection === 'POSTS' ? (
          this.state.isPostsLoading ? (
            <Loader />
          ) : (
            <div className="member__section">
              {this.state.posts.map((p) => (
                <PostRow key={p.slug} {...p} />
              ))}
            </div>
          )
        ) : null}

        {this.state.activeUserSection === 'VOTES' ? (
          this.state.isVotesLoading ? (
            <Loader />
          ) : (
            this.state.votesPosts.map((p) => (
              <VoteRow
                key={p.slug}
                isDownvoted={p.wasDownvotedByMe}
                isUpvoted={p.wasUpvotedByMe}
                {...p}
              />
            ))
          )
        ) : null}

        {this.state.activeUserSection === 'COMMENTS' ? (
          this.state.isCommentsLoading ? (
            <Loader />
          ) : (
            <div className="member__section">
              <br />
              {Object.entries(this.state.groupedComments).map(
                ([postTitle, comments]) => (
                  <div key={postTitle}>
                    <div className="member__post-info">
                      <Link to={`/discuss/${comments[0].postSlug}`}>
                        Post: {postTitle}
                      </Link>
                      <p>{comments.length} comments</p>
                    </div>
                    {comments.map((c) => (
                      <PostComment
                        {...c}
                        key={c.commentId}
                        isDownvoted={c.wasDownvotedByMe}
                        isUpvoted={c.wasUpvotedByMe}
                        onDownvoteClicked={this.props.downvoteComment}
                        onUpvoteClicked={this.props.upvoteComment}
                        loggedInUser={
                          'username' in this.props.users.user
                            ? this.props.users.user
                            : undefined
                        }
                        onAction={(action, comment) =>
                          this.onCommentAction(action, comment)
                        }
                      />
                    ))}
                  </div>
                )
              )}
            </div>
          )
        ) : null}
      </Layout>
    );
  }
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

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(withLogoutHandling(withRouter(MemberPage)));
