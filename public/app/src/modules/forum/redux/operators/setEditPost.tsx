import * as actionCreators from '../actionCreators';

import { Post } from '../../models/Post';

function setEditPost(post: Post | undefined) {
  return (dispatch: any) => {
    dispatch(actionCreators.setEditPost(post));
  };
}

export { setEditPost };
