import * as actionCreators from '../actionCreators';

import { usersService } from '../../services';

function oauthPulluser(username: string) {
  return async (dispatch: any, getState?: any) => {
    dispatch(actionCreators.loggingIn());

    const result = await usersService.oauthPulluser(username);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.loggingInFailure(error));
    } else {
      dispatch(actionCreators.loggingInSuccess());
    }
  };
}

export { oauthPulluser };
