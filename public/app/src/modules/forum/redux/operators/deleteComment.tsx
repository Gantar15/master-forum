import * as actionCreators from '../actionCreators';

import { commentService } from '../../services';

function deleteComment(commentId: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.deleteComment());

    const result = await commentService.deleteComment(commentId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.deleteCommentFailure(error));
    } else {
      dispatch(actionCreators.deleteCommentSuccess(commentId));
    }
  };
}

export { deleteComment };
