/* eslint-disable no-undef */
//TODO: look into error running globalTeardown (Katie referenced this is a little more time consuming)
module.exports = async (globalConfig) => {
  console.log('Closing down test db')
  testServer.close();
};