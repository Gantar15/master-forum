import './VoteRow.scss';

import { Post } from '../../../models/Post';
import PostMeta from '../../posts/post/components/PostMeta';
import React from 'react';
import downvoteArrowSvg from '../../../../../assets/img/arrow-downvote.svg';
import upvoteArrowSvg from '../../../../../assets/img/arrow-upvote.svg';

interface VoteRowProps extends Post {
  isUpvoted: boolean;
  isDownvoted: boolean;
}

export const VoteRow: React.FC<VoteRowProps> = ({
  isUpvoted,
  isDownvoted,
  ...props
}) => {
  return (
    <div className="vote-row">
      <div className="vote-row__content">
        <PostMeta {...props} category={undefined} tags={undefined} />
      </div>
      <div className="vote-row__vote">
        {isUpvoted ? (
          <>
            <img className="vote vote_up" src={upvoteArrowSvg} alt="upvote" />
            <p>voted in favour</p>
          </>
        ) : (
          <>
            <img
              className="vote vote_down"
              src={downvoteArrowSvg}
              alt="downvote"
            />
            <p>voted against</p>
          </>
        )}
      </div>
    </div>
  );
};
