//spin up rds instance (if no charge) add to read me how to run tests on client db
// eslint-disable-next-line @typescript-eslint/no-var-requires
const regeneratorRuntime = require('regenerator-runtime');

module.exports = () => {
  console.log('Test db setup');
  global.testServer = require('../server/server.ts');
};