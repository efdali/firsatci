import React from 'react';
import './button.scss';

function Button({ href = '', className = '', children, ...props }) {
  if (href) {
    return React.createElement('a', { href, target: '_blank', className: 'btn ' + className, ...props }, children);
  }
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
