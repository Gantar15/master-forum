import * as actionCreators from '../actionCreators';

import { postService } from '../../services';

function deletePost(postSlug: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.deletePost());

    const result = await postService.deletePost(postSlug);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.deletePostFailure(error));
    } else {
      const post = result.value.getValue();
      dispatch(actionCreators.deletePostSuccess(post));
    }
  };
}

export { deletePost };
