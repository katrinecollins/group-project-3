import React from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC, QUERY_COVID_HISTORY } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const { loading2, data2, error2 } = useQuery(QUERY_COVID_HISTORY);
  const thoughts = data?.thoughts || [];
  const covidData = data2?.country || {
    
  };

  console.log(data2)

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      {/* TEST COVID DATA */}
      {loading2 || error2 ? (
            <div>Loading Covid Data...</div>
          ) : (
            <div>
            <h1>{covidData.time}</h1>
            </div>
          )}
     
      {/* END TEST */}
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
