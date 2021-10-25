import React from 'react';
import { Link } from 'react-router-dom';

const Highscores = ({ leaderboardEntries }) => {
  if (!leaderboardEntries.length) {
    return <h3>No Highscores Yet</h3>;
  }

  return (
    <div>
      {leaderboardEntries &&
        leaderboardEntries.map(entry => (
            <div></div>
        ))}
    </div>
  );
};

export default Highscores;