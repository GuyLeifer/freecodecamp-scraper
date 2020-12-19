const express = require('express');
const router = express.Router();

const { fetchSuperChallenges } = require('./functions');
const { users } = require('../../users')

router.get('/:word', async (req, res) => {
    const { word } = req.params;
    if (word === "") {
        res.send([])
    } else {
        const allChallenges = await fetchSuperChallenges();
        const superChallenges = allChallenges.filter(superChallenge => 
            superChallenge.name.toLowerCase().includes(word.toLowerCase())
        ).map(superChallenge => superChallenge.name);
        
        let challenges = [];
        allChallenges.forEach(superChallenge => (
            superChallenge.challenges.forEach(challenge => {
                if(challenge.name.toLowerCase().includes(word.toLowerCase())) {
                    challenges.push(
                        {
                            name: challenge.name,
                            dashedName: challenge.dashedName,
                            superChallenge: superChallenge.name,
                        }
                    )
                }
            })
        ))

        let subChallenges = [];
        allChallenges.forEach(superChallenge => (
            superChallenge.challenges.forEach(challenge => {
                challenge.subChallenges.forEach(subChallenge => {
                    if(subChallenge.name.toLowerCase().includes(word.toLowerCase())) {
                        subChallenges.push(
                            {
                                name: subChallenge.name,
                                dashedName: subChallenge.dashedName,
                                superChallenge: superChallenge.name,
                                challenge: challenge.dashedName
                            }
                        )
                    }
                })
            })
        ))
        
        const usersSearch = users.filter(user => user.includes(word.toLowerCase()))
        // res.send(subChallenges)
        res.send([usersSearch.slice(0,3), superChallenges.slice(0,3), challenges.slice(0,3), subChallenges.slice(0,3)]);
    }
})

module.exports = router;