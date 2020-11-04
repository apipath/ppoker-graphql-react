import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Clipboard from 'clipboard';
import ReactTooltip from 'react-tooltip';
import { useToasts } from 'react-toast-notifications';

import JoinRoom from './JoinRoom';
import VoteRoom from './VoteRoom';
import { useGetRoomQuery, User } from '../../../generated/graphql';
import Loading from '../../../components/Loading';

const RoomShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const copyButtonEl = useRef<HTMLButtonElement>(null);
  const { addToast } = useToasts();
  const { data, loading, error } = useGetRoomQuery({ variables: { id } });
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = ({ user }: { user: User }) => {
    setUser(user);
  };

  useEffect(() => {
    if (!copyButtonEl.current || !data) return;

    const clipboard = new Clipboard(copyButtonEl.current, {
      text: () => `${window.location.href}room/${id}`,
    });
    clipboard.on('success', () => {
      addToast('URL copied to clipboard!', {
        appearance: 'success',
        autoDismiss: true,
      });
    });
    clipboard.on('error', (e) => {
      addToast('Error when copying URL to clipboard!', {
        appearance: 'error',
        autoDismiss: true,
      });
      console.error(e);
    });

    return () => clipboard.destroy();
  }, [id, data, addToast]);

  if (error) {
    throw error; // will be catched by error boundary
  }

  if (loading || !data) return <Loading />;

  const { room } = data;
  if (!room) {
    return <div>Create that room</div>;
  }

  return (
    <section className="p-4 lg:p-5">
      <header className="p-4 grid grid-cols-3">
        <h1 className="flex items-center justify-center text-2xl font-medium col-start-2">
          <div className="flex items-center border border-gray-400 rounded-md">
            <span className="px-4 text-gray-800 border-r">{room.name}</span>
            <button
              data-tip
              data-for="copy"
              className="mx-2 text-gray-700 cursor-pointer hover:text-gray-800"
              ref={copyButtonEl}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
          </div>
          <ReactTooltip id="copy" effect="solid">
            Copy URL To Clipboard
          </ReactTooltip>
        </h1>
      </header>
      <div>
        {user ? (
          <VoteRoom user={user} room={room} />
        ) : (
          <JoinRoom room={room} onLogin={handleLogin} />
        )}
      </div>
    </section>
  );
};

export default RoomShow;
