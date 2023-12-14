import * as usersOperators from '../../../modules/users/redux/operators';

import { Redirect, Route } from 'react-router-dom';

import { FullPageLoader } from '../../components/loader';
import React from 'react';
import { UsersState } from '../../../modules/users/redux/states';
import { bindActionCreators } from 'redux';
//@ts-ignore
import { connect } from 'react-redux';

interface RolesRouteProps {
  users: UsersState;
  component: any;
  path: any;
  roles: ('admin' | 'manager')[];
  redirect?: string;
}

const RolesRoute: React.FC<RolesRouteProps> = ({
  roles,
  users,
  redirect = '/',
  component: Component,
  ...rest
}) => {
  let isPermitted = false;
  if ('username' in users.user) {
    if (roles.includes('admin') && users.user.isAdminUser) {
      isPermitted = true;
    } else if (roles.includes('manager') && users.user.isManagerUser) {
      isPermitted = true;
    }
  }

  if (users.isFetchingUser) return <FullPageLoader />;
  return (
    <Route
      {...rest}
      render={(props) =>
        isPermitted ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: redirect, state: { from: props.location } }}
          />
        )
      }
    />
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(RolesRoute);
