import React from 'react';
import './About.css';

//icons
import freeCodeCampImage from './images/freeCodeCampImage.png';

function About() {
    return (
        <div className="about">
            {/* <img className="aboutImg" src={youtubeIcon} alt="About"/> */}
            <p>You absolutely ask yourself what the hell is this site,</p>
            <p>OK, </p>
            <p>You'll Just about to get your answer.</p>
            <img className="freeCodeCampImage" src={freeCodeCampImage} alt="Free Code Camp"/>
            <p>This Site is a Management Tool of the Free Code Camp users</p>
            <p>The home page includes charts with information, and the users page includes all the users and the challenges they have been completed</p>
            <p>Every User has a page, contains the details ............</p>
            <p>Enjoy the Experience of the site!</p>
        </div>
    )
}

export default About