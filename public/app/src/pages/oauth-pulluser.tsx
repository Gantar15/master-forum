import * as usersOperators from '../modules/users/redux/operators';

import { useHistory, useParams } from 'react-router-dom';

import { IUserOperators } from '../modules/users/redux/operators';
import { Layout } from '../shared/layout';
import { Loader } from '../shared/components/loader';
import React from 'react';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';

interface LoginPageProps extends IUserOperators {
  users: UsersState;
}

const OauthPulluser = ({ oauthPulluser, users }: LoginPageProps) => {
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (!username) return;
    oauthPulluser(username);
  }, [username]);

  useEffect(() => {
    if (users.isLoggingInSuccess) window.location.href = '/';
  }, [users.isLoggingInSuccess]);

  return (
    <Layout>
      <div className="email-verify">
        <p>Await confirmation please</p>
        <Loader />
      </div>
    </Layout>
  );
};

function mapStateToProps({ users }: { users: UsersState }) {
  return {
    users
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(OauthPulluser);
