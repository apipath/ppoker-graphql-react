import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../../store';
import JoinRoom from './JoinRoom';
import VoteRoom from './VoteRoom';
import { Observer, Session, Participant, Room } from '../../../types';
import { useDispatch } from 'react-redux';
import { joinRoom } from '../../../store/room/actions';

function RoomShow() {
  const { id } = useParams<{ id: string }>();
  const room = useTypedSelector(state => state.room);
  const [showVotes] = useState(false);
  const session = useTypedSelector(state => state.session);
  const dispatch = useDispatch();

  const handleLogin = ({
    session,
    participants,
    observers,
    room,
  }: {
    session: Session;
    participants: Array<Participant>;
    observers: Array<Observer>;
    room: Room;
  }) => {
    dispatch(joinRoom({ session, room, observers, participants }));
  };

  // TODO: use a proper loading
  if (!room) return <p>Loading...</p>;

  return (
    <section className="p-4 lg:p-5">
      <h1 className="mb-8 text-2xl font-medium text-center">
        <span className="text-gray-800">{room.name}</span>
        <span className="text-gray-700">#{room.id}</span>
      </h1>
      <div>
        {session ? (
          <VoteRoom showVotes={showVotes} />
        ) : (
          <JoinRoom id={id} onLogin={handleLogin} />
        )}
      </div>
    </section>
  );
}

export default RoomShow;
