const express = require('express');
const router = express.Router();

const axios = require('axios')
const fs = require('fs');

const scraper = require('../../scraper')
const { users } = require('../../users')

router.get('/', async (req, res) => {
    console.log(users)
    const fcc = await scraper(users);
    res.send(fcc);
})
router.get('/:userId', async (req, res) => {
    const user = [req.params.userId];
    const fcc = await scraper(user);
    res.send(fcc);
})

router.put('/add-user/:username', async (req, res) => {
    const { username } = req.params;
    const myProfile = await fetchUserProfile(username);
    if (!myProfile) {
        res.send("No Such User")
    } else {
        const public = (myProfile || {}).profileUI ? isFullyPublic(myProfile) : false;
        if (!public || !myProfile) {
            res.send("Not a Public Profile");
        } else {
            fs.readFile('users.json', 'utf-8', function(err, data){
                if (err) throw err;
                let usersArr = JSON.parse(data).users
                if (usersArr.find(user => user === username)) {
                    res.send("User Already Exists");
                } else {
                    usersArr.push(username);
                    usersArr = usersArr.sort();
                    const newValue = `{ "users": [${usersArr.map(user => `\"${user}\"`)}] }`;
            
                    fs.writeFile('users.json', newValue, 'utf-8', function (err) {
                        if (err) throw err;
                        res.send(usersArr);
                    });
                }
            });
        }
    }
})

router.put('/delete-user/:username', async (req, res) => {
    const { username } = req.params;
    fs.readFile('users.json', 'utf-8', function(err, data){
        if (err) throw err;
        let usersArr = JSON.parse(data).users
        usersArr = usersArr.filter(user => user !== username);
        const newValue = `{ "users": [${usersArr.map(user => `\"${user}\"`)}] }`;

        fs.writeFile('users.json', newValue, 'utf-8', function (err) {
            if (err) throw err;
            res.send(usersArr);
        });
    });
})

async function fetchUserProfile(username) {
    const { data } = await axios.get(`https://api.freecodecamp.org/api/users/get-public-profile?username=${username}`);
    if (!data || !data.entities) {
        return false;
    }
    return data.entities.user[data.result];
}

function isFullyPublic(profile) {
    const {isLocked, showAbout, showCerts, showHeatMap, showLocation, showName, showPoints, showPortfolio, showTimeLine} = profile.profileUI;
    return !isLocked && showAbout && showCerts && showHeatMap && showLocation && showName && showPoints && showPortfolio && showTimeLine;
}

module.exports = router;