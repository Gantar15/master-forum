import * as actionCreators from '../actionCreators';

import { Post } from '../../models/Post';
import { postService } from '../../services';

function searchPosts(searchString: string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.searchPosts());

    const result = await postService.searchPosts(searchString);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.searchPostsFailure(error));
    } else {
      const posts: Post[] = result.value.getValue();
      dispatch(actionCreators.searchPostsSuccess(posts));
    }
  };
}

export { searchPosts };
