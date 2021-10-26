import React from 'react';
import Highscores from '../components/Highscores';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

const Leaderboard = () => {
    return (
        <main>
        <h1>Leaderboard:</h1>
            <Highscores leaderboardEntries={[""]}/>
        </main>
    )
}

export default Leaderboard;