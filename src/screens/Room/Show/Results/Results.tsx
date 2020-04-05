import React from 'react';

import { Participant } from '../../../../generated/graphql';

type Props = {
  participants: Array<Participant>;
  showVotes: boolean;
};

const Results: React.FC<Props> = ({ participants, showVotes }) => {
  if (!showVotes) return null;

  const statistics = participants.reduce(
    (obj: { [key: string]: number }, participant) => {
      if (participant.votedPoint == null) return obj;

      const { label } = participant.votedPoint;
      obj[label] = obj[label] || 0;
      obj[label]++;
      return obj;
    },
    {},
  );
  const sortedStatistics = Object.entries(statistics).sort(
    ([, a], [, b]) => b - a,
  );

  const [mostVotedPointLabel, mostVotedPointVotes] = sortedStatistics[0] || [];
  const consensus =
    sortedStatistics.length === 1 &&
    mostVotedPointVotes === participants.length;

  if (showVotes && consensus) {
    return (
      <div className="flex flex-col mb-6 text-xl ">
        <span className="text-4xl text-center">{mostVotedPointLabel}</span>
        <div className="flex justify-center">
          <span className="px-4 py-1 text-white uppercase bg-green-400 rounded-full">
            Consensus
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-6 bg-white rounded shadow">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
              Point
            </th>
            <th className="px-6 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
              Votes
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStatistics.map(([label, count]) => (
            <tr key={label}>
              <td className="px-6 py-4">{label}</td>
              <td className="flex items-center px-6 py-4">
                <span className="text-indigo-100 rounded-full bg-indigo-500 uppercase px-4 py-1 text-xs font-bold mr-3">
                  {count}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
