import React from 'react';

function HomeInputCard({ title, onClick, buttonLabel }) {
  return (
    <div className="px-8 py-4 md:max-w-xl flex flex-col text-white text-center">
      <h2 className="mb-4 uppercase tracking-wide font-semibold text-gray-800">
        {title}
      </h2>
      <div>
        <input
          className="py-2 px-4 rounded-l border-2 bg-gray-100 border-gray-500 text-gray-700 focus:bg-white focus:outline-none focus:border-black"
          type="text"
          placeholder="new-room"
        />
        <button
          onClick={onClick}
          type="button"
          className="py-2 px-6 w-24 border-2 border-black bg-black rounded-r font-bold focus:outline-none hover:bg-gray-900 focus:shadow-outline"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
export default HomeInputCard;
