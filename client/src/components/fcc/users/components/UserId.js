import React, { useState, useEffect } from 'react';
import './UserId.css';

import axios from 'axios';
import { Link } from 'react-router-dom';

function UserId({ match }) {
    
    const userId = match.params.userId;
    
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get(`/fcc/users/${userId}`);
            console.log(data[0]);
            setUser(data[0]);
        })()
    }, [])

    return (
        <>
        {user.hasOwnProperty('username') &&
            <div>
                <h2>User Name: {user.username}</h2>
                <div>  
                    {user.progress.map(progress => 
                        <div className="progress">
                            <div className="progressDate progressDiv">
                                {new Date(progress.completedDate).toLocaleString()}
                            </div>
                            <div className="progressDiv progressSuperBlockName">
                                <Link to={`/challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}`} >
                                    <div className="SuperBlockName">{progress.superBlock}</div>
                                </Link>
                            </div>
                            <div className="progressDiv progressBlockName">
                                <Link to={`/challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}/${progress.block}`} >
                                    <div className="BlockName">{progress.blockName}</div>
                                </Link>
                            </div>
                            <div className="progressDiv progressName">
                                <Link to={`/challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}/${progress.block}/${progress.name}`}>
                                    <span className="Name">{progress.name}</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>         
            </div>
            }  
        </>       
    )
}

export default UserId
