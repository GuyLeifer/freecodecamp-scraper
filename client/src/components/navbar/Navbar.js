import React, { useState } from 'react';
import './Navbar.css';

import { Link } from "react-router-dom";
import Searchbar from './search/Searchbar';
import AddUser from './user/AddUser';

// icons
import homeIcon from './images/homeIcon.png';
import usersIcon from './images/usersIcon.png';
import chellengesIcon from './images/chellengesIcon.png';
import plusIcon from './images/plusIcon.png';
import aboutIcon from './images/aboutIcon.jpg';
import accountIcon from './images/accountIcon.jpg';

import { useAuth } from "../firebaseAuth/contexts/AuthContext";
import { auth, storage } from '../firebaseAuth/firebase';

function Navbar() {

    const [authIcon, setAuthIcon] = useState(accountIcon);
    const [addUser, setAddUser] = useState(false);

    const { currentUser } = useAuth();
    let uid = null;
    let photoUrl = null;
    
    if (currentUser != null) {
        photoUrl = currentUser.photoURL;
        uid = currentUser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    }
    storage.ref().child(`users/${uid}/profile`).getDownloadURL().then(function(url) {
        setAuthIcon(url)
    }).catch(function(error) {
        if(photoUrl) setAuthIcon(photoUrl)
    });

    auth.onAuthStateChanged(function(user) {
        if(!user) setAuthIcon(accountIcon)
    })

    return (
        <div className="Navbar">
            <div className="homeLink">
                <Link to="/">
                    <img className="navIcon" src={homeIcon} alt="Home" />
                </Link>
            </div>
            <div className="postsLink">
                <Link to="/users">
                    <img className="navIcon" src={usersIcon} alt="Posts" />
                </Link>
            </div>
            <div className="challengesLink">
                <Link to="/challenges">
                    <img className="navIcon" src={chellengesIcon} alt="Challenges" />
                </Link>
            </div>
            <div className="addUserLink">
                <img className="navIcon" src={plusIcon} alt="Add User" onClick={() => setAddUser(prev => !prev)}/>
                <AddUser modalIsOpen={addUser} setModalIsOpen={setAddUser}/>
            </div>
            {currentUser && <Searchbar />}     
            <div className="aboutLink">
                <Link to="/about">
                    <img className="navIcon" src={aboutIcon} alt="About" />
                </Link>
            </div>
            <div className="accountLink">
                <Link to="/profile">
                    <img className="navIcon" src={authIcon} alt="Account" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
