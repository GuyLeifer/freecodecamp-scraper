import React, { useState, useEffect} from 'react';
import './Users.css';

import axios from 'axios';
import { Link } from 'react-router-dom';


function Users() {

    const [challengesByUser, setChallengesByUser] = useState([]);

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get('/fcc/users');
            setChallengesByUser(data);
            console.log(data)
        })()
    }, [])

    const setDisplay = (user) => {
        if (document.getElementById(user).style.display === 'none') {
            document.getElementById(user).style.display = 'block'
        } else {
            document.getElementById(user).style.display = 'none'
        }
    }

    return (
        <div>
            {challengesByUser.map(user => (
                <div className="userProgressesDiv">
                    <div className="username" onClick={() => setDisplay(user.username)}>{user.username}</div>
                    <div id={user.username} className="userProgresses" style={{display: "none"}}>
                        {user.progress.map(progress => 
                            <div className="progress">
                                <div className="progressDate progressDiv">
                                    {new Date(progress.completedDate).toLocaleString()}
                                </div>
                                <div className="progressDiv">
                                    <Link to={`name/${progress.name}`}>
                                        <span className="progressName">{progress.name}</span>
                                    </Link>
                                </div>
                                <div className="progressDiv">
                                    <Link to={`block-name/${progress.blockName}`} >
                                        <div className="progressBlockName">{progress.blockName}</div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Users
