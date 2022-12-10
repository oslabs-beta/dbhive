import { UserData } from './clientTypes';

/*
toggleDashboardAuth default = true, ex. production mode
toggleDashboardAuth = false for streamlined development within dashboard
*/
export const toggleDashboardAuth = false;

/*
seedDBs default = [], ex. production mode
Seed db data for streamlined development [
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
