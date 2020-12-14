import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';
// icons
import freeCodeCampIcon from './images/freeCodeCampIcon.png';

function Header() {
    return (
        <div>
            <header className="Header">
                <h1>FreeCodeCamp</h1>
                <Link to="/about">          
                    <img className="freeCodeCampIcon" src ={freeCodeCampIcon} alt="freeCodeCamp Icon"/>
                </Link> 
                <h1>Scraper</h1>
            </header>
        </div>
    )
}

export default Header
