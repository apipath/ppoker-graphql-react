import React, { MouseEventHandler, InputHTMLAttributes } from 'react';

type Props = {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonLabel: string;
  value: string;
} & InputHTMLAttributes<HTMLInputElement>;

function HomeInputCard({
  title,
  buttonLabel,
  value,
  onClick,
  ...inputProps
}: Props) {
  return (
    <div className="px-8 py-4 md:max-w-xl flex flex-col text-white text-center">
      <h2 className="mb-4 uppercase tracking-wide font-semibold text-gray-800">
        {title}
      </h2>
      <div className="flex">
        <input
          {...inputProps}
          className="py-2 px-4 border-2 bg-gray-100 rounded-l rounded-r-none border-gray-500 text-gray-700 focus:bg-white focus:outline-none focus:border-black"
          type="text"
          aria-label={title}
          placeholder="new-room"
          value={value}
        />
        <button
          onClick={onClick}
          type="button"
          className="py-2 px-6 w-24 border-2 rounded-l-none border-black rounded-r bg-black font-bold focus:outline-none hover:bg-gray-900 focus:shadow-outline"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
export default HomeInputCard;
