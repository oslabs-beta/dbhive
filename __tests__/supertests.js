// eslint-disable-next-line @typescript-eslint/no-var-requires
const supertest = require('supertest');
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { describe, it, expect, xdescribe, test } from '@jest/globals';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('pg');

//Notice: dbtest_url is not a valid url and should be replaced with test db
const dbtest_url = process.env.TEST_DB;
const server = 'http://localhost:3000';
const pool = new pg.Pool({
  connectionString: dbtest_url,
});

//testing the test config and setup
describe('my test', () => {
  //test will pass
  test('passes', () => {
    expect(2).toEqual(2);
  });
  //test will fail
  test('fails', () => {
    expect(3).not.toEqual(2);
  });
});

describe('Connecting a database', () => {
  describe('connecting with a valid URI key', () => {
    it('responds without an error property', () => {
      const body = {
        query: `
        {
          database(uri: "${dbtest_url}") {
            statActivity
          }
        }          
        `,
      };
      return supertest(server)
        .post('/graphql')
        .send(body)
        .expect(200)
        .expect((res) => {
          expect(res.body.errors).not.toBeTruthy();
        });
    });
  });

  describe('connecting with an invalid URI key', () => {
    it('responds with an error property', () => {
      const body = {
        query: `
        {
          database(uri: "invalidUri") {
            statActivity
          }
        }          
        `,
      };
      return supertest(server)
        .post('/graphql')
        .send(body)
        .expect(200)
        .expect((res) => {
          expect(res.body.errors).toBeTruthy();
        });
    });
  });
});

describe('Database data retrieval', () => {
  describe('connecting a valid URI key', () => {
    //the response contains the keys that will be needed to render data
    it('responds with data in the expected keys', () => {
      const body = {
        query: `
        {
          database(uri: "${dbtest_url}") {
            allQueries{
              all{
                query
                mean_exec_time
              }
              median
              mean
              slowestQueries(limit:10){
                query
                mean_exec_time
              }
            }
            selectQueries: specificQueries {
              all(criteria: SELECT){
                query
                mean_exec_time
              }
              median(criteria: SELECT)
              mean(criteria: SELECT)
              slowestQueries(criteria: SELECT, limit: 10) {
                query
                mean_exec_time
              }
            }
            insertQueries: specificQueries {
              all(criteria: INSERT){
                query
                mean_exec_time
              }
              median(criteria: INSERT)
              mean(criteria: INSERT)
              slowestQueries(criteria: INSERT, limit: 10) {
                query
                mean_exec_time
              }
            }
            updateQueries: specificQueries {
              all(criteria: UPDATE){
                query
                mean_exec_time
              }
              median(criteria: UPDATE)
              mean(criteria: UPDATE)
              slowestQueries(criteria: UPDATE, limit: 10) {
                query
                mean_exec_time
              }
            }
            deleteQueries: specificQueries {
              all(criteria: DELETE){
                query
                mean_exec_time
              }
              median(criteria: DELETE)
              mean(criteria: DELETE)
              slowestQueries(criteria: DELETE, limit: 10) {
                query
                mean_exec_time
              }
            }
            topAllCalls(limit:5){
                query
                mean_exec_time
            }
            topSelectCalls: topSpecificCalls(criteria:SELECT,limit:5){
                query
                mean_exec_time
            }
            topInsertCalls: topSpecificCalls(criteria:INSERT,limit:5){
                query
                mean_exec_time
            }
            topUpdateCalls: topSpecificCalls(criteria:UPDATE,limit:5){
                query
                mean_exec_time
            }
            topDeleteCalls: topSpecificCalls(criteria:DELETE,limit:5){
                query
                mean_exec_time
            }
            dbStats{
              datid
              datname
              conflicts
              deadlocks
              xact_rollback
              xact_commit
              blks_read
              blks_hit
              blk_read_time
              blk_write_time
              checksum_failures
            }
            cacheHitRatio{
              ratio
            }
            statActivity
          }
        }          
        `,
      };
      return supertest(server)
        .post('/graphql')
        .send(body)
        .expect(200)
        .expect((res) => {
          // shape of data
          expect(res.body.data).toBeDefined();
          expect(res.body.data.database).toBeDefined();
          expect(res.body.data.database.allQueries).toBeDefined();
          expect(res.body.data.database.selectQueries).toBeDefined();
          expect(res.body.data.database.insertQueries).toBeDefined();
          expect(res.body.data.database.updateQueries).toBeDefined();
          expect(res.body.data.database.deleteQueries).toBeDefined();
          expect(res.body.data.database.topAllCalls).toBeDefined();
          expect(res.body.data.database.topSelectCalls).toBeDefined();
          expect(res.body.data.database.topInsertCalls).toBeDefined();
          expect(res.body.data.database.topUpdateCalls).toBeDefined();
          expect(res.body.data.database.topDeleteCalls).toBeDefined();
          expect(res.body.data.database.dbStats).toBeDefined();
          expect(res.body.data.database.cacheHitRatio).toBeDefined();
          expect(res.body.data.database.statActivity).toBeDefined();
        })
        .expect((res) => {
          // content of data
          expect(res.body.data.database.allQueries.all[0].query).toBeDefined();
          expect(
            res.body.data.database.allQueries.all[0].mean_exec_time
          ).toBeDefined();
          expect(res.body.data.database.allQueries.median).toBeDefined();
          expect(res.body.data.database.allQueries.mean).toBeDefined();
          expect(
            res.body.data.database.allQueries.slowestQueries[0].query
          ).toBeDefined();
          expect(
            res.body.data.database.allQueries.slowestQueries[0].mean_exec_time
          ).toBeDefined();
          expect(
            res.body.data.database.selectQueries.all[0].query
          ).toBeDefined();
          expect(
            res.body.data.database.selectQueries.all[0].mean_exec_time
          ).toBeDefined();
          expect(res.body.data.database.selectQueries.median).toBeDefined();
          expect(res.body.data.database.selectQueries.mean).toBeDefined();
          expect(
            res.body.data.database.selectQueries.slowestQueries[0].query
          ).toBeDefined();
          expect(
            res.body.data.database.selectQueries.slowestQueries[0]
              .mean_exec_time
          ).toBeDefined();
          expect(res.body.data.database.topAllCalls[0].query).toBeDefined();
          expect(
            res.body.data.database.topAllCalls[0].mean_exec_time
          ).toBeDefined();
          expect(res.body.data.database.topSelectCalls[0].query).toBeDefined();
          expect(
            res.body.data.database.topSelectCalls[0].mean_exec_time
          ).toBeDefined();
          expect(res.body.data.database.dbStats.datid).toBeDefined();
          expect(res.body.data.database.dbStats.datname).toBeDefined();
          expect(res.body.data.database.dbStats.conflicts).toBeDefined();
          expect(res.body.data.database.dbStats.deadlocks).toBeDefined();
          expect(res.body.data.database.dbStats.xact_rollback).toBeDefined();
          expect(res.body.data.database.dbStats.xact_commit).toBeDefined();
          expect(res.body.data.database.dbStats.blks_read).toBeDefined();
          expect(res.body.data.database.dbStats.blks_hit).toBeDefined();
          expect(res.body.data.database.dbStats.blk_read_time).toBeDefined();
          expect(res.body.data.database.dbStats.blk_write_time).toBeDefined();
          expect(
            res.body.data.database.dbStats.checksum_failures
          ).toBeDefined();
          expect(res.body.data.database.cacheHitRatio.ratio).toBeDefined();
        });
    });
  });
});
