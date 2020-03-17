import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

import HeroIcon from '../../components/HeroIcon';
import HomeInputCard from './InputCard';
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

  const handleCreateRoomChange: ChangeEventHandler<HTMLInputElement> = e => {
    setNewRoomName(e.currentTarget.value);
  };

  const handleCreateRoomKeyPressed: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      goToCreateRoom();
    }
  };

  const handleJoinRoomChange: ChangeEventHandler<HTMLInputElement> = e => {
    setJoinRoomName(e.currentTarget.value);
  };

  const handleJoinRoomKeyPressed: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      goToRoom();
    }
  };

  return (
    <>
      <Header />
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
            onClick={goToCreateRoom}
            onChange={handleCreateRoomChange}
            onKeyPress={handleCreateRoomKeyPressed}
            value={newRoomName}
          />
          <HomeInputCard
            title="Join a room"
            buttonLabel="Join"
            value={joinRoomName}
            onChange={handleJoinRoomChange}
            onKeyPress={handleJoinRoomKeyPressed}
            onClick={goToRoom}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
