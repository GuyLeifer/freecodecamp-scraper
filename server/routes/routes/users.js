const express = require('express');
const router = express.Router();

const scraper = require('../../scraper')
const users = require('../../users')

router.get('/', async (req, res) => {
    const fcc = await scraper(users);
    res.send(fcc);
})
router.get('/:userId', async (req, res) => {
    const user = [req.params.userId];
    const fcc = await scraper(user);
    res.send(fcc);
})

module.exports = router;