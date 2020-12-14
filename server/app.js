const express = require('express');

const app = express();

app.use(express.json());

app.use('/fcc', require('./routes/fccRoute'))


app.get('/', (req, res) => {
    res.send('You entered to the Server Port!')
});


module.exports = app;