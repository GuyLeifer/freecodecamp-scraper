const express = require('express');
const router = express.Router();
const axios = require('axios');

const scraper = require('../../scraper')
const users = require('../../users')

let cache = null;
    const challengeMap = {};
    async function fetchAllChallenges() {
        if (cache == null) {
            const { data: pageData } = await axios.get("https://www.freecodecamp.org/page-data/learn/page-data.json");
            cache = pageData.result.data.allChallengeNode.edges;
            cache.forEach(({ node: challenge }) => {
                if (!challengeMap.hasOwnProperty(challenge.block)) {
                    challengeMap[challenge.block] = { name: challenge.fields.blockName, subChallenges: [{ name: challenge.title, dashedName: challenge.dashedName }] };
                } else {
                    challengeMap[challenge.block].subChallenges.push({ name: challenge.title, dashedName: challenge.dashedName });
                }
            })
        }
        return challengeMap;
        // return cache;
    }

router.get('/all-challenges', async (req, res) => {
    const fcc = await scraper(users);
    const allChallenges = await fetchAllChallenges();
    res.send(allChallenges);
})

module.exports = router;