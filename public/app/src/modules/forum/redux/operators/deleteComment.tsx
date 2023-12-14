import * as actionCreators from '../actionCreators';

import { commentService } from '../../services';
import { getPostBySlug } from './getPostBySlug';

function deleteComment(commentId: string, postSlug?: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.deleteComment());

    const result = await commentService.deleteComment(commentId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.deleteCommentFailure(error));
    } else {
      dispatch(actionCreators.deleteCommentSuccess(commentId));
      postSlug && getPostBySlug(postSlug)(dispatch);
    }
  };
}

export { deleteComment };
