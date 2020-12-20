const axios = require('axios');

const scraper = async (usernames) => {
    let cache = null;
    const challengeMap = {};
    async function fetchAllChallenges() {
        if (cache == null) {
            const { data: pageData } = await axios.get("https://www.freecodecamp.org/page-data/learn/page-data.json");
            cache = pageData.result.data.allChallengeNode.edges;
            cache.forEach(({ node: challenge }) => {
                if (!challengeMap.hasOwnProperty(challenge.block)) {
                    challengeMap[challenge.block] = { counter: 0, name: challenge.fields.blockName };
                }
                challengeMap[challenge.block].counter += 1;
            })
        }
        return cache;
    }
    const allChallenges = await fetchAllChallenges();
    
    async function fetchUserProfile(username) {
        const { data } = await axios.get(`https://api.freecodecamp.org/api/users/get-public-profile?username=${username}`);
        if (!data || !data.entities) {
            // console.log('bad request', username, data)
            return false;
        }
        return data.entities.user[data.result];
    }
    
    function isFullyPublic(profile) {
        const {isLocked, showAbout, showCerts, showHeatMap, showLocation, showName, showPoints, showPortfolio, showTimeLine} = profile.profileUI;
        return !isLocked && showAbout && showCerts && showHeatMap && showLocation && showName && showPoints && showPortfolio && showTimeLine;
    }
    
    function addChallengeName(allChallenges, challenge) {
        const challengeNode = allChallenges.find(x=>x.node.id === challenge.id);
        return {
            ...challenge,
            name: challengeNode.node.dashedName,
            blockName: challengeNode.node.fields.blockName,
            block: challengeNode.node.block,
            superBlock:  challengeNode.node.superBlock
        };
    }
    
    async function getUserProgress(username) {
        const myProfile = await fetchUserProfile(username);
        const public = (myProfile || {}).profileUI ? isFullyPublic(myProfile) : false;
        if (!public || !myProfile) {
            // console.log("Not a public profile", username);
            return;
        }

        const completedChallengeWithNames = myProfile.completedChallenges.map(challenge => addChallengeName(allChallenges, challenge));
        return completedChallengeWithNames;
    }

    function chunks(array, size) {
        return Array.apply(0,{length: Math.ceil(array.length / size)}).map((_, index) => array.slice(index * size, (index + 1) * size))
    }
    const usersChunks = chunks(usernames, 10);

    let progresses = [];
    for (const chunk of usersChunks) {
        const promises = chunk.map(async username => ({ username, progress: await getUserProgress(username) }));
        newProgresses = await Promise.all(promises);
        progresses = progresses.concat(newProgresses.filter(obj => obj.progress));
    }

    for (let i = 0; i < progresses.length; i++) {
        for (let j = 0; j < progresses[i].progress.length; j++) {
            for (let k = 0; k < j; k++) {
                if (progresses[i].progress[k].name === progresses[i].progress[j].name) {
                    progress[j].progress.repetition = true;
                    break;
                }  
            } 
        }
    }
    
    let date = new Date('2020-06-01')
    while (date <= new Date()) {

        progresses.forEach((user) => {
            try {
                username = user.username,
                dateS = date.toISOString().split('T')[0],
                challenges = user.progress.filter(obj => new Date(obj.completedDate).toISOString().split('T')[0] === date.toISOString().split('T')[0]),
                repetition = user.progress.repetition
            } catch (err) {
                console.log(err.message)
            }
        })

        
        date.setDate(date.getDate() + 1)
    }
    
    return progresses;
}

module.exports = scraper;