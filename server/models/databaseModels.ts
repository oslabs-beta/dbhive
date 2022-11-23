import {Pool} from 'pg';

const PG_URI = 'postgres://n00bs:testallcaps@dbhive.cxjwyi85ug6q.us-east-1.rds.amazonaws.com:5432/postgres'

const pool = new Pool({
    connectionString: PG_URI,
})

const db = {
    query: (text : string, params? : Array<string>) =>  {
        return pool.query(text, params);
    }
}

export default db;