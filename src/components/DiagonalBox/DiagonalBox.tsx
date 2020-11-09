import React from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

type Color = 'bgOne' | 'bgTwo' | 'bgThree';

type Props = {
  children: React.ReactElement;
  color?: Color;
};

const DiagonalBox: React.FC<Props> = ({ color = 'bgOne', children }) => {
  return (
    <div className={cn(styles.diagonalBox, styles[color])}>
      <div className={cn(styles.content, 'relative mx-auto')}>{children}</div>
    </div>
  );
};

export default DiagonalBox;
