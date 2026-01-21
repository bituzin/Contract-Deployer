import React from 'react';
import { getButtonStyles } from '../../config/styles';

export const BackButton = ({ theme, to, children, style = {} }) => {
  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <button
      style={{
        marginLeft: 18,
        ...getButtonStyles(theme, 'back'),
        ...style,
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
