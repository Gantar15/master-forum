import '../styles/PostComment.scss';

import { Comment } from '../../../../models/Comment';
import EntityActions from '../../../../../../shared/components/entity-actions/components/EntityActions';
import { Link } from 'react-router-dom';
import { Points } from '../../points';
import PostCommentAuthorAndText from './PostCommentAuthorAndText';
import React from 'react';
import { User } from '../../../../../users/models/user';

interface PostCommentProps extends Comment {
  isDownvoted: boolean;
  isUpvoted: boolean;
  onUpvoteClicked: (commentId: string, postSlug: string) => void;
  onDownvoteClicked: (commentId: string, postSlug: string) => void;
  onAction?: (action: string, comment: Comment) => void;
  loggedInUser?: User;
}

const PostComment: React.FC<PostCommentProps> = ({
  onAction = () => {},
  loggedInUser,
  ...props
}) => {
  return (
    <div className="comment">
      <Points
        isDownvoted={props.isDownvoted}
        isUpvoted={props.isUpvoted}
        points={props.points}
        onUpvoteClicked={() =>
          props.onUpvoteClicked(props.commentId, props.postSlug)
        }
        onDownvoteClicked={() =>
          props.onDownvoteClicked(props.commentId, props.postSlug)
        }
        isLoggedIn={!!loggedInUser}
      />
      <div className="post-comment-container">
        <div className="post-comment">
          <PostCommentAuthorAndText {...props} />
          <div className="comment__actions">
            <Link to={`/comment/${props.commentId}`}>reply</Link>
            {loggedInUser?.username &&
            (loggedInUser.username === props.member.username ||
              loggedInUser.isAdminUser ||
              loggedInUser.isManagerUser) ? (
              <EntityActions
                width={24}
                height={24}
                actions={['delete', 'edit']}
                onAction={(action) => onAction(action, props)}
              />
            ) : null}
          </div>
        </div>
        <div className="indent">
          {props.childComments.length !== 0 &&
            props.childComments.map((c) => (
              <PostComment
                {...c}
                isUpvoted={c.wasUpvotedByMe}
                isDownvoted={c.wasDownvotedByMe}
                key={c.commentId}
                onDownvoteClicked={props.onDownvoteClicked}
                onUpvoteClicked={props.onUpvoteClicked}
                loggedInUser={loggedInUser}
                onAction={onAction}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
