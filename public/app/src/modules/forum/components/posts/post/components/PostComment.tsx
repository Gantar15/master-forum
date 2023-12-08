import '../styles/PostComment.scss';

import { Comment } from '../../../../models/Comment';
import { Link } from 'react-router-dom';
import { Points } from '../../points';
import PostCommentAuthorAndText from './PostCommentAuthorAndText';
import React from 'react';

interface PostCommentProps extends Comment {
  isDownvoted: boolean;
  isUpvoted: boolean;
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
}

const PostComment: React.FC<PostCommentProps> = (props) => (
  <div className="comment">
    <Points
      isDownvoted={props.isDownvoted}
      isUpvoted={props.isUpvoted}
      points={props.points}
      onUpvoteClicked={() => props.onUpvoteClicked()}
      onDownvoteClicked={() => props.onDownvoteClicked()}
      isLoggedIn={props.isLoggedIn}
    />
    <div className="post-comment-container">
      <div className="post-comment">
        <PostCommentAuthorAndText {...props} />
        <Link to={`/comment/${props.commentId}`}>reply</Link>
      </div>
      <div className="indent">
        {props.childComments.length !== 0 &&
          props.childComments.map((c, i) => (
            <PostComment
              {...c}
              isUpvoted={c.wasUpvotedByMe}
              isDownvoted={c.wasDownvotedByMe}
              key={i}
              onDownvoteClicked={props.onDownvoteClicked}
              onUpvoteClicked={props.onUpvoteClicked}
              isLoggedIn={props.isLoggedIn}
            />
          ))}
      </div>
    </div>
  </div>
);

export default PostComment;
