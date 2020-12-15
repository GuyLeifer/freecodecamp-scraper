import React, { useState, useEffect } from 'react';
import './Challenges.css'

import axios from 'axios';
import { Link } from 'react-router-dom'

function Challenges() {

    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get('/fcc/challenges/all-challenges');
            let willBeChallenges = [];
            for (const challenge in data) {
                willBeChallenges.push({title: challenge, info: data[challenge]})
            }
            setChallenges(willBeChallenges);
        })()
    }, [])

    const setDisplay = (challenge) => {
        if (document.getElementById(challenge).style.display === 'none') {
            document.getElementById(challenge).style.display = 'block'
        } else {
            document.getElementById(challenge).style.display = 'none'
        }
    }


    return (
        <div>
            {challenges.map(challenge => (
                <div className="challenge">
                        <div className="challengeHeader">
                            <h3 className="challengeTitle" onClick={() => setDisplay(challenge.title)}>{challenge.info.name + " (" + challenge.info.subChallenges.length + ")"}</h3>
                            <Link to={`/challenges/${challenge.title}`} >
                                (Challenge Page)
                            </Link>
                        </div>    
                        <div id={challenge.title} className="subChallenges" style={{display: "none"}}>
                        {challenge.info.subChallenges.map(subChallenge => (
                            <Link to={`/challenges/${challenge.title}/${subChallenge.dashedName}`} >
                                <div className="subChallenge">{subChallenge.name}</div>
                            </Link>
                        ))}
                        </div>
                </div>
            ))}
        </div>
    )
}

export default Challenges
