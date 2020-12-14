const express = require('express');
const router = express.Router();

const scraper = require('../scraper')

let users = ["guyleifer"]

const fcc = scraper(users);

router.get('/', (req, res) => {
    res.send(fcc);
})

module.exports = router;