import '../styles/Logo.scss';

import React from 'react';
import logo from '../../../../assets/img/logo/brick.png';

const Logo = () => (
  <div className="logo-container">
    <a href="/">
      <img src={logo} />
    </a>
  </div>
);

export default Logo;
