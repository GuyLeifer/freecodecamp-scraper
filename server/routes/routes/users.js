const express = require('express');
const router = express.Router();

const axios = require('axios')
const fs = require('fs');

const scraper = require('../../scraper')

const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

router.get('/', async (req, res) => {
    const query = datastore.createQuery('User');
    const [allUsers] = await datastore.runQuery(query)
    const users = allUsers.map(user => user.name)
    const fcc = await scraper(users);
    const byDate = fcc.map(user => ({ username: user.username, progress: user.progress.sort((a, b) => a.completedDate - b.completedDate) }))
    res.send(byDate);
})
router.get('/:userId', async (req, res) => {
    const user = [req.params.userId];
    const fcc = await scraper(user);
    res.send(fcc);
})

router.put('/add-user/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const myProfile = await fetchUserProfile(username);
        if (!myProfile) {
            res.send("No Such User")
        } else {
            const public = (myProfile || {}).profileUI ? isFullyPublic(myProfile) : false;
            if (!public || !myProfile) {
                res.send("Not a Public Profile");
            } else {
                const query = datastore.createQuery('User');
                const [allUsers] = await datastore.runQuery(query)
                const users = allUsers.map(user => user.name)
                if (users.find(user => user === username)) {
                    console.log(11)
                    res.send("User Already Exists");
                } else {
                    const user = await insertUser({ name: username })
                    res.send(user)
                }
            }
        }
    } catch (err) {
        res.send(err)
    }
})

router.put('/delete-user/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const userKey = datastore.key(['User', name = username])
        await datastore.delete(userKey)
        res.send(userKey)
    } catch (err) {
        res.status(202).send(err.message)
    }
})

async function fetchUserProfile(username) {
    const { data } = await axios.get(`https://api.freecodecamp.org/api/users/get-public-profile?username=${username}`);
    if (!data || !data.entities) {
        return false;
    }
    return data.entities.user[data.result];
}

function isFullyPublic(profile) {
    const { isLocked, showAbout, showCerts, showHeatMap, showLocation, showName, showPoints, showPortfolio, showTimeLine } = profile.profileUI;
    return !isLocked && showAbout && showCerts && showHeatMap && showLocation && showName && showPoints && showPortfolio && showTimeLine;
}

const insertUser = async (data) => {
    const Key = datastore.key(['User', data.name])
    return datastore.save({
        key: Key,
        data: data,
    });
};

module.exports = router;