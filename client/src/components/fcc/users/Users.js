import React, { useState, useEffect} from 'react';
import './Users.css';

import deleteIcon from './images/deleteIcon.png'

import axios from 'axios';
import { Link } from 'react-router-dom';


function Users() {

    const [challengesByUser, setChallengesByUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get('/fcc/users');
            setChallengesByUser(data);
            setLoading(false)
        })()
    }, [])

    const setDisplay = (user) => {
        if (document.getElementById(user).style.display === 'none') {
            document.getElementById(user).style.display = 'block'
        } else {
            document.getElementById(user).style.display = 'none'
        }
    }

    const deleteUser = async (username) => {
        const { data } = await axios.put(`/fcc/users/delete-user/${username}`);
        if (data) window.location.assign('/users');
    }

    return (
        <>
            { loading ?
                <h2>Loading ...</h2>
            :
            <div>
                <h2>All Users ({challengesByUser.length})</h2>
                {challengesByUser.map(user => (
                    <div className="userProgressesDiv">
                        <div className="headerDiv">
                            <h2 className="username" onClick={() => setDisplay(user.username)}>User Name: {user.username}</h2>
                            <h3 className="challengeCompleted" onClick={() => setDisplay(user.username)}>Challenges Completed: {user.progress.length}</h3>
                            <div className="deleteDiv">
                                <img className="deletePlaylistIcon" src={deleteIcon} alt="Delete Playlist" onClick={() => deleteUser(user.username)}/>
                            </div>          
                        </div>
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
            }
        </>
    )
}

export default Users
