import React, { useState } from 'react';

import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Input from '../../../../components/Input';

import { Session, Role, Observer, Room, Participant } from '../../../../types';
import {
  mockedParticipants,
  mockedRoom,
  mockedObservers,
} from '../../../../mocks';

const ROLES: Array<{ label: string; value: Role }> = [
  { label: 'Participant', value: 'participant' },
  { label: 'Observer', value: 'observer' },
];

type Props = {
  id: string;
  onLogin: ({
    session,
    participants,
    observers,
    room,
  }: {
    session: Session;
    participants: Array<Participant>;
    observers: Array<Observer>;
    room: Room;
  }) => void;
};

const JoinRoom: React.FC<Props> = ({ id, onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(ROLES[0].value);
  const [loading, setLoading] = useState(false);
  const disabled = username.length === 0;
  const usernameError =
    username.length === 0 ? `Please fill out this field.` : undefined;
  const handleSubmit = () => {
    if (disabled) return;

    console.log('{ id, username, role, disabled }', {
      id,
      username,
      role,
      disabled,
    });

    setLoading(true);

    setTimeout(() => {
      // TODO: use BE response
      const session = { id: username, username, role };
      const participants = [...mockedParticipants, { ...session }];
      onLogin({
        session,
        participants,
        observers: [...mockedObservers],
        room: { ...mockedRoom },
      });
    }, 2000);
  };
  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-full max-w-lg">
        <div onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          <div className="w-full mr-0 md:mr-2 md:w-1/2 md:mb-0">
            <Input
              id="username"
              value={username}
              onChange={setUsername}
              error={usernameError}
            />
          </div>

          <div className="w-full ml-0 md:ml-2 md:w-1/2">
            <Select
              id="role"
              value={role}
              onChange={() => setRole('observer')}
              options={ROLES}
            />
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center justify-end">
          <Button
            type="submit"
            disabled={disabled}
            onClick={handleSubmit}
            loading={loading}
          >
            Join
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoom;
