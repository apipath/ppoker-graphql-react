import { Session, Participant, Observer } from '../../types';
import { Room } from '../../generated/graphql';

export const SET_ROOM = 'room/setRoom' as const;
export const JOIN_ROOM = 'room/joinRoom' as const;

interface SetRoomAction {
  type: typeof SET_ROOM;
  payload: Room;
}

interface JoinRoomAction {
  type: typeof JOIN_ROOM;
  payload: {
    session: Session;
    room: Room;
    participants: Array<Participant>;
    observers: Array<Observer>;
  };
}

export type RoomActionTypes = SetRoomAction | JoinRoomAction;
