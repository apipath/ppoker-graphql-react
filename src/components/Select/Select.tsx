import React from 'react';
import { CaretDown } from '../Icons';

type Props = {
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
  value: string;
  id: string;
};

const Select: React.FC<Props> = ({ id, options, onChange, value }) => {
  return (
    <>
      <label
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
        htmlFor={id}
      >
        Join as
      </label>
      <div className="relative inline-block w-full">
        <select
          id={id}
          className="block w-full px-4 py-3 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <CaretDown className="w-4 h-4 fill-current" />
        </div>
      </div>
    </>
  );
};

export default Select;
