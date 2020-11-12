import { useState, useCallback } from 'react';
import { useGetRoomsQuery } from '../generated/graphql';

const Storage = window.localStorage;
const key = '_VisitedRoomIds_';

function getVisitedRoomsIds(): Set<string> {
  const ids = JSON.parse(Storage.getItem(key) || '[]');
  return new Set(ids);
}

const useRoomsStorage = () => {
  const [ids, setIds] = useState(getVisitedRoomsIds);
  const { data, loading, error } = useGetRoomsQuery({
    variables: { ids: Array.from(ids) },
    skip: ids.size === 0,
  });

  const addRoomId = useCallback(
    (id: string) => {
      const ids = getVisitedRoomsIds();
      ids.add(id);
      Storage.setItem(key, JSON.stringify(Array.from(ids)));
      setIds(ids);
    },
    [setIds],
  );

  return { rooms: data?.rooms || [], loading, error, addRoomId };
};

export default useRoomsStorage;
