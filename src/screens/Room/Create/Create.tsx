import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import classnames from 'classnames';
import ReactGA from 'react-ga';
import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2';
import { RouteComponentProps } from 'react-router';

import Button3D from '../../../components/Button3D';
import Point from '../../../components/Point';
import { DotsIcon, PlusIcon } from '../../../components/Icons/index';
import { useCreateRoomMutation } from '../../../generated/graphql';
import usePoints from '../../../hooks/usePoints';
import defaultPoints from './default-points';

type Props = RouteComponentProps<{}>;

const RoomCreate: React.FC<Props> = ({ history }) => {
  const firstRowRef = useRef<HTMLInputElement>(null);
  const newRoomNameRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const parsedQuery = qs.parse(location.search);
  const [newRoomName, setNewRoomName] = useState(
    'newRoomName' in parsedQuery ? String(parsedQuery.newRoomName) : '',
  );
  const [newRoomNameHasError, setNewRoomHasError] = useState(false);
  const {
    points,
    validatePointLabel,
    swapPoints,
    deletePoint,
    updateLabel,
    addNewEmptyPoint,
    updateDescription,
    clearPoints,
  } = usePoints(defaultPoints);
  const [createRoom, { loading }] = useCreateRoomMutation({
    onCompleted: (data) => {
      if (!data.createRoom) return;
      const { id } = data.createRoom;
      history.push(`/room/${id}`);
      ReactGA.event({
        category: 'User',
        action: 'Created a Room',
      });
    },
    onError: (err) => {
      // Let react boundaries take care of this
      throw err;
    },
  });
  const handleNewRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoomName(e.target.value);
    setNewRoomHasError(e.target.value.length === 0);
  };

  useEffect(() => {
    if (newRoomName.length === 0 && newRoomNameRef.current) {
      newRoomNameRef.current.focus();
    } else if (firstRowRef.current) {
      firstRowRef.current.focus();
    }
  }, []); // eslint-disable-line

  const handleCreateRoom = () => {
    const pointsInput = points
      .filter(({ label }) => label)
      .map(({ id, error, ...rest }) => rest);
    const roomInput = { name: newRoomName };
    createRoom({
      variables: { roomInput, pointsInput },
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    swapPoints(source.index, destination.index);
  };

  const createEnabled =
    newRoomName.length > 0 &&
    points.filter((p) => p.label.length > 0).length > 1 &&
    points.every(({ error }) => !error);

  return (
    <section className="md:mx-auto md:w-2/3 lg:w-1/2">
      <header className="flex justify-between px-4 pb-2 mb-4 border-b-2 border-gray-200">
        <h2 className="text-xl font-semibold tracking-wide text-gray-900">
          <div className="flex justify-center mr-0 sm:mr-2">
            <input
              ref={newRoomNameRef}
              className={classnames(
                'w-4/5 p-2 bg-transparent border-b-2 outline-none appearance-none font-semibold tracking-wide text-gray-900 text-xl',
                {
                  [`border-red-400 focus:border-red-400`]: newRoomNameHasError,
                  [`border-gray-400 focus:border-purple-500`]: !newRoomNameHasError,
                },
              )}
              placeholder={newRoomName || "room's name"}
              value={newRoomName}
              onChange={handleNewRoomNameChange}
            />
          </div>
        </h2>
        <Button3D
          loading={loading}
          onClick={handleCreateRoom}
          disabled={!createEnabled}
        >
          Create
        </Button3D>
      </header>
      <ul>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="new-room">
            {(provided) => (
              <div
                className="flex flex-col items-center"
                ref={provided.innerRef}
              >
                {points.map(({ id, label, description, error }, index) => {
                  const isDragDisabled = !label;

                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          className={classnames(
                            'px-2 py-4 w-full sm:w-auto flex items-center shadow bg-white my-1 rounded transition-bg-color',
                            {
                              [`bg-gray-200 shadow-md`]: snapshot.isDragging,
                              [`cursor-move`]: !isDragDisabled,
                            },
                          )}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Point
                            labelRef={index === 0 ? firstRowRef : null}
                            label={label}
                            description={description || ''}
                            onLabelChange={(e) =>
                              updateLabel(e.target.value, index)
                            }
                            onDescriptionChange={(e) =>
                              updateDescription(e.target.value, index)
                            }
                            onLabelBlur={() =>
                              validatePointLabel({ label, id })
                            }
                            error={error ? 'Labels must be unique.' : undefined}
                          />
                          <DotsIcon
                            className={classnames(
                              'w-8 sm:w-6 m-2 text-gray-500',
                              {
                                [`text-gray-700`]: snapshot.isDragging,
                              },
                            )}
                          />

                          <UseAnimations
                            size={32}
                            animation={trash2}
                            disabled={loading}
                            onClick={() => deletePoint(index)}
                            className="outline-none cursor-pointer"
                          />
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
          onClick={() => addNewEmptyPoint()}
          disabled={loading}
          className="flex items-center justify-center w-12 h-12 mx-auto my-4 text-blue-900 bg-white rounded-full shadow-md focus:outline-none hover:shadow-lg"
        >
          <PlusIcon className="w-6" />
        </button>
      </ul>
    </section>
  );
};

export default RoomCreate;
