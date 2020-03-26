import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import HeaderLink from './Link';
import { LogoSmallIcon, LogoBigIcon, MenuIcon } from '../Icons';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((val) => !val);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="flex flex-wrap items-center justify-between">
      <div className="flex flex-wrap items-center justify-between w-full p-6 lg:w-auto">
        <div>
          <Link to="/" onClick={closeMenu}>
            <LogoSmallIcon className="w-16 lg:hidden" />
            <LogoBigIcon className="hidden w-32 lg:block" />
            Ppoker
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
          'w-full lg:inline-block flex-grow lg:w-2/4 lg:max-w-md',
        )}
      >
        <ul className="flex-grow border-t border-gray-300 lg:border-t-0 lg:flex lg:justify-between">
          <li className="block mt-4 ml-4 lg:mt-0">
            <HeaderLink to="/" exact onClick={closeMenu}>
              Home
            </HeaderLink>
          </li>
          <li className="block mt-4 ml-4 lg:mt-0">
            <HeaderLink to="/about" onClick={closeMenu}>
              About
            </HeaderLink>
          </li>
          <li className="block mt-4 ml-4 lg:mt-0">
            <HeaderLink to="/contact" onClick={closeMenu}>
              Contact
            </HeaderLink>
          </li>
          <li className="block mt-4 ml-4 lg:hidden">
            <button className="px-4 py-2 text-sm leading-none border border-gray-800 rounded focus:outline-none hover:text-white hover:bg-gray-800">
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
