import * as actionCreators from '../actionCreators';

import { usersService } from '../../services/';

function deleteUser(userId: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.deleteUser());

    const result = await usersService.deleteUser(userId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.deleteUserFailure(error));
    } else {
      dispatch(actionCreators.deleteUserSuccess(userId));
    }
  };
}

export { deleteUser };
