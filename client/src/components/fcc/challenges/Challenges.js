import React, { useState, useEffect } from 'react';
import './Challenges.css'

import axios from 'axios';
import { Link } from 'react-router-dom'
import Loader from '../../loader/Loader';

function Challenges() {

    const [loading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/fcc/challenges');
            setChallenges(data);
            setLoading(false)
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
        <>
            { loading ?
                <div>
                    <h2>Loading</h2>
                    <Loader />
                </div>
                :
                <div>
                    {challenges.map(superBlock => (
                        <div className="superBlock">
                            <div className="superBlockHeader">
                                <h2 className="superBlockTitle" onClick={() => setDisplay(superBlock.name)}>{superBlock.name + " (" + superBlock.challenges.length + ")"}</h2>
                                <Link to={`/challenges/${(superBlock.name).toLowerCase().replaceAll(" ", "-")}`}>
                                    (Go To Page)
                                </Link>
                            </div>
                            <div id={(superBlock.name)} style={{ display: "none" }}>
                                {superBlock.challenges.map(challenge => (
                                    <div id={challenge.name} className="Challenge">
                                        <div className="challengeHeader">
                                            <h4 className="challengeTitle" onClick={() => setDisplay(challenge.dashedName)}>{challenge.name + " (" + challenge.subChallenges.length + ")"}</h4>
                                            <Link to={`/challenges/${(superBlock.name).toLowerCase().replaceAll(" ", "-")}/${challenge.dashedName}`}>
                                                (Go To Page)
                                        </Link>
                                        </div>
                                        <div id={challenge.dashedName} style={{ display: "none" }}>
                                            {challenge.subChallenges.map(subChallenge => (
                                                <Link to={`/challenges/${(superBlock.name).toLowerCase().replaceAll(" ", "-")}/${challenge.dashedName}/${subChallenge.dashedName}`} >
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
            }
        </>
    )
}

export default Challenges
