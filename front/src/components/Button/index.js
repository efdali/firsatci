import React from 'react';
import './button.scss';

function Button({ href = '', children, ...props }) {
  if (href) {
    return React.createElement('a', { href, target: '_blank', className: 'btn', ...props }, children);
  }
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
}

export default Button;
