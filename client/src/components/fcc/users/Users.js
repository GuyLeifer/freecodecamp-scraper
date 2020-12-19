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
            <h2>All Users ({challengesByUser.length})</h2>
            {challengesByUser.map(user => (
                <div className="userProgressesDiv">
                    <div className="username" onClick={() => setDisplay(user.username)}>{user.username}</div>
                    <div id={user.username} className="userProgresses" style={{display: "none"}}>
                        {user.progress.map(progress => 
                            <div className="progress">
                                <div className="progressDate progressDiv">
                                    {new Date(progress.completedDate).toLocaleString()}
                                </div>
                                <div className="progressDiv progressSuperBlockName">
                                    <Link to={`challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}`} >
                                        <div className="SuperBlockName">{progress.superBlock}</div>
                                    </Link>
                                </div>
                                <div className="progressDiv progressBlockName">
                                    <Link to={`challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}/${progress.block}`} >
                                        <div className="BlockName">{progress.blockName}</div>
                                    </Link>
                                </div>
                                <div className="progressDiv progressName">
                                    <Link to={`challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}/${progress.block}/${progress.name}`}>
                                        <span className="Name">{progress.name}</span>
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
