import '../styles/Header.scss';

import { Link } from 'react-router-dom';
import { Logo } from '..';
import { Points } from '../../../../modules/forum/components/posts/points';
import React from 'react';
import { User } from '../../../../modules/users/models/user';

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
  user?: User;
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
        {props.user?.isManagerUser || props.user?.isAdminUser ? (
          <Link to="/manager">manager panel</Link>
        ) : null}
        <Link to="/submit">submit post</Link>
      </div>
      <br />
    </div>
  </div>
);

export default Header;
