import {Pool} from 'pg';

const PG_URI = 'postgres://nOObs:testallcaps@dbhive.cxjwyi85ug6q.us-east-1.rds.amazonaws.com/postgres'

const pool = new Pool({
    connectionString: PG_URI,
})

const db = {
    query: (text, params?, callback?) =>  {
        return pool.query(text, params, callback);
    }
}

export default db;