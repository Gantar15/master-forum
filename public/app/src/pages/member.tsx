import './styles/member.scss';

import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import { Layout } from '../shared/layout';
import { Loader } from '../shared/components/loader';
import MemberIcon from '../assets/img/member-icon.png';
import { Post } from '../modules/forum/models/Post';
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
  isPostsLoading: boolean;
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
      isPostsLoading: false,
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
    if (prevProps.match.params.username === this.getUserName()) return;
    this.getUserPosts();
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

        {this.state.isPostsLoading ? (
          <Loader />
        ) : (
          this.state.posts.map((p, i) => (
            <PostRow
              key={i}
              isDownvoted={p.wasDownvotedByMe}
              isUpvoted={p.wasUpvotedByMe}
              onUpvoteClicked={() => this.props.upvotePost(p.slug)}
              onDownvoteClicked={() => this.props.downvotePost(p.slug)}
              isLoggedIn={this.props.users.isAuthenticated}
              {...p}
            />
          ))
        )}
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
