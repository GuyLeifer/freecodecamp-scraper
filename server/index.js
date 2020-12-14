// const mainFunc = require('./scraper');
// // const { getUsers, updateResults } = require('./g-sheet');

// (async function main() {
//   // const users = await getUsers();
//   let users = ["guyleifer", "guyguyguyguy"]
//   const result = await mainFunc(users);
//   // console.table(result);
//   // console.table(result[0].progress.map(({completedDate, name}) => ({date: new Date(completedDate), name})));
//   // await updateResults(users, result)
// })();

const app = require('./app');
const scraper = require('./scraper');

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})


