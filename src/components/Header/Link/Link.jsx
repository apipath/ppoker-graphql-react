import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderLink(props) {
  return (
    <NavLink
      {...props}
      className="py-1 text-gray-700 font-medium hover:text-gray-800"
      activeClassName="text-blue-700 hover:text-blue-700 font-bold border-blue-700 border-b-2"
    >
      {props.children}
    </NavLink>
  );
}

export default HeaderLink;
