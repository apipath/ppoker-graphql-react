import React from 'react';
import cn from 'classnames';

function HomeLink({ children, to, active = false }) {
  return (
    <a
      className={cn('py-1 text-gray-700 font-medium', {
        'text-blue-700 font-bold border-blue-700 border-b-2': active,
        'hover:text-gray-800': !active,
      })}
      href={to}
    >
      {children}
    </a>
  );
}

export default HomeLink;
