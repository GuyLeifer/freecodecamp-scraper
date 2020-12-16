const express = require('express');
const router = express.Router();
const axios = require('axios');

const scraper = require('../../scraper')
const users = require('../../users')

async function fetchSuperChallenges() {
    const challengeMap = [];
    const { data: pageData } = await axios.get("https://www.freecodecamp.org/page-data/learn/page-data.json");
    let cache = pageData.result.data.allChallengeNode.edges;
    cache.forEach(({ node: challenge }) => {
        if (!(challengeMap.find(superBlock => superBlock.name === challenge.superBlock))) {
            challengeMap.push( 
                {  
                    name: challenge.superBlock,
                    challenges: [
                        {
                        name: challenge.fields.blockName,
                        dashedName: challenge.block,
                        subChallenges: [
                            { 
                                name: challenge.title, 
                                dashedName: challenge.dashedName 
                            }
                        ] 
                        }
                    ], 
                    
                }
            )
        } else {
            challengeMap.forEach((superBlock) => {
                const find = superBlock.challenges.findIndex(block => block.name === challenge.fields.blockName);
                if (find !== -1) {
                    if (!(superBlock.challenges[find].subChallenges.find(subChallenge => subChallenge.name === challenge.title))) {
                        superBlock.challenges[find].subChallenges.push(
                            {
                                name: challenge.title, 
                                dashedName: challenge.dashedName
                            }
                        )
                    }
                } else {
                    superBlock.challenges.push(
                        {
                            name: challenge.fields.blockName,
                            dashedName: challenge.block,
                            subChallenges: [
                                { 
                                    name: challenge.title, 
                                    dashedName: challenge.dashedName 
                                }
                            ]
                        }
                    )           
                }
            })
        }
    })
    return challengeMap;
}

async function fetchAllChallenges() {
    const challengeMap = {};
    const { data: pageData } = await axios.get("https://www.freecodecamp.org/page-data/learn/page-data.json");
    let cache = pageData.result.data.allChallengeNode.edges;
    cache.forEach(({ node: challenge }) => {
        console.log(challenge)
        if (!challengeMap.hasOwnProperty(challenge.block)) {
            challengeMap[challenge.block] = { name: challenge.fields.blockName, superBlock: challenge.superBlock, subChallenges: [{ name: challenge.title, dashedName: challenge.dashedName }] };
        } else {
            challengeMap[challenge.block].subChallenges.push({ name: challenge.title, dashedName: challenge.dashedName });
        }
    })
    return challengeMap;
    // return cache;
}

async function fetchChallenge(challengeId) {
    const fcc = await scraper(users);
    const challengeMap = [];
    const { data: pageData } = await axios.get("https://www.freecodecamp.org/page-data/learn/page-data.json");
    let cache = pageData.result.data.allChallengeNode.edges;
    cache.forEach(async ({ node: challenge }) => {
        if (challenge.block === challengeId) {
            challengeMap.push(
                {
                    name: challenge.fields.blockName,
                    superBlock: challenge.superBlock,
                    subChallenge: {
                        name: challenge.title, 
                        dashedName: challenge.dashedName 
                    }                
                }
            )
        } 
    })
    let started = [];
    let completed = [];
    let counter = users.map(user => ({user: user, count: 0}));
    fcc.forEach(user => {
        if(user.progress.find(challenge => challenge.block === challengeId)) {
            started.push(user.username);
        }
    })
    fcc.forEach((user, index) => {
        user.progress.forEach(challenge => {
            if(challenge.block === challengeId) {
                counter[index].count++
            }
        })
    })
    counter.forEach((user, index) => {
        if(user.count === challengeMap.length) completed.push(user.user)
    })

    return [challengeMap, completed, started]
}

async function fetchSubChallenge(subChallengeId) {
    const fcc = await scraper(users);
    let challengeMap;
    const { data: pageData } = await axios.get("https://www.freecodecamp.org/page-data/learn/page-data.json");
    let cache = pageData.result.data.allChallengeNode.edges;
    cache.forEach(async ({ node: challenge }) => {
        if (challenge.dashedName === subChallengeId) {
            challengeMap =
                {
                    name: challenge.title, 
                    dashedName: challenge.dashedName,             
                    challenge: {
                        name: challenge.fields.blockName,
                        dashedName: challenge.block,
                        superBlock: challenge.superBlock
                    },
                }
        } 
    })
    let completed = [];
    fcc.forEach((user, index) => {
        if(user.progress.find(challenge => challenge.name === subChallengeId)) completed.push(user.username)
    })

    return [challengeMap, completed]
}

router.get('/', async (req, res) => {
    const allSuperChallenges = await fetchSuperChallenges();
    res.send(allSuperChallenges);
})

router.get('/all-challenges', async (req, res) => {
    const allChallenges = await fetchAllChallenges();
    res.send(allChallenges);
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