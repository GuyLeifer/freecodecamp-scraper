const express = require('express');
const router = express.Router();

const scraper = require('../scraper')

let users = ["guyleifer", "nitzo"]


// const fcc = scraper(users);

router.use('/dashboard', require('./routes/dashboard'))
router.use('/users', require('./routes/users'))
router.use('/challenges', require('./routes/challenges'))
router.use('/search', require('./routes/search'))


router.get('/by-block-name', async (req, res) => {
    try {
        const fcc = await scraper(users);
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
        res.send(challengesByBlockName);
    } catch (err) {
        console.log(err.message);
    }
})
router.get('/by-name', async (req, res) => {
    try {
        const fcc = await scraper(users);
        let names = [];
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
        res.send(challengesByName);
    } catch (err) {
        console.log(err.message);
    }
})
router.get('/by-date', async (req, res) => {
    try {
        const fcc = await scraper(users);
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
        res.send(challengesByDate);
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;