import { Comment } from '../../../../models/Comment';
import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

interface PostCommentAuthorAndTextProps extends Comment {}

const PostCommentAuthorAndText: React.FC<PostCommentAuthorAndTextProps> = (
  props
) => (
  <div>
    <div className="comment-meta">
      <Link to={`/member/${props.member.username}`}>
        <span>{props.member.username}</span>
      </Link>
      <span className="comment-meta__time"> | </span>
      <a className="comment-meta__time" href={`/comment/${props.commentId}`}>
        {moment(props.createdAt).fromNow()}
      </a>
    </div>
    <p className="comment-text">
      <b dangerouslySetInnerHTML={{ __html: props.text }} />
    </p>
  </div>
);

export default PostCommentAuthorAndText;
