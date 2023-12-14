import * as actionCreators from '../actionCreators';

import { User } from '../../models/user';
import { usersService } from '../../services';

function getUsers() {
  return async (dispatch: any) => {
    dispatch(actionCreators.getUsers());

    const result = await usersService.getUsers();

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getUsersFailure(error));
    } else {
      const users: User[] = result.value.getValue();
      dispatch(actionCreators.getUsersSuccess(users));
    }
  };
}

export { getUsers };
