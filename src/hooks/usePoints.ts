import { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useToasts } from 'react-toast-notifications';

type Point = {
  label: string;
  description?: string | null;
  id?: string;
};

const mapPointsWithId = (points: Array<Point> = []) =>
  points.map(({ label, description, id }) => ({
    label,
    description,
    id: id || nanoid(),
    error: false,
  }));

// TODO: improve error validation with tests

const usePoints = (defaultPoints: undefined | Array<Point>) => {
  const { addToast } = useToasts();
  const [points, setPoints] = useState(mapPointsWithId(defaultPoints));

  const addNewEmptyPoint = useCallback(() => {
    setPoints((opts) => [
      ...opts,
      { id: nanoid(), label: '', description: '', error: false },
    ]);
  }, [setPoints]);

  const updateLabel = useCallback(
    (label: string, index: number) => {
      setPoints((currentPoints) => {
        const points = currentPoints.map((point) => ({ ...point }));
        points[index].label = label;

        return points;
      });
    },
    [setPoints],
  );

  const updateDescription = useCallback(
    (description: string, index: number) => {
      setPoints((currentPoints) => {
        const points = currentPoints.map((point) => ({ ...point }));
        points[index].description = description;
        return points;
      });
    },
    [setPoints],
  );

  const updatePoints = useCallback(
    (points: Array<Point>) => setPoints(mapPointsWithId(points)),
    [setPoints],
  );

  const swapPoints = useCallback(
    (sourceIndex, destinationIndex) => {
      setPoints((currentPoints) => {
        const points = currentPoints.map((point) => ({ ...point }));
        const tmp = points[sourceIndex];
        points.splice(sourceIndex, 1);
        points.splice(destinationIndex, 0, tmp);
        return points;
      });
    },
    [setPoints],
  );

  const deletePoint = useCallback(
    (index: number) => {
      setPoints((currentPoints) => {
        const points = currentPoints.map((point) => ({ ...point }));
        points.splice(index, 1);
        return points;
      });
    },
    [setPoints],
  );

  const validatePointLabel = useCallback(
    ({ id, label }: { id: string; label: string }) => {
      const point = points.find((p) => p.id === id);
      if (!point) {
        console.warn(`Could not find point with id: '${id}' during validation`);
        return;
      }

      const isNotUnique = points.some(
        (point) => id !== point.id && label === point.label,
      );
      const isUnique = !isNotUnique;

      if (point.error && isNotUnique) return;
      if (!point.error && isUnique) return;

      setPoints((currentPoints) => {
        const points = currentPoints.map((point) => ({ ...point }));
        points.some((point) => {
          if (point.id !== id) return false;
          point.error = !point.error;
          return true;
        });
        return points;
      });

      if (isNotUnique) {
        addToast(`Value "${label}" is not unique`, {
          autoDismiss: true,
          appearance: 'error',
        });
      }
    },
    [setPoints, addToast, points],
  );

  return {
    addNewEmptyPoint,
    updateLabel,
    updateDescription,
    points,
    setPoints: updatePoints,
    swapPoints,
    deletePoint,
    validatePointLabel,
  };
};

export default usePoints;
