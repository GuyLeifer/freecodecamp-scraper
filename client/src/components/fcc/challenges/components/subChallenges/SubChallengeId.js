import React, { useState, useEffect } from 'react';
import './SubChallengeId.css';

import axios from 'axios';
import { Link } from 'react-router-dom';

function SubChallengeId( { match } ) {

    const subChallengeId = match.params.subChallenge;

    const [subChallenge, setSubChallenge] = useState({});
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get(`/fcc/challenges/sub-challenge/${subChallengeId}`);
            console.log(data[0])
            setSubChallenge(data[0]);
            setCompleted(data[1]);
        })()
    }, [])
    
    return (
        <>
            {subChallenge.hasOwnProperty("name") > 0 ?
                <div className="subChallengePage">
                    <div>Sub-Challenge Name:</div>
                    <h2>{subChallenge.name}</h2>
                    <div className="subChallengeId">
                        <div className="superChallenge">
                            <h3>Super Challenge</h3>
                            <Link to={`/challenges/${subChallenge.challenge.superBlock.toLowerCase().replaceAll(" ", "-")}`} >
                                <div className="Challenge">{subChallenge.challenge.superBlock}</div>
                            </Link>
                        </div>
                        <div className="subChallengeCompleted">
                            <h3>Users Completed Challenge ({completed.length})</h3>
                            {completed.map(user =>
                                <Link to={`/users/${user}`}>
                                    <div>{user}</div>
                                </Link>
                            )}   
                        </div>
                        <div className="challenge">
                            <h3>Challenge</h3>
                            <Link to={`/challenges/${subChallenge.challenge.superBlock.toLowerCase().replaceAll(" ", "-")}/${subChallenge.challenge.dashedName}`}>
                                <div className="Challenge">{subChallenge.challenge.name}</div>
                            </Link>
                        </div>
                    </div>
                </div>
            : 
                <></>
            }
        </>
            
    )
}

export default SubChallengeId
