/* eslint-disable no-undef */
module.exports = async (globalConfig) => {
  console.log('Closing down test db');
  testServer.close();
};
