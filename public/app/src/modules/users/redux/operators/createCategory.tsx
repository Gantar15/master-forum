import * as actionCreators from '../actionCreators';

import { usersService } from '../../services';

function createCategory(category: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.createCategory());

    const result = await usersService.createCategory(category);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.createCategoryFailure(error));
    } else {
      dispatch(actionCreators.createCategorySuccess(category));
    }
  };
}

export { createCategory };
