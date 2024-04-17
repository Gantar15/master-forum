import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import { ForumState } from '../modules/forum/redux/states';
import Header from '../shared/components/header/components/Header';
import { Layout } from '../shared/layout';
import { PostRow } from '../modules/forum/components/posts/postRow';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import Search from '../shared/components/header/components/Search';
import { UriUtil } from '../shared/utils/UriUtil';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
//@ts-ignore
import { connect } from 'react-redux';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import withVoting from '../modules/forum/hocs/withVoting';

interface SearchPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  location: any;
  history: any;
}

interface SearchPageState {
  searchString: string;
}

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      searchString: ''
    };
  }

  getSearchStringFromWindow(): string {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const searchString = pathname.replace('/search/', '');
      return UriUtil.decodeURI(searchString);
    } else {
      return '';
    }
  }

  setSearchString(searchString: string) {
    this.setState({
      ...this.state,
      searchString
    });
  }

  getPosts(searchString: string) {
    this.props.searchPosts(searchString);
  }

  componentDidUpdate(prevProps: SearchPageProps, prevState: SearchPageState) {
    const searchString = this.getSearchStringFromWindow();
    if (
      !this.props.forum.isSearchPosts &&
      prevState.searchString !== searchString
    ) {
      this.setSearchString(searchString);
      this.getPosts(searchString);
    }
  }

  componentDidMount() {
    const searchString = this.getSearchStringFromWindow();
    this.setSearchString(searchString);
    this.getPosts(searchString);
  }

  render() {
    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation text="Back to all discussions" to="/" />
          <ProfileButton
            userId={(this.props.users.user as User)?.userId}
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
          title="Master-Forum Community"
          subtitle="Where awesome Peoples can communicate"
        />
        <br />
        <br />
        <Search
          onSearch={(text) =>
            this.props.history.push('/search/' + UriUtil.encodeText(text))
          }
          value={this.state.searchString}
        />
        <br />

        {this.props.forum.searchPosts.length > 0 ? (
          this.props.forum.searchPosts.map((p, i) => (
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
        ) : (
          <div className="header-container flex flex-row flex-center flex-justify-center">
            No posts found
          </div>
        )}
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
)(withLogoutHandling(withVoting(SearchPage)));
