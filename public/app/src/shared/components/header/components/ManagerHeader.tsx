import '../styles/Header.scss';

import { Link } from 'react-router-dom';
import { Logo } from '..';
import React from 'react';
import { User } from '../../../../modules/users/models/user';

interface HeaderProps {
  title: string;
  subtitle?: string;
  user: User;
}

const ManagerHeader: React.FC<HeaderProps> = (props) => (
  <div className="header">
    <Logo />
    <div className="content-container">
      <h1>{props.title}</h1>
      <p>
        <b>{props.subtitle}</b>
      </p>
      <div className="header-links">
        {props.user.isAdminUser && <Link to="/manager/users">users</Link>}
        <Link to="/manager/categories">categories</Link>
      </div>
      <br />
    </div>
  </div>
);

export default ManagerHeader;
