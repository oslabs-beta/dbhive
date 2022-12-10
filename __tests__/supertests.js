// eslint-disable-next-line @typescript-eslint/no-var-requires
const supertest = require('supertest');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { describe, it, beforeAll, expect, xdescribe, test } = require('@jest/globals');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('pg');
//TODO: this is hardcoded and will need to be removed
const dbtest_url = 'postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres'
const server = 'http://localhost:3000';
const pool = new pg.Pool({
  connectionString: dbtest_url,
});

//TODO: DELETE
//testing the test config and setup
// describe('my test', () => {
//   //test will pass
//   test('passes', () =>{
//     expect(2).toEqual(2)
//   })
//   //test will fail
//   test('fails', () => {
//     expect(3).toEqual(2)
//   })
// })

describe('Database connection functionality', () => {
  describe('connecting a valid URI key', () => {
    //a valid response would be an object containing lots of data to be rendered
    it('responds with a valid response', () => {
      const body = {
        //TODO: replace it with client test DB
        uri: 'postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres'
    };
    return supertest(server)
      .post('/api/querytimes')
      .send(body)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(typeof res).toEqual('object')
      });
    })
  })
  describe('connecting an invalid URI key', () => {
    //an invalid key results in a bad request error
    it('responds with an error', () => {
      const body = {
        uri: 'postgres://xxxx:xxxxx@xxxxx.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres'
      };
      return supertest(server)
        .post('/api/querytimes')
        .send(body)
        .expect(400)
    })
  })
});

