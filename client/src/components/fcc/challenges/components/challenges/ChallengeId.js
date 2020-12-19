import React, { useState, useEffect } from 'react';
import './ChallengeId.css';

import axios from 'axios';
import { Link } from 'react-router-dom';

function ChallengeId( { match } ) {

    const challengeId = match.params.challenge;

    const [challenge, setChallenge] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [started, setStarted] = useState([]);

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get(`/fcc/challenges/${challengeId}`);
            setChallenge(data[0]);
            setCompleted(data[1]);
            setStarted(data[2]);
        })()
    }, [])
    
    return (
        <>
            {challenge.length > 0 ?
                <div className="ChallengePage">
                    <div>Challenge Name:</div>
                    <h2>{challenge[0].name}</h2>
                    <div>Super Challenge Name:</div>
                    <Link to={`/challenges/${challenge[0].superBlock.toLowerCase().replaceAll(" ", "-")}`}>
                        <h2>{challenge[0].superBlock}</h2>
                    </Link>
                    <div className="ChallengeId">
                        <div className="ChallengeCompleted">
                            <h3>Users Completed Challenge ({completed.length})</h3>                           
                                {completed.map(user =>
                                    <Link to={`/users/${user}`}>
                                        <div>{user}</div>
                                    </Link>
                                )}                   
                        </div>
                        <div className="subChallenges">
                            <h3>Sub - Challenges</h3>
                            {challenge.map((subChallenge) => (
                                <Link to={`${challengeId}/${subChallenge.subChallenge.dashedName}`} >
                                    <div className="subChallenge">{subChallenge.subChallenge.name}</div>
                                </Link>
                            ))}
                        </div>
                        <div className="ChallengeStarted">
                            <h3>Users Started Challenge ({started.length})</h3>
                            {started.map(user => 
                                <Link to={`/users/${user}`}>
                                    <div>{user}</div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            : 
                <></>
            }
        </>
            
    )
}

export default ChallengeId
