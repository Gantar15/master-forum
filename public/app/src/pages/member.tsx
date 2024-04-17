import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import Header from '../shared/components/header/components/Header';
import { Layout } from '../shared/layout';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';

interface MemberPageProps extends usersOperators.IUserOperators {
  match: any;
  users: UsersState;
}

export class MemberPage extends React.Component<MemberPageProps, any> {
  constructor(props: any) {
    super(props);
  }

  getUserName() {
    return this.props.match.params.username;
  }

  render() {
    const username = this.getUserName();
    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation to={`/`} text={'Back to all discussions'} />
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
          title={'Member'}
          subtitle=""
        />
        <br />
        <h2>{username}</h2>
        <p>Just a regular user, nothing interesting :p</p>
      </Layout>
    );
  }
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators
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
