import React from 'react';

import HeroIcon from '../../components/HeroIcon';
import HomeInputCard from './InputCard';

function Home() {
  return (
    <>
      <section className="mb-10 flex flex-col items-center">
        <div className="flex justify-center w-full max-w-3xl">
          <HeroIcon />
        </div>
        <p className="mt-8 w-1/2 font-sans text-center text-gray-700 font-thin">
          ppoker help teams during their planning sessions
        </p>
      </section>
      <section className="py-8 md:py-12 flex justify-center bg-gray-300">
        <div className="max-w-4xl flex flex-col md:flex-row md:justify-around">
          <HomeInputCard
            title="Create a room"
            buttonLabel="Create"
            onClick={() => console.log('create room')}
          />
          <HomeInputCard
            title="Join a room"
            buttonLabel="Join"
            onClick={() => console.log('join room')}
          />
        </div>
      </section>
    </>
  );
}

export default Home;
