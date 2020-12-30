import React, { useState, useEffect } from 'react';
import './UserId.css';

import Challenges from './Challenges';
import deleteIcon from '../images/deleteIcon.png';

import axios from 'axios';
import { Link } from 'react-router-dom';

function UserId({ match }) {
    
    const userId = match.params.userId;
    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const { data }  = await axios.get(`/fcc/users/${userId}`);
            console.log(data[0])
            setUser(data[0]);
            setLoading(false)
        })()
    }, [])

    const deleteUser = async () => {
        const { data } = await axios.put(`/fcc/users/delete-user/${userId}`);
        if (data) window.location.assign('/');
    }

    return (
        <>
            { loading ?
                <h2>Loading ...</h2>
            :
            user.hasOwnProperty('username') &&
                <div>
                    <div className="headerDiv">
                        <h2>User Name: {user.username}</h2>
                        <h3>Challenges Completed: {user.progress.length}</h3>
                        <div className="deleteDiv">
                            <img className="deletePlaylistIcon" src={deleteIcon} alt="Delete Playlist" onClick={() => deleteUser()}/>
                        </div>
                    </div>
                    <div>  
                        <Challenges progresses={user.progress} />                    
                    </div>       
                </div>
                }  
        </>       
    )
}

export default UserId
