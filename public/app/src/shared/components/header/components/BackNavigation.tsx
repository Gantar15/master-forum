import '../styles/BackNavigation.scss';

import { Link } from 'react-router-dom';
import React from 'react';
import arrow from '../assets/arrow.svg';

interface BackNavigationProps {
  to: string;
  text: string;
}

const BackNavigation: React.FC<BackNavigationProps> = (props) => (
  <Link to={props.to} className="back-nav">
    <p>{props.text}</p>
  </Link>
);

export default BackNavigation;
