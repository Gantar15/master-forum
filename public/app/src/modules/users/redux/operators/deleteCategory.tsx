import * as actionCreators from '../actionCreators';

import { usersService } from '../../services/';

function deleteCategory(category: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.deleteCategory());

    const result = await usersService.deleteCategory(category);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.deleteCategoryFailure(error));
    } else {
      dispatch(actionCreators.deleteCategorySuccess(category));
    }
  };
}

export { deleteCategory };
