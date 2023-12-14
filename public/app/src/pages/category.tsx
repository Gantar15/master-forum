import './styles/category.scss';

import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import { ForumState } from '../modules/forum/redux/states';
import Header from '../shared/components/header/components/Header';
import { Layout } from '../shared/layout';
import { PostRow } from '../modules/forum/components/posts/postRow';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
//@ts-ignore
import { connect } from 'react-redux';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import withVoting from '../modules/forum/hocs/withVoting';

interface CategoryPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  location: any;
  history: any;
}

interface CategoryPageState {
  categoryString: string;
}

class CategoryPage extends React.Component<
  CategoryPageProps,
  CategoryPageState
> {
  constructor(props: CategoryPageProps) {
    super(props);

    this.state = {
      categoryString: ''
    };
  }

  getCategoryStringFromWindow(): string {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const categoryString = pathname.substring(pathname.lastIndexOf('/') + 1);
      return decodeURI(categoryString);
    } else {
      return '';
    }
  }

  setCategoryString(categoryString: string) {
    this.setState({
      ...this.state,
      categoryString
    });
  }

  getPosts(categoryString: string) {
    this.props.getPostsByCategory(categoryString);
  }

  componentDidUpdate(
    prevProps: CategoryPageProps,
    prevState: CategoryPageState
  ) {
    const categoryString = this.getCategoryStringFromWindow();
    if (
      !this.props.forum.isGetPostsByCategory &&
      prevState.categoryString !== categoryString
    ) {
      this.getPosts(categoryString);
    }
  }

  componentDidMount() {
    const categoryString = this.getCategoryStringFromWindow();
    this.setCategoryString(categoryString);
    this.getPosts(categoryString);
  }

  render() {
    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
          <Header
            title="Master-Forum Community"
            subtitle="Where awesome Peoples can communicate"
          />
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
        <div className="category__category-title">
          <h2>{this.state.categoryString}</h2>
        </div>
        <br />
        <br />

        {this.props.forum.categoryPosts.length > 0 ? (
          this.props.forum.categoryPosts.map((p, i) => (
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
            No posts in this category
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
)(withLogoutHandling(withVoting(CategoryPage)));
