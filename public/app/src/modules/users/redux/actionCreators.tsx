import * as actions from './actions';

import { User } from '../models/user';

export type UsersAction = { [key: string]: actions.UsersActionType | any };

// create category

function createCategory(): UsersAction {
  return {
    type: actions.CREATE_CATEGORY
  };
}

function createCategorySuccess(
  category: string
): UsersAction & { category: string } {
  return {
    type: actions.CREATE_CATEGORY_SUCCESS,
    category
  };
}

function createCategoryFailure(error: string): UsersAction & { error: string } {
  return {
    type: actions.CREATE_CATEGORY_FAILURE,
    error
  };
}

// delete category

function deleteCategory(): UsersAction {
  return {
    type: actions.DELETE_CATEGORY
  };
}

function deleteCategorySuccess(
  category: string
): UsersAction & { category: string } {
  return {
    type: actions.DELETE_CATEGORY_SUCCESS,
    category
  };
}

function deleteCategoryFailure(error: string): UsersAction & { error: string } {
  return {
    type: actions.DELETE_CATEGORY_FAILURE,
    error
  };
}

//get categories

function getCategories(): UsersAction {
  return {
    type: actions.GET_CATEGORIES
  };
}

function getCategoriesSuccess(
  categories: string[]
): UsersAction & { categories: string[] } {
  return {
    type: actions.GET_CATEGORIES_SUCCESS,
    categories
  };
}

function getCategoriesFailure(error: string): UsersAction & { error: string } {
  return {
    type: actions.GET_CATEGORIES_FAILURE,
    error
  };
}

// delete user

function deleteUser(): UsersAction {
  return {
    type: actions.DELETE_USER
  };
}

function deleteUserSuccess(userId: string): UsersAction & { userId: string } {
  return {
    type: actions.DELETE_USER_SUCCESS,
    userId
  };
}

function deleteUserFailure(error: string): UsersAction & { error: string } {
  return {
    type: actions.DELETE_USER_FAILURE,
    error
  };
}

// ban user

function banUser(): UsersAction {
  return {
    type: actions.BAN_USER
  };
}

function banUserSuccess(userId: string): UsersAction & { userId: string } {
  return {
    type: actions.BAN_USER_SUCCESS,
    userId
  };
}

function banUserFailure(error: string): UsersAction & { error: string } {
  return {
    type: actions.BAN_USER_FAILURE,
    error
  };
}

// unban user

function unbanUser(): UsersAction {
  return {
    type: actions.UNBAN_USER
  };
}

function unbanUserSuccess(userId: string): UsersAction & { userId: string } {
  return {
    type: actions.UNBAN_USER_SUCCESS,
    userId
  };
}

function unbanUserFailure(error: string): UsersAction & { error: string } {
  return {
    type: actions.UNBAN_USER_FAILURE,
    error
  };
}

// get users

function getUsers(): UsersAction {
  return {
    type: actions.GET_USERS
  };
}

function getUsersSuccess(users: User[]): UsersAction & { users: User[] } {
  return {
    type: actions.GET_USERS_SUCCESS,
    users
  };
}

function getUsersFailure(error: string): UsersAction & { error: string } {
  return {
    type: actions.GET_USERS_FAILURE,
    error
  };
}

//getting user profile

function gettingUserProfile(): UsersAction {
  return {
    type: actions.GETTING_USER_PROFILE
  };
}

function gettingUserProfileSuccess(user: User): UsersAction & { user: User } {
  return {
    type: actions.GETTING_USER_PROFILE_SUCCESS,
    user
  };
}

function gettingUserProfileFailure(
  errorMessage: string
): UsersAction & { errorMessage: string } {
  return {
    type: actions.GETTING_USER_PROFILE_FAILURE,
    errorMessage
  };
}

function loggingIn(): UsersAction {
  return {
    type: actions.LOGGING_IN
  };
}

function loggingInSuccess(): UsersAction {
  return {
    type: actions.LOGGING_IN_SUCCESS
  };
}

function loggingInFailure(error: string): UsersAction {
  return {
    type: actions.LOGGING_IN_FAILURE,
    error
  };
}

function loggingOut(): UsersAction {
  return {
    type: actions.LOGGING_OUT
  };
}

function loggingOutSuccess(): UsersAction {
  return {
    type: actions.LOGGING_OUT_SUCCESS
  };
}

function loggingOutFailure(error: string): UsersAction {
  return {
    type: actions.LOGGING_OUT_FAILURE,
    error
  };
}

function creatingUser(): UsersAction {
  return {
    type: actions.CREATING_USER
  };
}

function creatingUserSuccess(user: User): UsersAction & { user: User } {
  return {
    type: actions.CREATING_USER_SUCCESS,
    user
  };
}

function creatingUserFailure(error: string): UsersAction {
  return {
    type: actions.CREATING_USER_FAILURE,
    error
  };
}

export {
  createCategory,
  createCategorySuccess,
  createCategoryFailure,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFailure,
  getCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  banUser,
  banUserSuccess,
  banUserFailure,
  unbanUser,
  unbanUserSuccess,
  unbanUserFailure,
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  gettingUserProfile,
  gettingUserProfileSuccess,
  gettingUserProfileFailure,
  loggingIn,
  loggingInSuccess,
  loggingInFailure,
  loggingOut,
  loggingOutSuccess,
  loggingOutFailure,
  creatingUser,
  creatingUserSuccess,
  creatingUserFailure
};
