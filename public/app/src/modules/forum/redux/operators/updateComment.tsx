import * as actionCreators from '../actionCreators';

import { commentService } from '../../services';

function updateComment(commentId: string, text: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.updateComment());

    const result = await commentService.updateComment(text, commentId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.updateCommentFailure(error));
    } else {
      const comment = result.value.getValue();
      dispatch(actionCreators.updateCommentSuccess(comment));
    }
  };
}

export { updateComment };
