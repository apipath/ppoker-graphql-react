import React from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

type Color = 'bgOne' | 'bgTwo' | string;

type Props = {
  children: React.ReactElement;
  color?: Color;
};

const getColor = (color: Color) => {
  if (Object.keys(styles).includes(color)) return styles[color];
  return color;
};

const DiagonalBox: React.FC<Props> = ({ color = 'bgOne', children }) => {
  return (
    <div className={styles.diagonalBox}>
      <div className={cn(styles.diagonalBoxBackground, getColor(color))} />
      <div className={cn(styles.content, 'relative mx-auto')}>{children}</div>
    </div>
  );
};

export default DiagonalBox;
