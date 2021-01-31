const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use('/fcc', require('./routes/fccRoute'))

app.use(express.static(path.join(__dirname, 'build',)))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


module.exports = app;