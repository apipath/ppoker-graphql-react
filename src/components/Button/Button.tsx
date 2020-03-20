import React from 'react';
import UseAnimations from 'react-useanimations';
import cn from 'classnames';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['button']> & {
  loading?: boolean;
};

const Button: React.FC<Props> = props => {
  const disabled = props.loading || props.disabled;
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        'flex rounded items-center shadow-md justify-center px-4 py-2 text-sm leading-5 font-medium bg-white focus:outline-none focus:shadow-outline transition ease-in-out duration-150',
        {
          [`bg-gray-100 text-gray-600 cursor-not-allowed`]: disabled,
          [`hover:text-gray-600 text-gray-900`]: !disabled,
        },
      )}
    >
      {props.loading ? (
        <UseAnimations animationKey="infinity" />
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
