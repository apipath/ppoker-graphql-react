import { Room } from '../../types';
import { SET_ROOM, RoomActionTypes } from './types';

type RoomState = Readonly<Room | null>;

const RoomReducer = (
  state: RoomState = null,
  action: RoomActionTypes,
): RoomState => {
  switch (action.type) {
    case SET_ROOM:
      return action.payload;
    default:
      return state;
  }
};

export default RoomReducer;
