import React, { useState, useEffect } from 'react';
import './SuperChallengeId.css';

import axios from 'axios';
import { Link } from 'react-router-dom';

import Loader from '../../../../loader/Loader';

function SuperChallengeId({ match }) {

    const superChallengeId = match.params.superChallenge;

    const [superChallenge, setSuperChallenge] = useState({});
    const [completed, setCompleted] = useState([]);
    const [started, setStarted] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/fcc/challenges/super-challenge/${superChallengeId}`);
            setSuperChallenge(data[0]);
            setCompleted(data[1]);
            setStarted(data[2]);
            setLoading(false)
        })()
    }, [])

    return (
        <>
            {loading &&
                <div>
                    <h2>Loading</h2>
                    <Loader />
                </div>
            }
            {superChallenge.hasOwnProperty("name") ?
                <div className="superChallengePage">
                    <div>Challenge Name:</div>
                    <h2>{superChallenge.name}</h2>
                    <div className="ChallengeId">
                        <div className="ChallengeCompleted">
                            <h3>Users Completed Challenge ({completed.length})</h3>
                            {completed.map(user =>
                                <Link to={`/users/${user}`}>
                                    <div>{user}</div>
                                </Link>
                            )}
                        </div>
                        <div className="Challenges">
                            <h3>Challenges ({superChallenge.challenges.length})</h3>
                            {superChallenge.challenges.map((challenge) => (
                                <Link to={`${superChallengeId}/${challenge.dashedName}`} >
                                    <div className="subChallenge">{challenge.name}</div>
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

export default SuperChallengeId
