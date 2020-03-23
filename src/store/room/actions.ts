import { SET_ROOM, JOIN_ROOM } from './types';
import { Room, Participant, Observer, Session } from '../../types';

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
