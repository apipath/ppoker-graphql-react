import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import HeaderLink from './Link';

import logoSmall from '../../img/logo_small.svg';
import logoBig from '../../img/logo_big.svg';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(val => !val);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="flex items-center justify-between flex-wrap">
      <div className="p-6 w-full lg:w-auto flex items-center justify-between flex-wrap">
        <div>
          <Link to="/" onClick={closeMenu}>
            <img className="lg:hidden w-16" src={logoSmall} />
            <img className="hidden w-32 lg:block" src={logoBig} />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            type="button"
            className="flex items-center px-3 py-2 border rounded text-gray-600 border-gray-500 hover:text-gray-800 hover:border-gray-900"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={classnames(
          isOpen ? 'block' : 'hidden',
          'w-full lg:inline-block flex-grow lg:w-2/4 lg:max-w-md',
        )}
      >
        <ul className="border-t border-gray-300 lg:border-t-0 flex-grow lg:flex lg:justify-between">
          <li className="block ml-4 mt-4 lg:mt-0">
            <HeaderLink to="/" exact onClick={closeMenu}>
              Home
            </HeaderLink>
          </li>
          <li className="block ml-4 mt-4 lg:mt-0">
            <HeaderLink to="/about" onClick={closeMenu}>
              About
            </HeaderLink>
          </li>
          <li className="block ml-4 mt-4 lg:mt-0">
            <HeaderLink to="/contact" onClick={closeMenu}>
              Contact
            </HeaderLink>
          </li>
          <li className="block ml-4 mt-4 lg:hidden">
            <button className="px-4 py-2 leading-none text-sm rounded border border-gray-800 focus:outline-none hover:text-white hover:bg-gray-800">
              New Room
            </button>
          </li>
        </ul>
      </div>
      <button className="hidden lg:inline mx-4 px-4 py-2 rounded-full border border-gray-800 hover:shadow focus:outline-none text-md hover:text-white hover:bg-gray-800 font-medium">
        New Room
      </button>
    </nav>
  );
}

export default Header;
