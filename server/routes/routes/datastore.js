const { Router } = require('express');
const router = Router();

const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/', (req, res) => {
    try {
        const data = { name: 'nitzo' }
        insertData(data, 'User')
        res.send('saved')
    } catch (err) {
        console.log(err.message)
        res.send(err.message)
    }
})

module.exports = router;

const insertData = async (data, key) => {
    const Key = datastore.key([key, data.name])
    return datastore.save({
        key: Key,
        data: data,
    });
};
