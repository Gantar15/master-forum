import '../styles/Point.scss';

import PointHover from './PointHover';
import React from 'react';
import activeArrowSvg from '../assets/arrow-active.svg';
import arrowSvg from '../assets/arrow.svg';

interface PostPointsProps {
  isDownvoted?: boolean;
  isUpvoted?: boolean;
  points: number;
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
}

const Points: React.FC<PostPointsProps> = (props) => {
  const [isHover, setHover] = React.useState(false);

  return (
    <div className="post-points">
      <div
        onClick={() => props.onUpvoteClicked()}
        className="points-img-container upvote"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!props.isLoggedIn && <PointHover isHover={isHover} />}
        {props.isUpvoted ? (
          <img src={activeArrowSvg} />
        ) : (
          <img src={arrowSvg} />
        )}
      </div>
      <div>{props.points}</div>
      <div
        onClick={() => props.onDownvoteClicked()}
        className="points-img-container downvote"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.isDownvoted ? (
          <img src={activeArrowSvg} />
        ) : (
          <img src={arrowSvg} />
        )}
      </div>
    </div>
  );
};

export default Points;
