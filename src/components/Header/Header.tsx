import React, { useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import classnames from 'classnames';

import HeaderLink from './Link';
import { LogoSmallIcon, LogoBigIcon, MenuIcon } from '../Icons';
import Link3D from '../Link3D';
import FeedbackLink from '../FeedbackLink';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((val) => !val);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();
  const enableEditButton = matchPath(location.pathname, {
    path: '/room/:id',
    exact: true,
  });

  return (
    <nav className="grid grid-cols-1 lg:grid-cols-3">
      <div className="flex items-center justify-between p-6">
        <div>
          <Link to="/" onClick={closeMenu} aria-label="Ppoker">
            <LogoSmallIcon className="w-16 lg:hidden" />
            <LogoBigIcon className="hidden w-32 lg:block" />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            type="button"
            className="flex items-center px-3 py-2 text-gray-600 border border-gray-500 rounded hover:text-gray-800 hover:border-gray-900"
            onClick={toggleMenu}
          >
            <MenuIcon className="w-3 h-3 fill-current" />
          </button>
        </div>
      </div>
      <div
        className={classnames(
          isOpen ? 'block' : 'hidden',
          'lg:flex lg:items-center mb-4',
        )}
      >
        <ul className="w-full border-t border-gray-300 lg:border-t-0 lg:flex lg:justify-around">
          <li className="flex mt-4 ml-4 lg:mt-0">
            <HeaderLink to="/" exact onClick={closeMenu}>
              Home
            </HeaderLink>
          </li>
          <li className="flex mt-4 ml-4 lg:mt-0">
            <HeaderLink to="/about" onClick={closeMenu}>
              About
            </HeaderLink>
          </li>
          <li className="flex mt-4 ml-4 lg:mt-0 lg:hidden">
            <FeedbackLink />
          </li>
          <li className="flex mt-4 ml-4 lg:hidden">
            <Link3D onClick={closeMenu} to="/room" color="indigo">
              New Room
            </Link3D>
            {enableEditButton && (
              <Link3D
                onClick={closeMenu}
                className="ml-4"
                to={location.pathname + '/edit'}
              >
                Edit
              </Link3D>
            )}
          </li>
        </ul>
      </div>
      <div className="hidden mx-4 lg:flex lg:items-center lg:justify-end">
        <div className="inline px-4">
          <FeedbackLink />
        </div>
        <Link3D to="/room" color="indigo">
          New Room
        </Link3D>
        {enableEditButton && (
          <Link3D className="ml-4" to={location.pathname + '/edit'}>
            Edit
          </Link3D>
        )}
      </div>
    </nav>
  );
}

export default Header;
