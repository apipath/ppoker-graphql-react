import React from 'react';
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';
import cn from 'classnames';

type Props = {
  name: string;
  login: string;
  location?: string | null;
  htmlUrl: string;
  occupation: string;
  company: string;
};

const AboutMember: React.FC<Props> = ({
  name,
  login,
  location,
  htmlUrl,
  occupation,
  company,
}) => {
  return (
    <div
      className={cn(
        'w-64 leading-normal border rounded-xl shadow-sm group',
        'divide-y divide-gray-300 ',
        'flex flex-col items-center justify-center',
        'hover:shadow-lg',
      )}
    >
      <div className="flex flex-col items-center my-4 text-center group">
        <img
          loading="eager"
          className={cn(
            'w-32 h-32 p-1 border-4 rounded-full',
            'border-green-300 sm:border-gray-300 transition-colors duration-300 ease-out group-hover:border-green-300',
          )}
          src={`https://github.com/${login}.png`}
          alt={`${name} Avatar`}
        />
        <h3 className="mt-2 text-lg font-semibold leading-none">{name}</h3>
        <p className="text-sm text-gray-600">
          {occupation}
          <span className="font-bold text-purple-500"> @ </span>
          {company}
        </p>
        <address className="text-sm text-gray-600">{location}</address>
      </div>
      <div className="flex justify-center w-full py-2">
        <a target="_blank" rel="noopener noreferrer" href={htmlUrl}>
          <UseAnimations animation={github} size={32} />
        </a>
      </div>
    </div>
  );
};

export default AboutMember;
