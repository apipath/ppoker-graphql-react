import React from 'react';
import { useParams } from 'react-router-dom';

function RoomShow() {
  const { id } = useParams();
  return <div>Show: {id}</div>;
}

export default RoomShow;
