import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { useToasts } from 'react-toast-notifications';

import HomeInputCard from './InputCard';
import HomeRecentRoom from './RecentRoom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useRoomsStorage from '../../hooks/useRoomsStorage';
import Loading from '../../components/Loading';
import { HeroIcon } from '../../components/Icons';

function Home() {
  const history = useHistory();
  const [newRoomName, setNewRoomName] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const { addToast } = useToasts();
  const { rooms, loading } = useRoomsStorage();

  const goToCreateRoom = () => {
    if (newRoomName.length === 0) {
      addToast('You must type a name for your new room', {
        appearance: 'info',
      });
      return;
    }

    const currentSearch = qs.parse(history.location.search);
    history.push({
      pathname: '/room',
      search: qs.stringify({ ...currentSearch, newRoomName }),
    });
  };

  const goToRoom = () => {
    if (joinRoomId.length === 0) {
      addToast('You must type a name for your new room', {
        appearance: 'info',
      });
      return;
    }

    history.push(`/room/${encodeURIComponent(joinRoomId)}`);
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
    setJoinRoomId(e.currentTarget.value);
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
      <section className="flex flex-col-reverse items-center justify-center pb-6 lg:py-12 md:flex-row">
        <div className="flex flex-col items-center justify-center max-w-lg px-4 mt-4 text-gray-700 md:mt-0 lg:px-0">
          <p className="font-sans text-2xl font-thin text-center lg:text-4xl">
            Ppoker help teams during their planning sessions
          </p>
          <p className="font-sans text-xl font-thin text-center lg:text-2xl">
            Create or join a room to get started
          </p>
        </div>
        <HeroIcon className="w-full px-8 md:pr-8 md:pl-0 lg:w-xxl lg:mb-0" />
      </section>
      <section className="text-gray-800 bg-gray-300">
        {(rooms.length > 0 || loading) && (
          <div className="flex flex-col items-center text-center">
            <header className="my-8 font-semibold tracking-wide uppercase">
              Your Recent Rooms
            </header>
            <div className="w-full lg:max-w-2xl">
              {loading && (
                <div className="block">
                  <Loading />
                </div>
              )}
              {!loading && (
                <div className="flex justify-around px-24 lg:px-0">
                  {rooms.map(({ name, id }) => (
                    <HomeRecentRoom key={id} id={id} name={name} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-center py-8 md:py-12">
          <div className="flex flex-col max-w-4xl md:flex-row md:justify-around">
            <HomeInputCard
              title="Create a room"
              buttonLabel="Create"
              className="md:mr-8"
              placeholder="new-room"
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
              placeholder="room-id"
              value={joinRoomId}
              onChange={handleJoinRoomChange}
              onKeyPress={handleJoinRoomKeyPressed}
              onSubmit={goToRoom}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
