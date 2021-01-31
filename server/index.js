const app = require('./app');

const port = process.env.PORT || 8002;

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})


