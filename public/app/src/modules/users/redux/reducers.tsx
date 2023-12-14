import * as actions from './actions';

import states, { UsersState } from './states';

import { ReduxUtils } from '../../../shared/utils/ReduxUtils';
import { UsersAction } from './actionCreators';

export default function users(
  state: UsersState = states,
  action: UsersAction
): UsersState {
  switch (action.type as actions.UsersActionType) {
    case actions.DELETE_CATEGORY:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteCategory'),
        error: ''
      };
    case actions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteCategory', true),
        categories: (() => {
          const categories = [...state.categories];
          const index = categories.findIndex(
            (category) => category === action.category
          );
          categories.splice(index, 1);
          return categories;
        })()
      };
    case actions.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteCategory', false),
        error: action.error
      };

    case actions.GET_CATEGORIES:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetCategories'),
        error: ''
      };
    case actions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetCategories', true),
        categories: action.categories
      };
    case actions.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetCategories', false),
        error: action.error
      };

    case actions.DELETE_USER:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteUser'),
        error: ''
      };
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteUser', true),
        users: (() => {
          const users = [...state.users];
          const index = users.findIndex(
            (user) => user.userId === action.userId
          );
          users.splice(index, 1);
          return users;
        })()
      };
    case actions.DELETE_USER_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isDeleteUser', false),
        error: action.error
      };

    case actions.GET_USERS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetUsers'),
        error: ''
      };
    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetUsers', true),
        users: action.users
      };
    case actions.GET_USERS_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isGetUsers', false),
        error: action.error
      };

    case actions.GETTING_USER_PROFILE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isFetchingUser')
      };
    case actions.GETTING_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isFetchingUser', true),
        user: action.user,
        isAuthenticated: true
      };
    case actions.GETTING_USER_PROFILE_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isFetchingUser', false)
      };

    case actions.LOGGING_IN:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isLoggingIn'),
        error: ''
      };
    case actions.LOGGING_IN_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isLoggingIn', true),
        isAuthenticated: true
      };
    case actions.LOGGING_IN_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isLoggingIn', false),
        error: action.error
      };

    case actions.LOGGING_OUT:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isLoggingOut'),
        error: ''
      };
    case actions.LOGGING_OUT_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isLoggingOut', true),
        isAuthenticated: false
      };
    case actions.LOGGING_OUT_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isLoggingOut', false),
        error: action.error
      };

    case actions.CREATING_USER:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingUser'),
        error: action.error
      };
    case actions.CREATING_USER_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingUser', true),
        user: action.user
      };
    case actions.CREATING_USER_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus('isCreatingUser', false),
        error: action.error
      };
    default:
      return state;
  }
}
