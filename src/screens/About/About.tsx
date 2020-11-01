import React from 'react';

import members from './members';
import AboutMember from './Member';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const About: React.FC = () => {
  return (
    <>
      <Header />
      <article>
        <section className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-semibold tracking-wide text-gray-800">
            About us
          </h2>
          <p className="max-w-4xl m-8 text-xl">
            We are a group of passionate developers who met over time and
            decided to share what we have learned by building open source apps.
          </p>
        </section>

        <section className="mt-4 text-center">
          <h2 className="text-4xl font-semibold tracking-wide text-gray-800">
            Meet the team
          </h2>
          <div className="flex justify-center mt-4">
            <ul className="flex flex-wrap justify-center">
              {members.map(({ name, login, location, htmlUrl }) => (
                <li
                  key={name}
                  className="flex justify-center w-full sm:my-4 sm:flex sm:justify-center sm:w-1/2 md:w-5/12 lg:w-1/3"
                >
                  <AboutMember
                    name={name}
                    login={login}
                    location={location}
                    htmlUrl={htmlUrl}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default About;
