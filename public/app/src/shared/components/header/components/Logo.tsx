import '../styles/Logo.scss';

import React from 'react';
import logo from '../../../../assets/img/logo/main-logo.png';

const Logo = ({ href = logo }: { href?: string }) => (
  <div className="logo-container">
    <a href="/">
      <img src={href} />
    </a>
  </div>
);

export default Logo;
