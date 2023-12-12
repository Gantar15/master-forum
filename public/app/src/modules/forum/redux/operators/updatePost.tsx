import * as actionCreators from '../actionCreators';

import { PostType } from '../../models/Post';
import { postService } from '../../services';

function updatePost(
  slug: string,
  title: string,
  type: PostType,
  category: string,
  text?: string,
  link?: string,
  tags?: string[]
) {
  return async (dispatch: any) => {
    dispatch(actionCreators.updatePost());

    const result = await postService.updatePost(
      slug,
      title,
      type,
      category,
      text,
      link,
      tags
    );

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.updatePostFailure(error));
    } else {
      const post = result.value.getValue();
      dispatch(actionCreators.updatePostSuccess(post));
    }
  };
}

export { updatePost };
