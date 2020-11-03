import React from 'react';
import { FeedbackFish } from '@feedback-fish/react';

import { FEEDBACK_FISH } from '../../constants';

type Props = {
  userId?: string;
};

const FeedbackLink: React.FC<Props> = ({ userId }) => {
  return (
    <FeedbackFish projectId={FEEDBACK_FISH} userId={userId}>
      <span className="text-gray-700 cursor-pointer hover:text-gray-900">
        Give us Feedback
      </span>
    </FeedbackFish>
  );
};

export default FeedbackLink;
