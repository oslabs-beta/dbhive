import { UserData } from './clientTypes';

/*
toggleDashboardAuth default = true, use for production
toggleDashboardAuth = false, deactivates dashboard page authorization 
  allowing navigation to the page without having to be logged in
*/
export const toggleDashboardAuth = false;

/*
seedDBs default = [], use for production
Seed db data so that developers do not have to login to see data displayed on the dashboard
  below is the format for seedDBs:
    [
      {
        nickname: 'dbNickname',
        uri: 'postgres://username:passsord@hostname:5432/databaseName',
      },
    ]

ex.
    [
      {
        nickname: 'dbTest',
        uri: 'postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres',
      },
      {
        nickname: 'dbTest2',
        uri: 'postgres://n00bs:testallcaps@dbhive.cxjwyi85ug6q.us-east-1.rds.amazonaws.com:5432/postgres',
      },
      {
        nickname: 'subify',
        uri: 'postgres://avpneekp:5fsMVQDkJ7HCwrlILZCF7UhKklrdJ1OI@heffalump.db.elephantsql.com/avpneekp',
      },
    ]
*/

export const seedDBs: UserData['dbs'] = [
  {
    nickname: 'dbTest',
    uri: 'postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres',
  },
  {
    nickname: 'dbTest2',
    uri: 'postgres://n00bs:testallcaps@dbhive.cxjwyi85ug6q.us-east-1.rds.amazonaws.com:5432/postgres',
  },
  {
    nickname: 'subify',
    uri: 'postgres://avpneekp:5fsMVQDkJ7HCwrlILZCF7UhKklrdJ1OI@heffalump.db.elephantsql.com/avpneekp',
  },
];
