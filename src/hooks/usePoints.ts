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

const usePoints = (defaultPoints?: undefined | Array<Point>) => {
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
      const copyPoints = points.map((p) => ({ ...p }));
      const pointBeingValidated = copyPoints.find((p) => p.id === id);
      if (!pointBeingValidated) {
        console.warn(`Could not find point with id: '${id}' during validation`);
        return;
      }
      pointBeingValidated.label = label;
      const idsByLabel = copyPoints.reduce((acc, point) => {
        acc[point.label] = acc[point.label] || [];
        acc[point.label].push(point.id);
        return acc;
      }, {} as Record<string, string[]>);

      const getIsUnique = (point: { label: string; id: string }) =>
        label === '' ||
        (idsByLabel[point.label].length === 1 &&
          idsByLabel[point.label][0] === point.id);

      const isUnique = getIsUnique(pointBeingValidated);
      pointBeingValidated.error = !isUnique;

      if (pointBeingValidated.error) {
        addToast(`Value "${label}" is not unique`, {
          autoDismiss: true,
          appearance: 'error',
        });
      }

      copyPoints.forEach((point) => {
        if (point.id === pointBeingValidated.id) return;
        if (!getIsUnique(point)) return;
        point.error = false;
      });

      setPoints(copyPoints);
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
