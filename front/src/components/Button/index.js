import React from 'react';
import './button.scss';

function Button({ children, ...props }) {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
}

export default Button;
