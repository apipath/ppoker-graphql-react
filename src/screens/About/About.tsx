import React from 'react';
import cn from 'classnames';

import members from './members';
import AboutMember from './Member';
import Header from '../../components/Header';

const About: React.FC = () => {
  return (
    <>
      <Header />
      <article className="">
        <section className="flex flex-col items-center justify-center py-8">
          <h2 className="text-4xl font-semibold text-gray-800">About us</h2>
          <p className="max-w-lg px-4 text-xl text-center">
            We are a group of passionate developers who met over time and
            decided to share what we have learned by building apps.
          </p>
        </section>

        <section className="flex justify-center">
          <ul
            className={cn(
              'flex flex-wrap items-center justify-around',
              'max-w-3xl gap-12',
            )}
          >
            {members.map((props, index) => (
              <li
                key={props.name}
                className={cn(
                  'transform transition-transform ease-out duration-300',
                  'hover:rotate-0 hover:scale-110',
                  {
                    'rotate-3': index === 0,
                    '-rotate-6': index === 1,
                    '-rotate-3': index === 2,
                    'rotate-6': index === 3,
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
