import '../styles/PostRow.scss';

import { Points } from '../../points';
import { Post } from '../../../../models/Post';
import PostMeta from '../../post/components/PostMeta';
import React from 'react';

interface PostRowProps extends Post {
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
}

const PostRow: React.FC<PostRowProps> = (props) => (
  <div className="post-row">
    <Points
      onUpvoteClicked={() => props.onUpvoteClicked()}
      onDownvoteClicked={() => props.onDownvoteClicked()}
      points={props.points}
      isLoggedIn={props.isLoggedIn}
    />
    <PostMeta {...props} />
  </div>
);

export default PostRow;
