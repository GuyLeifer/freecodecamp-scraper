const express = require('express');
const router = express.Router();

const scraper = require('../../scraper')
const users = require('../../users')

router.get('/', async (req, res) => {
    const fcc = await scraper(users);
    // by block name
    try {
    let names = [];
        fcc.forEach(user => {
            user.progress.forEach(challenge => {
                const name = challenge.blockName;
                names.push(name)
            })
        })
        names = names.sort();
        let challengesByBlockName = [];
        names.forEach(name => {
            const index = challengesByBlockName.findIndex(challenge => challenge.name === name)
            if (index === -1) {               
                challengesByBlockName.push(
                    {
                        name: name,
                        count: 1
                    }
                )
            } else {
                challengesByBlockName[index].count++;
            }
        })
        challengesByBlockName.sort((a, b) => b.count - a.count)

        // by name
        names = [];
        fcc.forEach(user => {
            user.progress.forEach(challenge => {
                const name = challenge.name;
                names.push(name)
            })
        })
        names = names.sort();
        let challengesByName = [];
        names.forEach(name => {
            const index = challengesByName.findIndex(challenge => challenge.name === name)
            if (index === -1) {               
                challengesByName.push(
                    {
                        name: name,
                        count: 1
                    }
                )
            } else {
                challengesByName[index].count++;
            }
        })
        challengesByName.sort((a, b) => b.count - a.count)

        //by date
        let dates = [];
        fcc.forEach(user => {
            user.progress.forEach(challenge => {
                const date = new Date(challenge.completedDate).toISOString();
                dates.push(date)
            })
        })
        dates = dates.sort().map(date => new Date(date).toISOString().split('T')[0]);
        let challengesByDate = [];
        dates.forEach(date => {
            const index = challengesByDate.findIndex(challenge => challenge.date === date)
            if (index === -1) {               
                challengesByDate.push(
                    {
                        date: date,
                        count: 1
                    }
                )
            } else {
                challengesByDate[index].count++;
            }
        })

        const usersCount = fcc.map(user => (
            {
                username: user.username,
                count: user.progress.length
            }
        )).sort((a, b) => b.count - a.count);

        res.send([challengesByBlockName, challengesByName, challengesByDate, usersCount]);
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;