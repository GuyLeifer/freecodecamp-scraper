const axios = require('axios');

module.exports = async (usernames) => {
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
            // console.log(Object.keys(challengeMap).map(challengeKey => `${challengeKey}||${challengeMap[challengeKey].name}||${challengeMap[challengeKey].counter}`).join('\n'))
        }
        return cache;
    }
    const allChallenges = await fetchAllChallenges();
    
    async function fetchUserProfile(username) {
        const { data } = await axios.get(`https://api.freecodecamp.org/api/users/get-public-profile?username=${username}`);
        if (!data || !data.entities) {
            console.log('bad request', username, data)
            return false;
        }
        // console.log(data.entities.user[data.result])
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
        };
    }
    
    async function getUserProgress(username) {
        const myProfile = await fetchUserProfile(username);
        const public = (myProfile || {}).profileUI ? isFullyPublic(myProfile) : false;
        if (!public || !myProfile) {
            console.log("Not a public profile", username);
            return;
        }

        const completedChallengeWithNames = myProfile.completedChallenges.map(challenge=>addChallengeName(allChallenges, challenge));
        // console.log(completedChallengeWithNames.map(challenge=> new Date(challenge.completedDate)))
        return completedChallengeWithNames;
    }

    function chunks(array, size) {
        return Array.apply(0,{length: Math.ceil(array.length / size)}).map((_, index) => array.slice(index*size, (index+1)*size))
    }
    const usersChunks = chunks(usernames, 10);

    let progresses = [];
    for (const chunk of usersChunks) {
        const promises = chunk.map(async username => ({username, progress: await getUserProgress(username)}));
        newProgresses = await Promise.all(promises);
        progresses = progresses.concat(newProgresses.filter(obj => obj.progress));
    }

    for (let i = 0; i < progresses.length; i++) {
        for (let j = i + 1; j < progresses[j].length; j++) {
            if (progresses[i].progress.name === progresses[i].progress.name) progress[j].repetition = true;
        }
    }
    

    // const lastDateUpdated = 
    date = new Date(lastDateUpdated || '2020-06-01')
    while (date <= new Date()) {

        progresses.forEach(async(progress) => {
            await axios.post('/??', {
                username: progress.username,
                date: date.toISOString().split('T')[0],
                challenges: progress.progress.filter(obj => new Date(obj.completedDate).toISOString().split('T')[0] === date.toISOString().split('T')[0]),
                repetition: progress.repetition
            })
        })
        
        date.setDate(date.getDate() + 1)
    }
    
    return progresses;
}
