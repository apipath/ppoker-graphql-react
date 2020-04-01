import React from 'react';
import cn from 'classnames';

import { Point } from '../../../../generated/graphql';

type Props = {
  point: Point;
  selected?: boolean;
};

const PointCard: React.FC<Props> = ({ point, selected }) => {
  return (
    <div
      className={cn(
        'flex flex-col w-40 h-40 p-2 bg-white rounded shadow-md cursor-pointer hover:shadow-lg p4',
        {
          [`border-2 border-orange-300`]: selected,
        },
      )}
    >
      <header className="flex items-center justify-center flex-grow">
        <h3 className="text-4xl truncate" title={point.label}>
          {point.label}
        </h3>
      </header>
      {point.description && (
        <div className="text-xs">
          <span className="px-2 py-1 bg-blue-100 rounded-full">
            {point.description}
          </span>
        </div>
      )}
    </div>
  );
};

export default PointCard;
