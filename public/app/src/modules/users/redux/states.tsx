import { User } from '../models/user';

export interface UsersState {
  user: User | {};
  users: User[];
  categories: string[];

  isGetUsers: boolean;
  isGetUsersSuccess: boolean;
  isGetUsersFailure: boolean;

  isDeleteUser: boolean;
  isDeleteUserSuccess: boolean;
  isDeleteUserFailure: boolean;

  isBanUser: boolean;
  isBanUserSuccess: boolean;
  isBanUserFailure: boolean;

  isUnbanUser: boolean;
  isUnbanUserSuccess: boolean;
  isUnbanUserFailure: boolean;

  isCreateCategory: boolean;
  isCreateCategorySuccess: boolean;
  isCreateCategoryFailure: boolean;

  isDeleteCategory: boolean;
  isDeleteCategorySuccess: boolean;
  isDeleteCategoryFailure: boolean;

  isGetCategories: boolean;
  isGetCategoriesSuccess: boolean;
  isGetCategoriesFailure: boolean;

  isAuthenticated: boolean;
  isFetchingUser: boolean;
  isFetchingUserSuccess: boolean;
  isFetchingUserFailure: boolean;

  isLoggingIn: boolean;
  isLoggingInSuccess: boolean;
  isLoggingInFailure: boolean;

  isLoggingOut: boolean;
  isLoggingOutSuccess: boolean;
  isLoggingOutFailure: boolean;

  isCreatingUser: boolean;
  isCreatingUserSuccess: boolean;
  isCreatingUserFailure: boolean;

  error: string;
}

const initialUserState: UsersState = {
  user: {},
  users: [],
  categories: [],

  isGetUsers: false,
  isGetUsersSuccess: false,
  isGetUsersFailure: false,

  isDeleteUser: false,
  isDeleteUserSuccess: false,
  isDeleteUserFailure: false,

  isBanUser: false,
  isBanUserSuccess: false,
  isBanUserFailure: false,

  isUnbanUser: false,
  isUnbanUserSuccess: false,
  isUnbanUserFailure: false,

  isCreateCategory: false,
  isCreateCategorySuccess: false,
  isCreateCategoryFailure: false,

  isDeleteCategory: false,
  isDeleteCategorySuccess: false,
  isDeleteCategoryFailure: false,

  isGetCategories: false,
  isGetCategoriesSuccess: false,
  isGetCategoriesFailure: false,

  isAuthenticated: false,
  isFetchingUser: false,
  isFetchingUserSuccess: false,
  isFetchingUserFailure: false,

  isLoggingIn: false,
  isLoggingInSuccess: false,
  isLoggingInFailure: false,

  isLoggingOut: false,
  isLoggingOutSuccess: false,
  isLoggingOutFailure: false,

  isCreatingUser: false,
  isCreatingUserSuccess: false,
  isCreatingUserFailure: false,

  error: ''
};

export default initialUserState;
