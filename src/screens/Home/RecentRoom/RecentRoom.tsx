import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

type Props = {
  name: string;
  id: string;
};

const getTooltipId = (id: string) => `RecentRoom:${id}`;

const RecentRoom: React.FC<Props> = ({ name, id }) => (
  <>
    <Link
      to={`/room/${encodeURIComponent(id)}`}
      data-tip
      data-for={getTooltipId(id)}
      className={cn(
        'flex items-center justify-center p-4 cursor-pointer',
        'rounded-md bg-white shadow-xs max-w-4xl',
        'group transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md',
        'motion-reduce:transition-none motion-reduce:transform-none',
      )}
    >
      <h3 className="mr-2">{name}</h3>
      <svg
        className="w-6 text-gray-800 transition duration-300 ease-in-out transform group-hover:text-green-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </Link>
    <ReactTooltip id={getTooltipId(id)} effect="solid" place="bottom">
      Click to join the room
    </ReactTooltip>
  </>
);

export default RecentRoom;
