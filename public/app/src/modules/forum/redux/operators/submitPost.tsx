import * as actionCreators from '../actionCreators';

import { PostType } from '../../models/Post';
import { postService } from '../../services';

function submitPost(
  title: string,
  type: PostType,
  category: string,
  text?: string,
  link?: string,
  tags?: string[]
) {
  return async (dispatch: any) => {
    dispatch(actionCreators.submittingPost());

    const result = await postService.createPost(
      title,
      type,
      category,
      text,
      link,
      tags
    );

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.submittingPostFailure(error));
    } else {
      dispatch(actionCreators.submittingPostSuccess());
    }
  };
}

export { submitPost };
