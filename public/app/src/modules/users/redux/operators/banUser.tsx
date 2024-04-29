import * as actionCreators from '../actionCreators';

import { usersService } from '../../services';

function banUser(userId: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.banUser());

    const result = await usersService.banUser(userId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.banUserFailure(error));
    } else {
      dispatch(actionCreators.banUserSuccess(userId));
    }
  };
}

export { banUser };
