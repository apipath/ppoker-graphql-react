import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import cn from 'classnames';

type Props = {
  label: string;
  onDescriptionChange: ChangeEventHandler<HTMLInputElement>;
  onLabelChange: ChangeEventHandler<HTMLInputElement>;
  onLabelBlur: FocusEventHandler<HTMLInputElement>;
  description: string;
  labelRef?: React.Ref<HTMLInputElement>;
  error?: string;
};

const Point: React.FC<Props> = ({
  onLabelChange: handleLabelChange,
  label,
  onDescriptionChange: handleDescriptionChange,
  onLabelBlur,
  description,
  labelRef,
  error,
}) => {
  return (
    <div className="flex flex-col justify-center w-full sm:flex-row">
      <div className="flex justify-center mr-0 sm:mr-2">
        <input
          ref={labelRef}
          className={cn(
            'p-2 bg-transparent border-b-2 outline-none appearance-none ',
            {
              [`border-red-400 focus:border-red-400`]: error,
              [`border-gray-400 focus:border-teal-500`]: !error,
            },
          )}
          placeholder="label"
          value={label}
          onChange={handleLabelChange}
          onBlur={onLabelBlur}
        />
      </div>
      <div className="flex justify-center mt-4 sm:mt-0">
        <input
          className="p-2 font-medium text-center text-blue-400 placeholder-blue-300 bg-blue-100 rounded-full outline-none appearance-none focus:placeholder-transparent"
          placeholder="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default Point;
