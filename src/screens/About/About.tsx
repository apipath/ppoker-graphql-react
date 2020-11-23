import React from 'react';
import cn from 'classnames';

import members from './members';
import AboutMember from './Member';
import Header from '../../components/Header';

const About: React.FC = () => {
  return (
    <>
      <Header />
      <article className="mb-12">
        <section className="flex flex-col items-center justify-center py-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Meet the team
          </h2>
          <p className="max-w-lg p-4 text-xl text-center text-gray-700">
            We are a group of passionate developers who met over time and
            decided to share what we have learned by building apps.
          </p>
        </section>

        <section className="flex justify-center">
          <ul
            className={cn(
              'flex flex-wrap items-center justify-around',
              'max-w-3xl',
            )}
          >
            {members.map((props, index) => (
              <li
                key={props.name}
                className={cn(
                  'transition-all',
                  'transform motion-reduce:transform-none ease-out duration-300',
                  'hover:rotate-0 hover:scale-110',
                  {
                    'rotate-3 mx-8': index === 0,
                    '-rotate-3 mt-8 sm:mt-2 sm:ml-8': index === 1,
                    'rotate-3 mt-8 sm:-rotate-3 sm:mt-8': index === 2,
                    '-rotate-3 mt-8 sm:rotate-6 sm:mt-12': index === 3,
                  },
                )}
              >
                <AboutMember {...props} />
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
};

export default About;
