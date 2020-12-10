const { GoogleSpreadsheet } = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('<INSERT_HERE_SHEET_ID>');


const headerValues = ['timestamp', 'user', 'test_id', 'test_name', 'status', 'errors', 'repo_link'];

const loadInfo = async () => {

};

const getUsers = async (req, res) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo();
  const usersSheet = doc.sheetsByIndex.find(sheet => sheet.title === 'users');
  const rows = await usersSheet.getRows();
  const users = rows.map(row => row.username);
  return users
};


const updateResults = async (usernames, results) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo();
  const resultsSheet = doc.sheetsByIndex.find(sheet => sheet.title === 'results');
  const rows = await resultsSheet.getRows();

  console.log(typeof results)
  const rowsToAdd = [];
  for (const result of results) {
    const userLastTests = rows.filter(lastTest => result.username === lastTest.user);
    const lastTestsMap = userLastTests.reduce((map, test) => ({
      ...map,
      [test.test_id]: test,
    }), {})
    for (const test of result.progress) {
      const userLastTest = lastTestsMap[test.id];
      if (!userLastTest) {
        rowsToAdd.push({
          user: result.username,
          test_id: test.id,
          test_name: test.name,
          block: test.block,
          completed_at: new Date(test.completedDate),
          solution: test.solution
        })
        continue;
      }
    }

  }
  await resultsSheet.addRows(rowsToAdd);
  return true;
}


module.exports = {
  getUsers,
  updateResults
}