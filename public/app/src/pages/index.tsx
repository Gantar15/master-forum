import './styles/index.scss';

import * as forumOperators from '../modules/forum/redux/operators';
import * as usersOperators from '../modules/users/redux/operators';

import PostFilters, {
  PostFilterType
} from '../modules/forum/components/posts/filters/components/PostFilters';

import { CategoryDTO } from '../modules/forum/dtos/categoryDTO';
import { ForumState } from '../modules/forum/redux/states';
import Header from '../shared/components/header/components/Header';
import { Layout } from '../shared/layout';
import { Link } from 'react-router-dom';
import { Post } from '../modules/forum/models/Post';
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
import { postService } from '../modules/forum/services';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import withVoting from '../modules/forum/hocs/withVoting';

interface IndexPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  location: any;
  history: any;
}

interface IndexPageState {
  activeFilter: PostFilterType;
  topCategories: CategoryDTO[];
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps) {
    super(props);

    this.state = {
      activeFilter: 'POPULAR',
      topCategories: []
    };
  }

  onClickJoinButton() {}

  setActiveFilter(filter: PostFilterType) {
    this.setState({
      ...this.state,
      activeFilter: filter
    });
  }

  getPosts() {
    const activeFilter = this.state.activeFilter;

    if (activeFilter === 'NEW') {
      this.props.getRecentPosts();
    } else {
      this.props.getPopularPosts();
    }
  }

  onFilterChanged(prevState: IndexPageState) {
    const currentState: IndexPageState = this.state;
    if (prevState.activeFilter !== currentState.activeFilter) {
      this.getPosts();
    }
  }

  setActiveFilterOnLoad() {
    const showNewFilter = (this.props.location.search as string).includes(
      'show=new'
    );
    const showPopularFilter = (this.props.location.search as string).includes(
      'show=popular'
    );

    let activeFilter = this.state.activeFilter;

    if (showNewFilter) {
      activeFilter = 'NEW';
    }

    this.setState({
      ...this.state,
      activeFilter
    });
  }

  getPostsFromActiveFilterGroup(): Post[] {
    if (this.state.activeFilter === 'NEW') {
      return this.props.forum.recentPosts;
    } else {
      return this.props.forum.popularPosts;
    }
  }

  componentDidUpdate(prevProps: IndexPageProps, prevState: IndexPageState) {
    this.onFilterChanged(prevState);
  }

  componentDidMount() {
    this.setActiveFilterOnLoad();
    this.getPosts();
    postService.getTopCategories(10).then((res) => {
      if (res.isRight()) {
        this.setState({
          topCategories: res.value.getValue()
        });
      }
    });
  }

  render() {
    const { activeFilter } = this.state;

    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
          <Header
            user={
              'username' in this.props.users.user
                ? this.props.users.user
                : undefined
            }
            title="Master-Forum Community"
            subtitle="Where awesome Peoples can communicate"
          />{' '}
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
        <br />
        <Search
          onSearch={(text) =>
            this.props.history.push('/search/' + UriUtil.encodeText(text))
          }
        />
        <br />
        <div className="main-page-content">
          <div>
            <PostFilters
              activeFilter={activeFilter}
              onClick={(filter) => this.setActiveFilter(filter)}
            />
            <p style={{ marginTop: '5px' }}>
              x{this.getPostsFromActiveFilterGroup().length} posts
            </p>
            {this.getPostsFromActiveFilterGroup().map((p, i) => (
              <PostRow
                key={i}
                isDownvoted={p.wasDownvotedByMe}
                isUpvoted={p.wasUpvotedByMe}
                onUpvoteClicked={() => this.props.upvotePost(p.slug)}
                onDownvoteClicked={() => this.props.downvotePost(p.slug)}
                isLoggedIn={this.props.users.isAuthenticated}
                {...p}
              />
            ))}
          </div>
          <div className="top-categories">
            <h3>Top categories</h3>
            <div className="top-categories__categories">
              {this.state.topCategories.map((c, i) => (
                <div className="flex" style={{ columnGap: '10px' }} key={i}>
                  <Link
                    key={i}
                    to={`/category/${UriUtil.encodeText(c.title)}`}
                    className="top-categories__category"
                  >
                    {c.title}
                  </Link>
                  <span>x{c.postsCount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
)(withLogoutHandling(withVoting(IndexPage)));
