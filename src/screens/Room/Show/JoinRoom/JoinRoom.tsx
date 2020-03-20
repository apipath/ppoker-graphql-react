import React, { useState } from 'react';

import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Input from '../../../../components/Input';

const ROLES = [
  { label: 'Participant', value: 'participant' },
  { label: 'Observer', value: 'observer' },
];

const JoinRoom: React.FC<{ id: string }> = ({ id }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(ROLES[0].value);
  const disabled = username.length === 0;
  const usernameError =
    username.length === 0 ? `Please fill out this field.` : undefined;
  const handleOnClick = () => {
    console.log('{ id, username, role, disabled }', {
      id,
      username,
      role,
      disabled,
    });
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-6 mr-0 md:mr-2 md:w-1/2 md:mb-0">
            <Input
              id="username"
              value={username}
              onChange={setUsername}
              error={usernameError}
            />
          </div>

          <div className="w-full ml-0 md:ml-2 md:w-1/2">
            <Select id="role" value={role} onChange={setRole} options={ROLES} />
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center justify-end">
          <Button disabled={disabled} onClick={handleOnClick}>
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
