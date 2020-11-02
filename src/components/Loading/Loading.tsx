import React from 'react';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/infinity';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <UseAnimations animation={loading} size={32} />
    </div>
  );
};

export default Loading;
