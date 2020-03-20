import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  onChange: (v: string) => void;
  value: string;
  error?: string;
  id: string;
};

const Input: React.FC<Props> = ({ id, onChange, value, error }) => {
  const [isDirty, setIsDirty] = useState(false);
  const handleOnBlur = () => {
    setIsDirty(true);
  };

  const showError = isDirty && error;

  return (
    <>
      <label
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
        htmlFor={id}
      >
        Name
      </label>
      <input
        className={cn(
          'block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-white border rounded appearance-none focus:outline-none',
          {
            [`border-red-500`]: showError,
          },
        )}
        id={id}
        type="text"
        placeholder="Jane"
        onChange={e => onChange(e.target.value)}
        onBlur={handleOnBlur}
        value={value}
      />
      <p className="text-xs italic text-red-500 h-3">{showError && error}</p>
    </>
  );
};

export default Input;
