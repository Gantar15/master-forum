import '../styles/Header.scss';

import { Link } from 'react-router-dom';
import { Logo } from '..';
import { Points } from '../../../../modules/forum/components/posts/points';
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  isUpvotable?: boolean;
  onUpvoteClicked?: Function;
  onDownvoteClicked?: Function;
  points?: number;
  isLoggedIn?: boolean;
  isDownvoted?: boolean;
  isUpvoted?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => (
  <div className="header">
    <Logo />
    {props.isUpvotable && (
      <Points
        isDownvoted={props.isDownvoted}
        isUpvoted={props.isUpvoted}
        onUpvoteClicked={() =>
          props.onUpvoteClicked ? props.onUpvoteClicked() : ''
        }
        onDownvoteClicked={() =>
          props.onDownvoteClicked ? props.onDownvoteClicked() : ''
        }
        points={props.points as number}
        isLoggedIn={props.isLoggedIn || false}
      />
    )}
    <div className="content-container">
      <h1>{props.title}</h1>
      <p>
        <b>{props.subtitle}</b>
      </p>
      <div className="header-links">
        <Link to="/submit">submit</Link>
      </div>
      <br />
    </div>
  </div>
);

export default Header;
