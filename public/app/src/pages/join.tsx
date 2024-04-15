import * as usersOperators from '../modules/users/redux/operators';

import Header from '../shared/components/header/components/Header';
import { IUserOperators } from '../modules/users/redux/operators';
import { Layout } from '../shared/layout';
import { OnboardTemplate } from '../modules/users/components/onboarding/onboardTemplate';
import React from 'react';
import { TextUtil } from '../shared/utils/TextUtil';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
//@ts-ignore
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import withLoginHandling from '../modules/users/hocs/withLoginHandling';

interface JoinPageProps extends IUserOperators {
  users: UsersState;
  history: any;
}

interface JoinPageState {
  email: string;
  username: string;
  password: string;
}

class JoinPage extends React.Component<JoinPageProps, JoinPageState> {
  constructor(props: JoinPageProps) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  updateFormField(fieldName: string, value: string) {
    this.setState({
      ...this.state,
      [fieldName]: value
    });
  }

  isFormValid = () => {
    const { email, username, password } = this.state;

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

    if (!!password === false || TextUtil.atLeast(password, 6)) {
      toast.error('Yeahhhhh, your password should be at least 6 chars 🤠', {
        autoClose: 3000
      });
      return false;
    }

    return true;
  };

  afterJoinSuccess(prevProps: JoinPageProps) {
    const currentProps: JoinPageProps = this.props;
    if (
      currentProps.users.isCreatingUserSuccess ===
      !prevProps.users.isCreatingUserSuccess
    ) {
      toast.success(`You're all signed up! Confirm mail 🤠`, {
        autoClose: 3000
      });
    }
  }

  afterJoinFailure(prevProps: JoinPageProps) {
    const currentProps: JoinPageProps = this.props;
    if (
      currentProps.users.isCreatingUserFailure ===
      !prevProps.users.isCreatingUserFailure
    ) {
      const error: string = currentProps.users.error;
      return (
        error &&
        toast.error(`Yeahhhhh, ${error} 🤠`, {
          autoClose: 3000
        })
      );
    }
  }

  componentDidUpdate(prevProps: JoinPageProps) {
    this.afterJoinSuccess(prevProps);
    this.afterJoinFailure(prevProps);
  }

  async onSubmit() {
    if (this.isFormValid()) {
      const { email, username, password } = this.state;
      this.props.createUser(email, username, password);
    }
  }

  render() {
    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
          <Header
            title="Master-Forum Community"
            subtitle="Where awesome Peoples can communicate"
          />
        </div>
        <OnboardTemplate
          type="signup"
          updateFormField={(fieldName: string, val: string) =>
            this.updateFormField(fieldName, val)
          }
          onSubmit={() => this.onSubmit()}
        />
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
)(withLoginHandling(JoinPage));
