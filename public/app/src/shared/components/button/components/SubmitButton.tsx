import '../styles/SubmitButton.scss';

import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  text: string;
  intent?: 'negative';
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => (
  <button className={`submit-button ${props.intent}`} onClick={props.onClick}>
    {props.text}
  </button>
);

export default SubmitButton;
