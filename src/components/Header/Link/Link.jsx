import React from 'react';
import { NavLink } from 'react-router-dom';

function HomeLink({ children, to, exact = false }) {
  return (
    <NavLink
      className="py-1 text-gray-700 font-medium hover:text-gray-800"
      activeClassName="text-blue-700 hover:text-blue-700 font-bold border-blue-700 border-b-2"
      to={to}
      exact={exact}
    >
      {children}
    </NavLink>
  );
}

export default HomeLink;
