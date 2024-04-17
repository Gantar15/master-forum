import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import CreateUserForm from '../modules/users/components/users/createUserForm/components/CreateUserForm';
import { Layout } from '../shared/layout';
import ManagerHeader from '../shared/components/header/components/ManagerHeader';
import ModalWindow from '../shared/components/modal-window/components/ModalWindow';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { TextUtil } from '../shared/utils/TextUtil';
import { User } from '../modules/users/models/user';
import UserRow from '../modules/users/components/users/userRow/components/UserRow';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
//@ts-ignore
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';

interface UsersManagmentPageProps extends usersOperators.IUserOperators {
  users: UsersState;
  location: any;
  history: any;
}

interface UsersManagmentPageState {
  isDeleteModalOpen: boolean;
  userToDelete?: User;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'manager';
}

class UsersManagmentPage extends React.Component<
  UsersManagmentPageProps,
  UsersManagmentPageState
> {
  constructor(props: UsersManagmentPageProps) {
    super(props);

    this.state = {
      isDeleteModalOpen: false,
      userToDelete: undefined,
      email: '',
      username: '',
      password: '',
      role: 'user'
    };
  }

  updateFormField(fieldName: string, value: string) {
    this.setState({
      ...this.state,
      [fieldName]: value
    });
  }

  isFormValid = () => {
    const { email, username, role, password } = this.state;

    if (email === '' || email === undefined || !TextUtil.validateEmail(email)) {
      toast.error('Yeahhhhh, Want to try that again with a valid email? 🤠', {
        autoClose: 3000
      });
      return false;
    }

    if (
      !!username === false ||
      TextUtil.atLeast(username, 2) ||
      TextUtil.atMost(username, 50)
    ) {
      toast.error(
        'Yeahhhhh, username should be at least 2 chars and at most 50. 🤠',
        {
          autoClose: 3000
        }
      );
      return false;
    }

    if (role !== 'manager' && role !== 'user') {
      toast.error('Yeahhhhh, your role should be either manager or user 🤠', {
        autoClose: 3000
      });
      return false;
    }

    if (!!password === false || TextUtil.atLeast(password, 6)) {
      toast.error('Yeahhhhh, your password should be at least 6 chars 🤠', {
        autoClose: 3000
      });
      return false;
    }

    return true;
  };

  onAction(action: string, user: User) {
    if (action === 'delete') {
      this.setState((state) => ({
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen,
        userToDelete: user
      }));
    }
  }

  afterSuccessfulCreate(prevProps: UsersManagmentPageProps) {
    const currentProps: UsersManagmentPageProps = this.props;
    if (
      currentProps.users.isCreatingUserSuccess ===
      !prevProps.users.isCreatingUserSuccess
    ) {
      this.setState({
        ...this.state,
        isDeleteModalOpen: false
      });
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
    }
  }

  afterFailedCreate(prevProps: UsersManagmentPageProps) {
    const currentProps: UsersManagmentPageProps = this.props;
    if (
      currentProps.users.isCreatingUserFailure ===
      !prevProps.users.isCreatingUserFailure
    ) {
      this.setState({
        ...this.state,
        isDeleteModalOpen: false
      });
      const error: string = currentProps.users.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      });
    }
  }

  afterSuccessfulDelete(prevProps: UsersManagmentPageProps) {
    const currentProps: UsersManagmentPageProps = this.props;
    if (
      currentProps.users.isDeleteUserSuccess ===
      !prevProps.users.isDeleteUserSuccess
    ) {
      this.setState({
        ...this.state,
        isDeleteModalOpen: false
      });
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
    }
  }

  afterFailedDelete(prevProps: UsersManagmentPageProps) {
    const currentProps: UsersManagmentPageProps = this.props;
    if (
      currentProps.users.isDeleteUserFailure ===
      !prevProps.users.isDeleteUserFailure
    ) {
      this.setState({
        ...this.state,
        isDeleteModalOpen: false
      });
      const error: string = currentProps.users.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      });
    }
  }

  async onSubmit() {
    if (this.isFormValid()) {
      const { email, username, role, password } = this.state;
      this.props.createUser(
        email,
        username,
        password,
        role === 'manager' ? 'manager' : undefined
      );
    }
  }

  componentDidUpdate(
    prevProps: UsersManagmentPageProps,
    prevState: UsersManagmentPageState
  ) {
    this.afterSuccessfulDelete(prevProps);
    this.afterFailedDelete(prevProps);
    this.afterSuccessfulCreate(prevProps);
    this.afterFailedCreate(prevProps);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <Layout>
        <ModalWindow
          title="Confirmation!"
          text="Are you sure you want to delete this user?"
          isOpen={this.state.isDeleteModalOpen}
          onOk={() =>
            this.state.userToDelete &&
            this.props.deleteUser(this.state.userToDelete.userId)
          }
          onCancel={() => this.setState({ isDeleteModalOpen: false })}
          okTitle="Yes, delete"
        />
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation text="Back to user mode" to="/" />
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
        <ManagerHeader
          user={this.props.users.user as User}
          title="Master-Forum Managment"
          subtitle="Where Managers can conjure up"
        />
        <br />
        <br />

        <CreateUserForm
          onSubmit={() => this.onSubmit()}
          updateFormField={(fieldName, value) =>
            this.updateFormField(fieldName, value)
          }
        />

        {this.props.users.users.map((user) => (
          <>
            <UserRow
              key={user.userId}
              onAction={(action, user) => this.onAction(action, user)}
              onUserClick={(user) =>
                this.props.history.push(`/member/${user.username}`)
              }
              {...user}
            />
            <br />
          </>
        ))}
      </Layout>
    );
  }
}

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
)(withLogoutHandling(UsersManagmentPage));
