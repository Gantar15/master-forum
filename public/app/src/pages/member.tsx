import './styles/member.scss';

import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import { Comment } from '../modules/forum/models/Comment';
import { Layout } from '../shared/layout';
import { Loader } from '../shared/components/loader';
import MemberIcon from '../assets/img/member-icon.png';
import { Post } from '../modules/forum/models/Post';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import { PostRow } from '../modules/forum/components/posts/postRow';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { User } from '../modules/users/models/user';
import { UserSectionType } from '../modules/users/components/users/filters/components/UserSections';
import { UserSections } from '../modules/users/components/users/filters';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postService } from '../modules/forum/services';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';

interface MemberPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations {
  match: any;
  users: UsersState;
}

interface MemberPageState {
  posts: Post[];
  votesPosts: Post[];
  comments: Comment[];
  isPostsLoading: boolean;
  isVotesLoading: boolean;
  isCommentsLoading: boolean;
  activeUserSection: UserSectionType;
}

export class MemberPage extends React.Component<
  MemberPageProps,
  MemberPageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      votesPosts: [],
      comments: [],
      isPostsLoading: false,
      isVotesLoading: false,
      isCommentsLoading: false,
      activeUserSection: 'POSTS'
    };
  }

  componentDidMount(): void {
    this.getUserPosts();
  }

  componentDidUpdate(
    prevProps: Readonly<MemberPageProps>,
    prevState: Readonly<MemberPageState>
  ) {
    this.afterUserChange(prevProps);
    this.afterUserSectionChange(prevState);
  }

  afterUserChange(prevProps: Readonly<MemberPageProps>) {
    if (prevProps.match.params.username === this.getUserName()) return;
    this.getUserPosts();
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
      this.setState({
        comments,
        isCommentsLoading: false
      });
    });
  }

  getUserName() {
    return this.props.match.params.username;
  }

  setActiveUserSection(section: UserSectionType) {
    this.setState({
      ...this.state,
      activeUserSection: section
    });
  }

  render() {
    const username = this.getUserName();
    return (
      <Layout>
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
            this.state.posts.map((p) => (
              <PostRow
                key={p.slug}
                isDownvoted={p.wasDownvotedByMe}
                isUpvoted={p.wasUpvotedByMe}
                onUpvoteClicked={() => this.props.upvotePost(p.slug)}
                onDownvoteClicked={() => this.props.downvotePost(p.slug)}
                isLoggedIn={this.props.users.isAuthenticated}
                {...p}
              />
            ))
          )
        ) : null}

        {this.state.activeUserSection === 'VOTES' ? (
          this.state.isVotesLoading ? (
            <Loader />
          ) : (
            this.state.votesPosts.map((p) => (
              <PostRow
                key={p.slug}
                isDownvoted={p.wasDownvotedByMe}
                isUpvoted={p.wasUpvotedByMe}
                isLoggedIn={this.props.users.isAuthenticated}
                {...p}
              />
            ))
          )
        ) : null}

        {this.state.activeUserSection === 'COMMENTS' ? (
          this.state.isCommentsLoading ? (
            <Loader />
          ) : (
            <>
              <br />
              {this.state.comments.map((c) => (
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
                />
              ))}
            </>
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

function mapStateToProps({ users }: { users: UsersState }) {
  return {
    users
  };
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(withLogoutHandling(MemberPage));
