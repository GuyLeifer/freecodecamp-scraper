const express = require('express');
const router = express.Router();

const scraper = require('../scraper')

let users = ["guyleifer", "nitzo"]


router.get('/users', async (req, res) => {
    const fcc = await scraper(users);
    res.send(fcc);
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