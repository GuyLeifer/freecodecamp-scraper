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
            console.log(data[0])
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
                    <div className="ChallengeId">
                        <div className="ChallengeCompleted">
                            <h3>Users Completed Challenge</h3>
                            {completed.map(user => <div>{user}</div>)}
                        </div>
                        <div className="subChallenges">
                            <h3>Sub - Challenges</h3>
                            {challenge.map((subChallenge) => (
                                <Link to={`challenges/${challengeId}/${subChallenge.subChallenge.dashedName}`} >
                                    <div className="subChallenge">{subChallenge.subChallenge.name}</div>
                                </Link>
                            ))}
                        </div>
                        <div className="ChallengeStarted">
                            <h3>Users Started Challenge</h3>
                            {started.map(user => <div>{user}</div>)}
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
