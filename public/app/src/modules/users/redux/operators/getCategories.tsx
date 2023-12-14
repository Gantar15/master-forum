import * as actionCreators from '../actionCreators';

import { usersService } from '../../services';

function getCategories() {
  return async (dispatch: any) => {
    dispatch(actionCreators.getCategories());

    const result = await usersService.getCategories();

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getCategoriesFailure(error));
    } else {
      const categories: string[] = result.value.getValue();
      dispatch(actionCreators.getCategoriesSuccess(categories));
    }
  };
}

export { getCategories };
