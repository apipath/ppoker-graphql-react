import React from 'react';

// TODO: get them from github API
const members = [
  {
    login: 'camiloei',
    htmlUrl: 'https://github.com/camiloei',
    name: 'Camilo',
    location: 'Seattle, WA',
    blog: '',
  },
  {
    login: 'cagodoy',
    htmlUrl: 'https://github.com/cagodoy',
    name: 'Camilo Acuña Godoy',
    blog: '',
    location: 'Santiago de Chile',
  },
  {
    login: 'sebastianvera',
    htmlUrl: 'https://github.com/sebastianvera',
    name: 'Sebastian Vera',
    location: 'Berlin, Germany',
    blog: 'https://sebastianvera.github.io/web/',
  },
  {
    login: 'RafaelVidaurre',
    htmlUrl: 'https://github.com/RafaelVidaurre',
    name: 'Rafael Vidaurre',
    location: 'Chile',
    blog: 'https://vidaurre.io',
  },
  {
    login: 'vinaybedre',
    htmlUrl: 'https://github.com/vinaybedre',
    name: 'Vinay',
    location: null,
    blog: '',
  },
];

function Member({ name, login, location, htmlUrl }) {
  return (
    <li className="p-8 w-64 rounded border border-gray-400 flex flex-col items-center leading-normal shadow-md hover:shadow-lg">
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
    </li>
  );
}

function About() {
  return (
    <article>
      <section className="text-center">
        <h2 className="tracking-wide font-semibold text-gray-800 text-4xl">
          About us
        </h2>
        <p className="my-8">
          We are a group of passionate developers who met in time and decided to
          share what we have learned by building open source apps.
        </p>
      </section>

      <section className="mb-8 text-center">
        <h2 className="tracking-wide font-semibold text-gray-800 text-4xl">
          Meet the team
        </h2>
        <div className="mt-8">
          <ul className="flex justify-around">
            {members.map(({ name, login, location, blog }) => (
              <Member
                name={name}
                login={login}
                location={location}
                blog={blog || ''}
              />
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

export default About;
