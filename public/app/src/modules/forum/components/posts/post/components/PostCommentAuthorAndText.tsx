import { Comment } from '../../../../models/Comment';
import { CommentUtil } from '../../../../utils/CommentUtil';
import Editor from '../../../comments/components/Editor';
import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

interface PostCommentAuthorAndTextProps extends Comment {
  isEditable?: boolean;
  handleChange?: (v: string) => void;
  updateCommentText?: string;
}

const PostCommentAuthorAndText: React.FC<PostCommentAuthorAndTextProps> = ({
  handleChange = () => {},
  isEditable = false,
  updateCommentText = '',
  ...props
}) => (
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
      {!isEditable && <p dangerouslySetInnerHTML={{ __html: props.text }} />}
      {isEditable && (
        <Editor
          text={updateCommentText}
          maxLength={CommentUtil.maxCommentLength}
          placeholder="Edit your comment"
          handleChange={handleChange}
        />
      )}
    </p>
  </div>
);

export default PostCommentAuthorAndText;
