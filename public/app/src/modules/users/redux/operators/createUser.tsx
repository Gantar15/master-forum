import * as actionCreators from '../actionCreators';

import { User } from '../../models/user';
import { usersService } from '../../services';

function createUser(
  email: string,
  username: string,
  password: string,
  role?: 'admin' | 'manager'
) {
  return async (dispatch: any) => {
    dispatch(actionCreators.creatingUser());

    const result = await usersService.createUser(
      email,
      username,
      password,
      role
    );

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.creatingUserFailure(error));
    } else {
      const user: User = result.value.getValue();
      dispatch(actionCreators.creatingUserSuccess(user));
    }
  };
}

export { createUser };
