import React from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = ({ leaderboardEntries }) => {
  if (!leaderboardEntries.length) {
    return <h3>No leaderboardEntries Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {leaderboardEntries &&
        leaderboardEntries.map(entry => (
            <div></div>
        ))}
    </div>
  );
};

export default Leaderboard;