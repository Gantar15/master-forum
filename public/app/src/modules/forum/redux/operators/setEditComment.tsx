import * as actionCreators from '../actionCreators';

import { Comment } from '../../models/Comment';

function setEditComment(comment: Comment | undefined) {
  return (dispatch: any) => {
    dispatch(actionCreators.setEditComment(comment));
  };
}

export { setEditComment };
