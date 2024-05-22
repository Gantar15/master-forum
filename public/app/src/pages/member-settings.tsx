import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import { Button } from '../shared/components/button';
import { Layout } from '../shared/layout';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { TextInput } from '../shared/components/text-input';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { usersService } from '../modules/users/services';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';

interface MemberSettingsPageProps extends usersOperators.IUserOperators {
  users: UsersState;
}

interface MemberSettingsPageState {
  password: string;
}

class MemberSettingsPage extends React.Component<
  MemberSettingsPageProps,
  MemberSettingsPageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: ''
    };
  }

  public async update() {
    const response = await usersService.updateUser({
      userId: (this.props.users.user as User).userId,
      password: this.state.password
    });

    if (response.isRight()) {
      toast.success(`Updated! 🤠`, {
        autoClose: 2000
      });
    } else {
      toast.error(`Update error: ${response.value}. 🤠`, {
        autoClose: 2000
      });
    }
  }

  render(): React.ReactNode {
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

        <h2>Member settings</h2>
        <div>
          <p>Change password:</p>
          <TextInput
            placeholder="password"
            onChange={(val: string) => this.setState({ password: val })}
            type="text"
          />

          <Button text="Update" onClick={() => this.update()} />
        </div>
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
)(withLogoutHandling(MemberSettingsPage));
