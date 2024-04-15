import React from 'react';

interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  width?: number;
}
export const IconButton = ({ icon, onClick, width }: IconButtonProps) => {
  return (
    <img
      src={icon}
      style={{ width: width + 'px', cursor: 'pointer' }}
      onClick={onClick}
    />
  );
};
