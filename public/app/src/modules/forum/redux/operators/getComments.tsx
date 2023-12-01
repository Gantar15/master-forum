import * as actionCreators from '../actionCreators';

import { CommentUtil } from '../../utils/CommentUtil';
import { commentService } from '../../services';

function getComments(slug: string, offset?: number) {
  return async (dispatch: any) => {
    dispatch(actionCreators.gettingComments());

    const result = await commentService.getCommentsBySlug(slug, offset);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.gettingCommentsFailure(error));
    } else {
      const comments = result.value.getValue();

      const sortedComments = CommentUtil.getSortedComments(comments);

      dispatch(actionCreators.gettingCommentsSuccess(sortedComments));
    }
  };
}

export { getComments };
