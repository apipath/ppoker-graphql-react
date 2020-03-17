import React from 'react';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['button']>;

const Button: React.FC<Props> = props => (
  <button
    {...props}
    className="flex rounded-lg items-center shadow-md justify-center px-4 py-2 text-sm leading-5 font-medium text-gray-900 bg-white hover:text-gray-600 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
  >
    {props.children}
  </button>
);

export default Button;
