import React, { useState, HTMLProps } from 'react';
import cn from 'classnames';

type Props = {
  value: string;
  error?: string;
  id: string;
} & HTMLProps<HTMLInputElement>;

const Input: React.FC<Props> = ({
  id,
  onChange,
  value,
  error,
  className,
  onBlur,
  ...rest
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsDirty(true);
    onBlur && onBlur(e);
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
        {...rest}
        className={cn(
          className,
          'block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-white border rounded appearance-none focus:outline-none',
          {
            [`border-red-500`]: showError,
          },
        )}
        id={id}
        type="text"
        placeholder="Jane"
        onChange={onChange}
        onBlur={handleOnBlur}
        value={value}
      />
      <p className="text-xs italic text-red-500 h-3">{showError && error}</p>
    </>
  );
};

export default Input;
