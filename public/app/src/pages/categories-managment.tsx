import './styles/categories-managment.scss';

import * as usersOperators from '../modules/users/redux/operators';

import { BackNavigation } from '../shared/components/header';
import CategoryRow from '../modules/users/components/categories/categoryRow/components/CategoryRow';
import CreateCategoryForm from '../modules/users/components/categories/createCategoryForm/components/CreateCategoryForm';
import { Layout } from '../shared/layout';
import ManagerHeader from '../shared/components/header/components/ManagerHeader';
import ModalWindow from '../shared/components/modal-window/components/ModalWindow';
import { ProfileButton } from '../modules/users/components/profileButton';
import React from 'react';
import { TextUtil } from '../shared/utils/TextUtil';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { bindActionCreators } from 'redux';
//@ts-ignore
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';

interface CategoriesManagmentPageProps extends usersOperators.IUserOperators {
  users: UsersState;
  location: any;
  history: any;
}

interface CategoriesManagmentPageState {
  isDeleteModalOpen: boolean;
  categoryToDelete?: string;
  category: string;
}

class CategoriesManagmentPage extends React.Component<
  CategoriesManagmentPageProps,
  CategoriesManagmentPageState
> {
  constructor(props: CategoriesManagmentPageProps) {
    super(props);

    this.state = {
      isDeleteModalOpen: false,
      categoryToDelete: undefined,
      category: ''
    };
  }

  updateFormField(fieldName: string, value: string) {
    this.setState({
      ...this.state,
      [fieldName]: value
    });
  }

  isFormValid = () => {
    const { category } = this.state;

    if (
      category === '' ||
      TextUtil.atLeast(category, 1) ||
      TextUtil.atMost(category, 50)
    ) {
      toast.error(
        'Yeahhhhh, category should be at least 1 chars and at most 50. 🤠',
        {
          autoClose: 3000
        }
      );
      return false;
    }

    return true;
  };

  onAction(action: string, category: string) {
    if (action === 'delete') {
      this.setState((state) => ({
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen,
        categoryToDelete: category
      }));
    }
  }

  afterSuccessfulCreate(prevProps: CategoriesManagmentPageProps) {
    const currentProps: CategoriesManagmentPageProps = this.props;
    if (
      currentProps.users.isCreateCategorySuccess ===
      !prevProps.users.isCreateCategorySuccess
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

  afterFailedCreate(prevProps: CategoriesManagmentPageProps) {
    const currentProps: CategoriesManagmentPageProps = this.props;
    if (
      currentProps.users.isCreateCategoryFailure ===
      !prevProps.users.isCreateCategoryFailure
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

  afterSuccessfulDelete(prevProps: CategoriesManagmentPageProps) {
    const currentProps: CategoriesManagmentPageProps = this.props;
    if (
      currentProps.users.isDeleteCategorySuccess ===
      !prevProps.users.isDeleteCategorySuccess
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

  afterFailedDelete(prevProps: CategoriesManagmentPageProps) {
    const currentProps: CategoriesManagmentPageProps = this.props;
    if (
      currentProps.users.isDeleteCategoryFailure ===
      !prevProps.users.isDeleteCategoryFailure
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
      const { category } = this.state;
      this.props.createCategory(category);
    }
  }

  componentDidUpdate(
    prevProps: CategoriesManagmentPageProps,
    prevState: CategoriesManagmentPageState
  ) {
    this.afterSuccessfulDelete(prevProps);
    this.afterFailedDelete(prevProps);
    this.afterSuccessfulCreate(prevProps);
    this.afterFailedCreate(prevProps);
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <Layout>
        <ModalWindow
          title="Confirmation!"
          text="Are you sure you want to delete this category?"
          isOpen={this.state.isDeleteModalOpen}
          onOk={() =>
            this.state.categoryToDelete &&
            this.props.deleteCategory(this.state.categoryToDelete)
          }
          onCancel={() => this.setState({ isDeleteModalOpen: false })}
          okTitle="Yes, delete"
        />
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation text="Back to user mode" to="/" />
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
        <ManagerHeader
          user={this.props.users.user as User}
          title="Master-Forum Managment"
          subtitle="Where Managers can conjure up"
        />
        <br />
        <br />

        <CreateCategoryForm
          onSubmit={() => this.onSubmit()}
          updateFormField={(fieldName, value) =>
            this.updateFormField(fieldName, value)
          }
        />

        <div className="categories-managment__categories">
          {this.props.users.categories.map((category) => (
            <CategoryRow
              key={category}
              onAction={(action, category) => this.onAction(action, category)}
              onCategoryClick={(category) =>
                this.props.history.push(`/category/${category}`)
              }
              category={category}
            />
          ))}
        </div>
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
)(withLogoutHandling(CategoriesManagmentPage));
