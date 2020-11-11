import React, { MouseEventHandler, HTMLProps } from 'react';
import classnames from 'classnames';

type Props = {
  title: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  buttonLabel: string;
  value: string;
} & HTMLProps<HTMLInputElement>;

function HomeInputCard({
  title,
  buttonLabel,
  value,
  onSubmit,
  className,
  ...inputProps
}: Props) {
  return (
    <div
      className={classnames(
        'flex flex-col py-4 text-center md:max-w-xl',
        className,
      )}
    >
      <h2 className="mb-4 font-semibold tracking-wide uppercase">{title}</h2>
      <form onSubmit={(e) => e.preventDefault()} className="flex">
        <input
          {...inputProps}
          className="px-4 py-2 text-gray-700 bg-gray-100 border-2 border-gray-500 rounded-l rounded-r-none focus:bg-white focus:outline-none focus:border-black"
          type="text"
          aria-label={title}
          value={value}
        />
        <button
          onClick={onSubmit}
          type="button"
          className="w-24 px-6 py-2 font-bold text-white bg-black border-2 border-black rounded-l-none rounded-r focus:outline-none hover:bg-gray-900 focus:shadow-outline"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
export default HomeInputCard;
