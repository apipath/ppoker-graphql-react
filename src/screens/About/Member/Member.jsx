import React from 'react';

function AboutMember({ name, login, location, htmlUrl }) {
  return (
    <div className="p-5 flex flex-col justify-center items-center leading-normal sm:w-64 sm:rounded sm:border sm:border-gray-400 sm:shadow-md hover:shadow-lgflex">
      <img
        className="w-40 rounded-full"
        src={`https://github.com/${login}.png`}
        alt={`${name} Avatar`}
      />
      <h3 className="my-2 text-lg font-semibold leading-none">{name}</h3>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={htmlUrl}
        className="text-blue-600 hover:text-blue-500"
      >
        @{login}
      </a>
      <address className="text-sm text-gray-600">{location}</address>
    </div>
  );
}

export default AboutMember;
