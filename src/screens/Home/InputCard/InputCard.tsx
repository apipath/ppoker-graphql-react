import React, { MouseEventHandler, HTMLProps } from 'react';

type Props = {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonLabel: string;
  value: string;
} & HTMLProps<HTMLInputElement>;

function HomeInputCard({
  title,
  buttonLabel,
  value,
  onClick,
  ...inputProps
}: Props) {
  return (
    <div className="flex flex-col px-8 py-4 text-center text-white md:max-w-xl">
      <h2 className="mb-4 font-semibold tracking-wide text-gray-800 uppercase">
        {title}
      </h2>
      <div className="flex">
        <input
          {...inputProps}
          className="px-4 py-2 text-gray-700 bg-gray-100 border-2 border-gray-500 rounded-l rounded-r-none focus:bg-white focus:outline-none focus:border-black"
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
