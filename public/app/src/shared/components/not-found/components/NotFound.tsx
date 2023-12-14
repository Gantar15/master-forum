import '../styles/NotFound.scss';

import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = ({ backURL = '/' }: { backURL?: string }) => {
  return (
    <div className="not-found">
      <h1>OwOw 404</h1>
      <h2>Page not found. 🤔</h2>
      <Link to={backURL}>Go back</Link>
    </div>
  );
};

export default NotFound;
