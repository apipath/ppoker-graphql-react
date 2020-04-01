import { SET_ROOM, JOIN_ROOM } from './types';
import { Participant, Observer, Session } from '../../types';
import { Room } from '../../generated/graphql';

export const setRoom = (room: Room) => ({
  type: SET_ROOM,
  payload: room,
});

export const joinRoom = ({
  room,
  participants,
  observers,
  session,
}: {
  room: Room;
  participants: Array<Participant>;
  observers: Array<Observer>;
  session: Session;
}) => ({
  type: JOIN_ROOM,
  payload: {
    room,
    participants,
    observers,
    session,
  },
});
