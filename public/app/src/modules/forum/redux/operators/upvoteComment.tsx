import * as actionCreators from '../actionCreators';

import { commentService } from '../../services';
import { getComments } from './getComments';

function upvoteComment(commentId: string, slug: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.upvotingComment());

    const result = await commentService.upvoteComment(commentId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.upvotingCommentFailure(error));
    } else {
      dispatch(actionCreators.upvotingCommentSuccess(commentId));
      await getComments(slug)(dispatch);
    }
  };
}

export { upvoteComment };
