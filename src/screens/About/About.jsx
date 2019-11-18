import React from 'react';
import members from './members';
import AboutMember from './Member';

function About() {
  return (
    <article>
      <section className="text-center">
        <h2 className="tracking-wide font-semibold text-gray-800 text-4xl">
          About us
        </h2>
        <p className="my-8 text-xl">
          We are a group of passionate developers who met in time and decided to
          share what we have learned by building open source apps.
        </p>
      </section>

      <section className="mt-12 text-center">
        <h2 className="tracking-wide font-semibold text-gray-800 text-4xl">
          Meet the team
        </h2>
        <div className="mt-4 flex justify-center">
          <ul className="flex justify-center flex-wrap">
            {members.map(({ name, login, location, blog, htmlUrl }) => (
              <li className="flex sm:my-4 justify-center w-full sm:flex sm:justify-center sm:w-1/2 md:w-5/12 lg:w-1/3">
                <AboutMember
                  name={name}
                  login={login}
                  location={location}
                  blog={blog}
                  htmlUrl={htmlUrl}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

export default About;
