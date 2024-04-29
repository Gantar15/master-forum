export type UsersActionType =
  | 'DELETE_CATEGORY'
  | 'DELETE_CATEGORY_SUCCESS'
  | 'DELETE_CATEGORY_FAILURE'
  | 'CREATE_CATEGORY'
  | 'CREATE_CATEGORY_SUCCESS'
  | 'CREATE_CATEGORY_FAILURE'
  | 'GET_CATEGORIES'
  | 'GET_CATEGORIES_SUCCESS'
  | 'GET_CATEGORIES_FAILURE'
  | 'DELETE_USER'
  | 'DELETE_USER_SUCCESS'
  | 'DELETE_USER_FAILURE'
  | 'BAN_USER'
  | 'BAN_USER_SUCCESS'
  | 'BAN_USER_FAILURE'
  | 'UNBAN_USER'
  | 'UNBAN_USER_SUCCESS'
  | 'UNBAN_USER_FAILURE'
  | 'CREATE_USER'
  | 'CREATE_USER_SUCCESS'
  | 'CREATE_USER_FAILURE'
  | 'GET_USERS'
  | 'GET_USERS_SUCCESS'
  | 'GET_USERS_FAILURE'
  | 'GET_USERS'
  | 'GET_USERS_SUCCESS'
  | 'GET_USERS_FAILURE'
  | 'GETTING_USER_PROFILE'
  | 'GETTING_USER_PROFILE_SUCCESS'
  | 'GETTING_USER_PROFILE_FAILURE'
  | 'LOGGING_IN'
  | 'LOGGING_IN_SUCCESS'
  | 'LOGGING_IN_FAILURE'
  | 'LOGGING_OUT'
  | 'LOGGING_OUT_SUCCESS'
  | 'LOGGING_OUT_FAILURE'
  | 'CREATING_USER'
  | 'CREATING_USER_SUCCESS'
  | 'CREATING_USER_FAILURE';

const GET_USERS: UsersActionType = 'GET_USERS';
const GET_USERS_SUCCESS: UsersActionType = 'GET_USERS_SUCCESS';
const GET_USERS_FAILURE: UsersActionType = 'GET_USERS_FAILURE';

const CREATE_USER: UsersActionType = 'CREATE_USER';
const CREATE_USER_SUCCESS: UsersActionType = 'CREATE_USER_SUCCESS';
const CREATE_USER_FAILURE: UsersActionType = 'CREATE_USER_FAILURE';

const DELETE_USER: UsersActionType = 'DELETE_USER';
const DELETE_USER_SUCCESS: UsersActionType = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAILURE: UsersActionType = 'DELETE_USER_FAILURE';

const BAN_USER: UsersActionType = 'BAN_USER';
const BAN_USER_SUCCESS: UsersActionType = 'BAN_USER_SUCCESS';
const BAN_USER_FAILURE: UsersActionType = 'BAN_USER_FAILURE';

const UNBAN_USER: UsersActionType = 'UNBAN_USER';
const UNBAN_USER_SUCCESS: UsersActionType = 'UNBAN_USER_SUCCESS';
const UNBAN_USER_FAILURE: UsersActionType = 'UNBAN_USER_FAILURE';

const CREATE_CATEGORY: UsersActionType = 'CREATE_CATEGORY';
const CREATE_CATEGORY_SUCCESS: UsersActionType = 'CREATE_CATEGORY_SUCCESS';
const CREATE_CATEGORY_FAILURE: UsersActionType = 'CREATE_CATEGORY_FAILURE';

const DELETE_CATEGORY: UsersActionType = 'DELETE_CATEGORY';
const DELETE_CATEGORY_SUCCESS: UsersActionType = 'DELETE_CATEGORY_SUCCESS';
const DELETE_CATEGORY_FAILURE: UsersActionType = 'DELETE_CATEGORY_FAILURE';

const GET_CATEGORIES: UsersActionType = 'GET_CATEGORIES';
const GET_CATEGORIES_SUCCESS: UsersActionType = 'GET_CATEGORIES_SUCCESS';
const GET_CATEGORIES_FAILURE: UsersActionType = 'GET_CATEGORIES_FAILURE';

const GETTING_USER_PROFILE: UsersActionType = 'GETTING_USER_PROFILE';
const GETTING_USER_PROFILE_SUCCESS: UsersActionType =
  'GETTING_USER_PROFILE_SUCCESS';
const GETTING_USER_PROFILE_FAILURE: UsersActionType =
  'GETTING_USER_PROFILE_FAILURE';

const LOGGING_IN: UsersActionType = 'LOGGING_IN';
const LOGGING_IN_SUCCESS: UsersActionType = 'LOGGING_IN_SUCCESS';
const LOGGING_IN_FAILURE: UsersActionType = 'LOGGING_IN_FAILURE';

const LOGGING_OUT: UsersActionType = 'LOGGING_OUT';
const LOGGING_OUT_SUCCESS: UsersActionType = 'LOGGING_OUT_SUCCESS';
const LOGGING_OUT_FAILURE: UsersActionType = 'LOGGING_OUT_FAILURE';

const CREATING_USER: UsersActionType = 'CREATING_USER';
const CREATING_USER_SUCCESS: UsersActionType = 'CREATING_USER_SUCCESS';
const CREATING_USER_FAILURE: UsersActionType = 'CREATING_USER_FAILURE';

export {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_FAILURE,
  UNBAN_USER,
  UNBAN_USER_SUCCESS,
  UNBAN_USER_FAILURE,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GETTING_USER_PROFILE,
  GETTING_USER_PROFILE_SUCCESS,
  GETTING_USER_PROFILE_FAILURE,
  LOGGING_IN,
  LOGGING_IN_SUCCESS,
  LOGGING_IN_FAILURE,
  LOGGING_OUT,
  LOGGING_OUT_SUCCESS,
  LOGGING_OUT_FAILURE,
  CREATING_USER,
  CREATING_USER_SUCCESS,
  CREATING_USER_FAILURE
};
