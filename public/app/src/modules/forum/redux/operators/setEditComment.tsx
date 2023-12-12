import * as actionCreators from '../actionCreators';

import { Comment } from '../../models/Comment';

function setEditComment(comment: Comment) {
  return (dispatch: any) => {
    dispatch(actionCreators.setEditComment(comment));
  };
}

export { setEditComment };
