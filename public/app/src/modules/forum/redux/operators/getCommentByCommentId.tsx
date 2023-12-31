import * as actionCreators from '../actionCreators';

import { Comment } from '../../models/Comment';
import { commentService } from '../../services';

function getCommentByCommentId(commentId: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.gettingCommentByCommentId());

    const result = await commentService.getCommentByCommentId(commentId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.gettingCommentByCommentIdFailure(error));
    } else {
      const comment: Comment = result.value.getValue();
      dispatch(actionCreators.gettingCommentByCommentIdSuccess(comment));
    }
  };
}

export { getCommentByCommentId };
