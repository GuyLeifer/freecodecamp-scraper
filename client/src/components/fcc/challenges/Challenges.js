import React, { useState, useEffect } from 'react';
import './Challenges.css'

import axios from 'axios';
import { Link } from 'react-router-dom'

function Challenges() {

    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get('/fcc/challenges');
            console.log(data)
            setChallenges(data);
        })()
    }, [])

    const setDisplay = (id) => {
        if (document.getElementById(id).style.display === 'none') {
            document.getElementById(id).style.display = 'block'
        } else {
            document.getElementById(id).style.display = 'none'
        }
    }


    return (
        <div>
            {challenges.map(superBlock => (
                <div className="superBlock">
                        <div className="superBlockHeader">
                            <h2 className="superBlockTitle" onClick={() => setDisplay(superBlock.name)}>{superBlock.name + " (" + superBlock.challenges.length + ")"}</h2>
                        </div>
                        <div id={(superBlock.name)} style={{display: "none"}}>
                            {superBlock.challenges.map(challenge => (
                                <div id={challenge.name} className="Challenge">
                                    <div className="challengeHeader">
                                    <h4 className="challengeTitle" onClick={() => setDisplay(challenge.dashedName)}>{challenge.name + " (" + challenge.subChallenges.length + ")"}</h4>
                                    <Link to={`/challenges/${challenge.dashedName}`}>
                                        (Go To Page)
                                    </Link>
                                    </div>
                                    <div id={challenge.dashedName} style={{display: "none"}}>
                                    {challenge.subChallenges.map(subChallenge => (
                                        <Link to={`/challenges/${challenge.name}/${subChallenge.dashedName}`} >
                                            <div className="subChallenge">{subChallenge.name}</div>
                                        </Link>
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </div>    
                </div>
            ))}
        </div>
    )
}

export default Challenges
