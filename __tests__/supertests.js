// eslint-disable-next-line @typescript-eslint/no-var-requires
const supertest = require('supertest');
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { describe, it, expect, xdescribe, test} from'@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('pg');


//TODO: this is hardcoded and will need to be removed
const dbtest_url = 'postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres'
const server = 'http://localhost:3000';
const pool = new pg.Pool({
  connectionString: dbtest_url,
});

//testing the test config and setup
xdescribe('my test', () => {
  //test will pass
  test('passes', () =>{
    expect(2).toEqual(2)
  })
  //test will fail
  test('fails', () => {
    expect(3).toEqual(2)
  })
})

describe('Connecting a database', () => {
  describe('connecting a URI key', () => {
    it('responds with a true valid URI key value', () =>{
      const body = {
        uri: dbtest_url
      };
      return supertest(server)
        .post('/api/uri')
        .send(body)
        .expect(200)
        .expect((res) => {
          expect(res.body.result.validURI).toBeTruthy()
        })
    })
  })
})


describe('Database data retrieval', () => {
  describe('connecting a valid URI key', () => {
    //a valid response would be an object containing lots of data to be rendered
    it('responds with a valid response', () => {
      const body = {
        //TODO: replace it with client test DB
        uri: dbtest_url
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
    //the response contains the keys that will be needed to render data
    it('responds with data in the expected keys', () => {
      const body = {
        uri: dbtest_url
      };
      return supertest(server)
        .post('/api/querytimes')
        .send(body)
        .expect((res) => {
          expect(res.body.allTimes).toBeTruthy()
          expect(res.body.avgTimeTopAllCalls).toBeTruthy()
          expect(res.body.avgTimeTopDeleteCalls).toBeTruthy()
          expect(res.body.avgTimeTopInsertCalls).toBeTruthy()
          expect(res.body.avgTimeTopSelectCalls).toBeTruthy()
          expect(res.body.avgTimeTopUpdateCalls).toBeTruthy()
          expect(res.body.conflicts).toBeTruthy()
          expect(res.body.dbStats).toBeTruthy()
          expect(res.body.deadlocks).toBeTruthy()
          expect(res.body.deleteTimes).toBeTruthy()
          expect(res.body.insertTimes).toBeTruthy()
          expect(res.body.numOfRows).toBeTruthy()
          expect(res.body.rolledBackTransactions).toBeTruthy()
          expect(res.body.selectTimes).toBeTruthy()
          expect(res.body.transactionsCommitted).toBeTruthy()
          expect(res.body.updateTimes).toBeTruthy()
          expect(res.body.cacheHitRatio).toBeTruthy()
        })
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



