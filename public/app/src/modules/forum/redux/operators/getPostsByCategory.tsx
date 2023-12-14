import * as actionCreators from '../actionCreators';

import { Post } from '../../models/Post';
import { postService } from '../../services';

function getPostsByCategory(category: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.getPostsByCategory());

    const result = await postService.getPostsByCategory(category);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getPostsByCategoryFailure(error));
    } else {
      const posts: Post[] = result.value.getValue();
      dispatch(actionCreators.getPostsByCategorySuccess(posts));
    }
  };
}

export { getPostsByCategory };
