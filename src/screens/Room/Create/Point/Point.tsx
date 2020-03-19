import React, { ChangeEventHandler } from 'react';

type Props = {
  label: string;
  onDescriptionChange: ChangeEventHandler<HTMLInputElement>;
  onLabelChange: ChangeEventHandler<HTMLInputElement>;
  description: string;
  labelRef: React.Ref<HTMLInputElement>;
};

const Point: React.FC<Props> = ({
  onLabelChange: handleLabelChange,
  label,
  onDescriptionChange: handleDescriptionChange,
  description,
  labelRef,
}) => {
  return (
    <div className="flex flex-col justify-center w-full sm:flex-row">
      <div className="flex justify-center mr-0 sm:mr-2">
        <input
          ref={labelRef}
          className="p-2 border-b-2 border-gray-400 outline-none appearance-none focus:border-teal-500"
          placeholder="label"
          value={label}
          onChange={handleLabelChange}
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
