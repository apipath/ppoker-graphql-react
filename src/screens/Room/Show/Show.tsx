import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import JoinRoom from './JoinRoom';
import VoteRoom from './VoteRoom';
import { useGetRoomQuery, User } from '../../../generated/graphql';
import { NOT_FOUND_ERR_CODE, hasError } from '../../../errors';

function RoomShow() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetRoomQuery({ variables: { id } });

  const [user, setUser] = useState<User | null>(null);
  const handleLogin = ({ user }: { user: User }) => {
    setUser(user);
  };

  if (error) {
    if (hasError(error, NOT_FOUND_ERR_CODE)) {
      return <p>NOT FOUND</p>;
    }

    throw error;
  }
  // TODO: use a proper loading
  if (loading || !data) return <p>Loading...</p>;
  const { room } = data;

  if (!room) {
    return <div>Create that room</div>;
  }

  return (
    <section className="p-4 lg:p-5">
      <h1 className="mb-4 text-2xl font-medium text-center">
        <span className="text-gray-800">{room.name}</span>
        <span className="text-gray-700">#{room.id}</span>
      </h1>
      <div>
        {user ? (
          <VoteRoom user={user} room={room} />
        ) : (
          <JoinRoom room={room} onLogin={handleLogin} />
        )}
      </div>
    </section>
  );
}

export default RoomShow;
