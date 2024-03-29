import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2';
import { useToasts } from 'react-toast-notifications';
import { useLocation } from 'react-router';

import Point from '../../../components/Point';
import { DotsIcon, PlusIcon } from '../../../components/Icons/index';
import {
  useEditRoomMutation,
  useGetRoomQuery,
} from '../../../generated/graphql';
import Button3D from '../../../components/Button3D';
import Link3D from '../../../components/Link3D';
import Loading from '../../../components/Loading';
import usePoints from '../../../hooks/usePoints';

const RoomEdit: React.FC = () => {
  const { id = '' } = useParams();
  const location = useLocation();
  const newRoomNameRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToasts();
  const { data, loading } = useGetRoomQuery({ variables: { id } });
  const {
    points,
    setPoints,
    swapPoints,
    deletePoint,
    updateLabel,
    addNewEmptyPoint,
    updateDescription,
    validatePointLabel,
  } = usePoints(data?.room?.points);

  const [newRoomName, setNewRoomName] = useState(data?.room?.name || '');

  const [editRoom, { loading: editRoomLoading, error }] = useEditRoomMutation({
    onCompleted: (data) => {
      if (!data.editRoom) return;
      addToast('Room updated!', { appearance: 'success', autoDismiss: true });
    },
  });

  if (error) {
    // Let error boundary to catch this
    throw error;
  }

  useEffect(() => {
    if (data && data?.room && data?.room.points) {
      setPoints(data.room.points);
      setNewRoomName(data.room.name);
      if (newRoomNameRef.current) {
        newRoomNameRef.current.focus();
      }
    }
  }, [data, setPoints]);

  if (loading || !data || !data?.room?.name) return <Loading />;

  const handleNewRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoomName(e.target.value);
  };

  const handleEditRoom = () => {
    if (!points) return;
    const pointsInput = points
      .filter(({ label }) => label)
      .map(({ label, description }) => ({ label, description }));
    const roomInput = { id, name: newRoomName };
    editRoom({
      variables: { roomInput, pointsInput },
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    swapPoints(source.index, destination.index);
  };

  const updateEnabled =
    points.filter((p) => p.label.length > 0).length > 1 &&
    points.every(({ error }) => !error) &&
    newRoomName.length > 0;

  return (
    <section className="md:mx-auto md:w-2/3 lg:w-1/2">
      <header className="justify-between block px-4 pb-2 mb-4 border-b-2 border-gray-200 sm:flex">
        <h2 className="text-xl font-semibold tracking-wide text-gray-900">
          <div className="flex justify-center mr-0 sm:mr-2">
            <input
              ref={newRoomNameRef}
              className={classnames(
                'p-2 sm:w-auto bg-transparent border-b-2 outline-none appearance-none font-semibold tracking-wide text-gray-900 text-xl',
                {
                  [`border-red-400 focus:border-red-400`]:
                    newRoomName.length === 0,
                  [`border-gray-400 focus:border-purple-500`]:
                    newRoomName.length > 0,
                },
              )}
              placeholder={newRoomName || "room's name"}
              value={newRoomName}
              onChange={handleNewRoomNameChange}
            />
          </div>
        </h2>
        <div className="flex justify-around my-4 sm:my-0 sm:flex-start">
          <Button3D
            loading={loading}
            onClick={handleEditRoom}
            disabled={!updateEnabled}
          >
            Update
          </Button3D>

          <Link3D
            className="ml-4"
            to={location.pathname.replace(/\/edit$/, '')}
          >
            Join Room
          </Link3D>
        </div>
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
                            disabled={editRoomLoading}
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
          disabled={editRoomLoading}
          className="flex items-center justify-center w-12 h-12 mx-auto my-4 text-blue-900 bg-white rounded-full shadow-md focus:outline-none hover:shadow-lg"
        >
          <PlusIcon className="w-6" />
        </button>
      </ul>
    </section>
  );
};

export default RoomEdit;
