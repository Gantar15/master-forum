import '../styles/TextInput.scss';

import React from 'react';

interface TextInputProps {
  placeholder: string;
  onChange: (val: string) => void;
  type: string;
  value?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  onChange,
  type,
  value
}) => (
  <input
    value={value}
    placeholder={placeholder}
    className="text-input"
    type={type ? type : 'text'}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TextInput;
