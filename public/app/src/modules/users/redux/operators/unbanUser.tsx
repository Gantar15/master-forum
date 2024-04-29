import * as actionCreators from '../actionCreators';

import { usersService } from '../../services';

function unbanUser(userId: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.unbanUser());

    const result = await usersService.unbanUser(userId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.unbanUserFailure(error));
    } else {
      dispatch(actionCreators.unbanUserSuccess(userId));
    }
  };
}

export { unbanUser };
