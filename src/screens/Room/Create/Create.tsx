import React, { useState, ChangeEventHandler, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import classnames from 'classnames';
import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import nanoid from 'nanoid';

import Button from '../../../components/Button';

type Point = {
  id: string;
  label: string;
  description: string;
};

type PointRowProps = {
  onLabelChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  onDescriptionChange: ChangeEventHandler<HTMLInputElement>;
  description: string;
  labelRef: React.Ref<HTMLInputElement>;
};

function PointRow({
  onLabelChange: handleLabelChange,
  label,
  onDescriptionChange: handleDescriptionChange,
  description,
  labelRef,
}: PointRowProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="mr-2">
        <input
          ref={labelRef}
          className="p-2 border-b-2 border-gray-400 outline-none appearance-none focus:border-teal-500"
          placeholder="label"
          value={label}
          onChange={handleLabelChange}
        />
      </div>
      <div>
        <input
          className="p-2 font-medium text-center text-blue-400 placeholder-blue-300 bg-blue-100 rounded-full outline-none appearance-none focus:placeholder-transparent"
          placeholder="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
}

function RoomCreate() {
  const firstRowRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { newRoomName } = qs.parse(location.search);
  const [points, setPoints] = useState<Array<Point>>(
    Array.from({ length: 3 }).map(() => ({
      id: nanoid(),
      label: '',
      description: '',
    })),
  );

  useEffect(() => {
    if (firstRowRef.current) {
      firstRowRef.current.focus();
    }
  }, []);

  const handleNewPoint = () =>
    setPoints(opts => [...opts, { id: nanoid(), label: '', description: '' }]);

  const handleCreateRoom = () => {
    const opts = points
      .filter(({ label }) => label)
      .map(({ id, ...rest }) => rest);
    console.log(opts);
  };

  const handlePointLabelChange = (label: string, index: number) => {
    setPoints(currentPoints => {
      const points = currentPoints.map(point => ({ ...point }));
      points[index].label = label;

      return points;
    });
  };

  const handlePointDescriptionChange = (description: string, index: number) => {
    setPoints(currentPoints => {
      const points = currentPoints.map(point => ({ ...point }));
      points[index].description = description;

      return points;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    setPoints(currentPoints => {
      const points = currentPoints.map(point => ({ ...point }));
      const tmp = points[sourceIndex];
      points.splice(sourceIndex, 1);
      points.splice(destinationIndex, 0, tmp);
      return points;
    });
  };

  const createEnabled = points.filter(({ label }) => label).length > 1;

  return (
    <section className="mx-auto md:w-2/3 lg:w-1/2">
      <header className="flex justify-between w-full pb-2 mb-4 border-b-2 border-gray-200">
        <h2 className="text-xl font-semibold tracking-wide text-gray-900">
          {newRoomName}
        </h2>
        <Button onClick={handleCreateRoom} disabled={!createEnabled}>
          Create
        </Button>
      </header>
      <ul>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="new-room">
            {provided => (
              <div
                className="flex flex-col items-center"
                ref={provided.innerRef}
              >
                {points.map(({ id, label, description }, index) => {
                  const isDragDisabled = !label;

                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          className={classnames(
                            'px-2 py-4 flex items-center shadow bg-white my-1 rounded transition-bg-color',
                            {
                              [`bg-gray-200 shadow-md`]: snapshot.isDragging,
                              [`cursor-move`]: !isDragDisabled,
                            },
                          )}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <>
                            <PointRow
                              labelRef={index === 0 ? firstRowRef : null}
                              label={label}
                              description={description}
                              onLabelChange={e =>
                                handlePointLabelChange(e.target.value, index)
                              }
                              onDescriptionChange={e =>
                                handlePointDescriptionChange(
                                  e.target.value,
                                  index,
                                )
                              }
                            />
                            <svg
                              className={classnames('m-2 text-gray-500', {
                                [`text-gray-700`]: snapshot.isDragging,
                              })}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z" />
                              <path d="M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z" />
                              <path d="M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z" />
                            </svg>
                          </>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={handleNewPoint}
          className="w-12 h-12 mx-auto my-4 flex justify-center items-center text-blue-900 bg-white rounded-full shadow-md hover:shadow-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M20 12L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </ul>
    </section>
  );
}

export default RoomCreate;
