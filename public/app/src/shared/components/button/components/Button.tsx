import '../styles/Button.scss';

import React from 'react';

interface ButtonProps {
  text: any;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = (props) => (
  <div className="button" onClick={() => props.onClick?.()} style={props.style}>
    {props.text}
  </div>
);

export default Button;
