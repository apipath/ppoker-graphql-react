import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

import HomeInputCard from './InputCard';
import { HeroIcon } from '../../components/Icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Home() {
  const history = useHistory();
  const [newRoomName, setNewRoomName] = useState('');
  const [joinRoomName, setJoinRoomName] = useState('');

  const goToCreateRoom = () => {
    if (newRoomName.length === 0) return;

    const currentSearch = qs.parse(history.location.search);
    history.push({
      pathname: '/room',
      search: qs.stringify({ ...currentSearch, newRoomName }),
    });
  };

  const goToRoom = () => {
    if (joinRoomName.length === 0) return;

    history.push(`/room/${encodeURIComponent(joinRoomName)}`);
  };

  const handleCreateRoomChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewRoomName(e.currentTarget.value);
  };

  const handleCreateRoomKeyPressed: KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key === 'Enter') {
      goToCreateRoom();
    }
  };

  const handleJoinRoomChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setJoinRoomName(e.currentTarget.value);
  };

  const handleJoinRoomKeyPressed: KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key === 'Enter') {
      goToRoom();
    }
  };

  return (
    <>
      <Header />
      <section className="flex flex-col items-center mb-10">
        <p className="w-full mt-8 font-sans text-4xl font-thin text-center text-gray-700 md:w-1/2">
          Ppoker help teams during their planning sessions
        </p>
        <p className="w-1/2 mt-8 font-sans text-2xl font-thin text-center text-gray-700">
          Create a room or join a room to get started
        </p>
      </section>
      <section className="flex justify-center py-8 bg-gray-300 md:py-12">
        <div className="max-w-4xl flex flex-col md:flex-row md:justify-around">
          <HomeInputCard
            title="Create a room"
            buttonLabel="Create"
            onSubmit={goToCreateRoom}
            onChange={handleCreateRoomChange}
            onKeyPress={handleCreateRoomKeyPressed}
            value={newRoomName}
          />
          <HomeInputCard
            id="join-room"
            autoComplete="on"
            autoCorrect="on"
            title="Join a room"
            buttonLabel="Join"
            value={joinRoomName}
            onChange={handleJoinRoomChange}
            onKeyPress={handleJoinRoomKeyPressed}
            onSubmit={goToRoom}
          />
        </div>
      </section>
      <section className="flex flex-col items-center mb-10">
        <div className="flex justify-center w-full max-w-3xl">
          <HeroIcon />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
