import React, { useState } from 'react';
import './Searchbar.css';
import axios from 'axios';

// icons
import searchIcon from './images/searchIcon.png';
import userIcon from './images/userIcon.png';
import challengesIcon from '../images/chellengesIcon.png';

function Searchbar() {

    const [options, setOptions] = useState([]);

    const changeHandler = async (e) => {
        if (e.target.value === "") {
            setOptions([])
        } else {
            try {
                const { data } = await axios.get(`/fcc/search/${e.target.value}`);
                if(data) {
                    setOptions(data);
                } else {
                    setOptions([])
                }
                }
                catch(err) {
                    console.log(err.message);
                }
        }
    }

    const goToUser = (id) => {
        const link = `/users/${id}`;
        window.location.href = link;
    }
    const goToSuperChallenge = (id) => {
        const link = `/challenges/${id.toLowerCase().replaceAll(' ', '-')}`;
        window.location.href = link;
    }
    const goToChallenge = (id, superChallenge) => {
        const link = `/challenges/${superChallenge.toLowerCase().replaceAll(' ', '-')}/${id}`;
        window.location.href = link;
    }
    const goToSubChallenge = (id, superChallenge, challenge) => {
        const link = `/challenges/${superChallenge.toLowerCase().replaceAll(' ', '-')}/${challenge}/${id}`;
        window.location.href = link;
    }

    return (
        <div className="searchContainer">
            <img className="search-icon" src={searchIcon} alt="search"/>
            <input 
                id="search"
                type="search" 
                placeholder="Search"
                onChange={(e) => changeHandler(e)}
            />
            <div className="optionsSearch">
            {options.length > 0 && (
                options.map((arr, index) => 
                    index === 0 ? 
                        arr.map(user => (
                            <div 
                            className={"optionLink"} 
                            onClick={() => goToUser(user)}
                            >
                                <div className="optionName">{user}...</div>
                                <div className="optionIconDiv">
                                <img className="optionIcon" src={userIcon} alt="User Icon" />
                                </div>
                            </div>
                        ))
                    : index === 1 ? 
                        arr.map(superChallenge => (
                            <div 
                            className={"optionLink"} 
                            onClick={() => goToSuperChallenge(superChallenge)}
                            >
                                <div className="optionName">{superChallenge}...</div>
                                <div className="optionIconDiv">
                                <img className="optionIcon" src={challengesIcon} alt="Super Challenge Icon" />
                                </div>
                            </div> 
                        ))
                    : index === 2 ? 
                        arr.map(child => (
                            <div 
                            className={"optionLink"} 
                            onClick={() => goToChallenge(child.dashedName, child.superChallenge)}
                            >
                                <div className="optionName">{child.name}...</div>
                                <div className="optionIconDiv">
                                <img className="optionIcon" src={challengesIcon} alt="Challenge Icon" />
                                </div>
                            </div>         
                        ))
                    : 
                        arr.map(child => (
                            <div 
                            className={"optionLink"} 
                            onClick={() => goToSubChallenge(child.dashedName, child.superChallenge, child.challenge)}
                            >
                                <div className="optionName">{child.name}...</div>
                                <div className="optionIconDiv">
                                <img className="optionIcon" src={challengesIcon} alt="Sub Challenge Icon" />
                                </div>
                            </div>         
                        ))
                )
            )}
            </div>
        </div> 
    )
}

export default Searchbar