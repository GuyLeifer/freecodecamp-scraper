const express = require('express');
const router = express.Router();

const { fetchSuperChallenges, fetchAllChallenges, fetchSuperChallenge, fetchChallenge, fetchSubChallenge } = require('./functions');

router.get('/', async (req, res) => {
    const allSuperChallenges = await fetchSuperChallenges();
    res.send(allSuperChallenges);
})

router.get('/all-challenges', async (req, res) => {
    const allChallenges = await fetchAllChallenges();
    res.send(allChallenges);
})

router.get('/super-challenge/:superChallengeId', async (req, res) => {
    const superChallengeId = req.params.superChallengeId;
    // console.log(superChallengeId)
    const challenge = await fetchSuperChallenge(superChallengeId);
    res.send(challenge);
})
router.get('/:challengeId', async (req, res) => {
    const challengeId = req.params.challengeId;
    // const fcc = await scraper(users);
    const challenge = await fetchChallenge(challengeId);
    res.send(challenge);
})
router.get('/sub-challenge/:subChallengeId', async (req, res) => {
    const subChallengeId = req.params.subChallengeId;
    // const fcc = await scraper(users);
    const subChallenge = await fetchSubChallenge(subChallengeId);
    res.send(subChallenge);
})

module.exports = router;