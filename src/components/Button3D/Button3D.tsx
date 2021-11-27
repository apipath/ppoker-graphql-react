import React from 'react';
import UseAnimations from 'react-useanimations';
import infinity from 'react-useanimations/lib/infinity';
import cn from 'classnames';

type Color = 'blue' | 'purple' | 'pink' | 'red';

const COLORS: Record<Color, string> = {
  purple:
    'bg-purple-500 border-purple-700 hover:bg-purple-400 hover:border-purple-500',
  blue: 'bg-blue-500 border-blue-700 hover:bg-blue-400 hover:border-blue-500',
  pink: 'bg-pink-500 border-pink-700 hover:bg-pink-400 hover:border-pink-500',
  red: 'bg-red-500 border-red-700 hover:bg-red-400 hover:border-red-500',
};

export const getClassName = ({
  color,
  disabled,
}: {
  color: Color;
  disabled?: Boolean;
}) => {
  return cn('px-4 py-2 font-bold text-white border-b-4 rounded', {
    [COLORS[color]]: !disabled,
    'bg-gray-100 text-gray-400 opacity-60 cursor-not-allowed': disabled,
    'text-white': !disabled,
  });
};

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['button']> & {
  loading?: boolean;
  color?: Color;
};

const Button3D: React.FC<Props> = ({ loading, color = 'blue', ...props }) => {
  const disabled = loading || props.disabled;
  return (
    <button
      {...props}
      disabled={disabled}
      className={getClassName({ color, disabled })}
    >
      {loading ? <UseAnimations animation={infinity} /> : props.children}
    </button>
  );
};

export default Button3D;
