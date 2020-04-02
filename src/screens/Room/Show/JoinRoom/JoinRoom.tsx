import React, { useState } from 'react';

import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Input from '../../../../components/Input';

import {
  Room,
  Role,
  Session,
  useCreateSessionMutation,
} from '../../../../generated/graphql';

const STORAGE_KEY = '_join_room' as const;
type StorageState = Pick<Session, 'userName' | 'role'>;

const ROLES: Array<{ label: string; value: Role }> = [
  { label: 'Participant', value: Role.Participant },
  { label: 'Observer', value: Role.Observer },
];

type Props = {
  room: Room;
  onLogin: ({ session }: { session: Session }) => void;
};

const getStateFromStorage = (): StorageState => {
  const state = localStorage.getItem(STORAGE_KEY);
  if (state) {
    return JSON.parse(state) as StorageState;
  }

  return { userName: '', role: ROLES[0].value };
};

const JoinRoom: React.FC<Props> = ({ onLogin }) => {
  const storageState = getStateFromStorage();
  const [userName, setUserName] = useState(storageState.userName);
  const [role, setRole] = useState(storageState.role);
  const disabled = userName.length === 0;
  const [createSession, { loading }] = useCreateSessionMutation();

  const usernameError =
    userName.length === 0 ? `Please fill out this field.` : undefined;

  const handleSubmit = () => {
    if (disabled) return;

    createSession({ variables: { createSessionInput: { role, userName } } })
      .then((response) => {
        if (response.errors && response.errors.length > 0) {
          // TODO: better error handling
          throw response.errors; // let error boundary take care of it
        }

        if (!response.data) throw new Error('No data');

        const session = response.data.createSession;
        onLogin({ session });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      })
      .catch((err) => {
        throw err; // Let error boundary take care of it
      });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full mr-0 md:mr-2 md:w-1/2 md:mb-0">
            <Input
              id="username"
              value={userName}
              onChange={setUserName}
              error={usernameError}
            />
          </div>

          <div className="w-full ml-0 md:ml-2 md:w-1/2">
            <Select
              id="role"
              value={role}
              onChange={(role) => setRole(role as Role)}
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
