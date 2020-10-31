import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cn from 'classnames';

type Color = 'purple' | 'blue' | 'indigo';

const COLORS: Record<Color, string> = {
  purple:
    'bg-purple-500 border-purple-700 hover:bg-purple-400 hover:border-purple-500',
  blue: 'bg-blue-500 border-blue-700 hover:bg-blue-400 hover:border-blue-500',
  indigo:
    'bg-indigo-500 border-indigo-700 hover:bg-indigo-400 hover:border-indigo-500',
};

const Link3D: React.FC<LinkProps & { color?: Color }> = ({
  color = 'purple',
  className,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className={cn(
        'px-4 py-2 font-bold text-white border-b-4 rounded',
        COLORS[color],
        className,
      )}
    />
  );
};

export default Link3D;
