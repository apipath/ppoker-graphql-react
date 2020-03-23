import { RootAction } from 'typesafe-actions';

import { Room } from '../../types';
import { SET_ROOM, JOIN_ROOM } from './types';

type RoomState = Readonly<Room | null>;

const RoomReducer = (
  state: RoomState = null,
  action: RootAction,
): RoomState => {
  switch (action.type) {
    case SET_ROOM:
      return action.payload;
    case JOIN_ROOM:
      return action.payload.room;
    default:
      return state;
  }
};

export default RoomReducer;
