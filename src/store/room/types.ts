import { Room } from '../../types';

export const SET_ROOM = 'room/setRoom' as const;

interface SetRoomAction {
  type: typeof SET_ROOM;
  payload: Room;
}

export type RoomActionTypes = SetRoomAction;
