import { SET_ROOM } from './types';
import { Room } from '../../types';

export const setRoom = (room: Room) => ({
  type: SET_ROOM,
  payload: room,
});
