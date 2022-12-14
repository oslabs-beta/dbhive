import { UserData } from './clientTypes';

/*
toggleDashboardAuth default = true, use for production
toggleDashboardAuth = false, deactivates dashboard page authorization 
  allowing navigation to the page without having to be logged in
*/
const toggleDashboardAuth = true;

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
*/

const seedDBs: UserData['dbs'] = [];

export { toggleDashboardAuth, seedDBs };
