import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLEnumType,
} from 'graphql';

import { Pool } from 'pg';

const pgStatStatementsRow = new GraphQLObjectType({
  name: 'pgStatStatementsRow',
  description: 'This represents a row from pg_stat_statements',
  fields: () => ({
    userid: { type: GraphQLNonNull(GraphQLInt) },
    dbid: { type: GraphQLNonNull(GraphQLInt) },
    toplevel: { type: GraphQLNonNull(GraphQLBoolean) },
    queryid: { type: GraphQLNonNull(GraphQLString) },
    query: { type: GraphQLNonNull(GraphQLString) },
    plans: { type: GraphQLNonNull(GraphQLString) },
    total_plan_time: { type: GraphQLNonNull(GraphQLFloat) },
    min_plan_time: { type: GraphQLNonNull(GraphQLFloat) },
    max_plan_time: { type: GraphQLNonNull(GraphQLFloat) },
    mean_plan_time: { type: GraphQLNonNull(GraphQLFloat) },
    stddev_plan_time: { type: GraphQLNonNull(GraphQLFloat) },
    calls: { type: GraphQLNonNull(GraphQLString) },
    total_exec_time: { type: GraphQLNonNull(GraphQLFloat) },
    min_exec_time: { type: GraphQLNonNull(GraphQLFloat) },
    max_exec_time: { type: GraphQLNonNull(GraphQLFloat) },
    mean_exec_time: { type: GraphQLNonNull(GraphQLFloat) },
    stddev_exec_time: { type: GraphQLNonNull(GraphQLFloat) },
    rows: { type: GraphQLNonNull(GraphQLString) },
    shared_blks_hit: { type: GraphQLNonNull(GraphQLString) },
    shared_blks_read: { type: GraphQLNonNull(GraphQLString) },
    shared_blks_dirtied: { type: GraphQLNonNull(GraphQLString) },
    shared_blks_written: { type: GraphQLNonNull(GraphQLString) },
    local_blks_hit: { type: GraphQLNonNull(GraphQLString) },
    local_blks_read: { type: GraphQLNonNull(GraphQLString) },
    local_blks_dirtied: { type: GraphQLNonNull(GraphQLString) },
    local_blks_written: { type: GraphQLNonNull(GraphQLString) },
    temp_blks_read: { type: GraphQLNonNull(GraphQLString) },
    temp_blks_written: { type: GraphQLNonNull(GraphQLString) },
    blk_read_time: { type: GraphQLNonNull(GraphQLInt) },
    blk_write_time: { type: GraphQLNonNull(GraphQLInt) },
    wal_records: { type: GraphQLNonNull(GraphQLString) },
    wal_fpi: { type: GraphQLNonNull(GraphQLString) },
    wal_bytes: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const pgStatDatabaseRow = new GraphQLObjectType({
  name: 'pgStatDatabaseRow',
  description: 'This represents a row from pg_stat_database',
  fields: () => ({
    datid: { type: GraphQLInt },
    datname: { type: GraphQLString },
    numbackends: { type: GraphQLInt },
    xact_commit: { type: GraphQLInt },
    xact_rollback: { type: GraphQLInt },
    blks_read: { type: GraphQLInt },
    blks_hit: { type: GraphQLInt },
    tup_returned: { type: GraphQLInt },
    tup_fetched: { type: GraphQLInt },
    tup_inserted: { type: GraphQLInt },
    tup_updated: { type: GraphQLInt },
    tup_deleted: { type: GraphQLInt },
    conflicts: { type: GraphQLInt },
    temp_files: { type: GraphQLInt },
    temp_bytes: { type: GraphQLInt },
    deadlocks: { type: GraphQLInt },
    checksum_failures: { type: GraphQLInt },
    checksum_last_failure: { type: GraphQLString },
    blk_read_time: { type: GraphQLFloat },
    blk_write_time: { type: GraphQLFloat },
    session_time: { type: GraphQLFloat },
    active_time: { type: GraphQLFloat },
    idle_in_transaction_time: { type: GraphQLFloat },
    sessions: { type: GraphQLInt },
    sessions_abandoned: { type: GraphQLInt },
    sessions_fatal: { type: GraphQLInt },
    sessions_killed: { type: GraphQLInt },
    stats_reset: { type: GraphQLString },
  }),
});

const pgStatActivityRow = new GraphQLObjectType({
  name: 'pgStatActivityRow',
  description: 'This represents a row from pg_stat_activity',
  fields: () => ({
    heap_read: { type: GraphQLInt },
    heap_hit: { type: GraphQLInt },
    ratio: { type: GraphQLFloat },
  }),
});

const AllQueriesType = new GraphQLObjectType({
  name: 'AllQueries',
  description: 'All query data',
  fields: () => ({
    all: {
      type: new GraphQLList(pgStatStatementsRow),
      description: 'All query data',
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements ORDER BY mean_exec_time;'
        );
        return data.rows;
      },
    },
    median: {
      type: GraphQLFloat,
      description: 'Median time',
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements;'
        );
        return data.rows[0].median;
      },
    },
    mean: {
      type: GraphQLFloat,
      description: 'Average query time',
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements;'
        );
        return data.rows[0].averagequerytime;
      },
    },
    slowestQueries: {
      type: new GraphQLList(pgStatStatementsRow),
      description: 'Slowest query data',
      args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT $1;',
          [args.limit]
        );
        return data.rows;
      },
    },
  }),
});

const SpecificQueriesType = new GraphQLObjectType({
  name: 'SpecificQueries',
  description: 'Specific query data',
  fields: () => ({
    all: {
      type: new GraphQLList(pgStatStatementsRow),
      description: 'All query data',
      args: {
        criteria: { type: GraphQLNonNull(SpecificArgumentsType) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements WHERE query LIKE $1 ORDER BY mean_exec_time;',
          [`%${args.criteria}%`]
        );
        return data.rows;
      },
    },
    median: {
      type: GraphQLFloat,
      description: 'Median time',
      args: {
        criteria: { type: GraphQLNonNull(SpecificArgumentsType) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements WHERE query LIKE $1;',
          [`%${args.criteria}%`]
        );
        return data.rows[0].median;
      },
    },
    mean: {
      type: GraphQLFloat,
      description: 'Average query time',
      args: {
        criteria: { type: GraphQLNonNull(SpecificArgumentsType) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements WHERE query LIKE $1;',
          [`%${args.criteria}%`]
        );
        return data.rows[0].averagequerytime;
      },
    },
    slowestQueries: {
      type: new GraphQLList(pgStatStatementsRow),
      description: 'Slowest query data',
      args: {
        criteria: { type: GraphQLNonNull(SpecificArgumentsType) },
        limit: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements WHERE query LIKE $1 ORDER BY mean_exec_time DESC LIMIT $2;',
          [`%${args.criteria}%`, args.limit]
        );
        return data.rows;
      },
    },
  }),
});

const SpecificArgumentsType = new GraphQLEnumType({
  name: 'SpecificArgumentsType',
  values: {
    SELECT: { value: 'SELECT' },
    INSERT: { value: 'INSERT' },
    UPDATE: { value: 'UPDATE' },
    DELETE: { value: 'DELETE' },
  },
});

const DatabaseQueryType = new GraphQLObjectType({
  name: 'DatabaseQuery',
  description: 'Metrics from database of interest',
  fields: () => ({
    allQueries: {
      type: AllQueriesType,
      description: 'All query data',
      resolve: () => {
        return AllQueriesType;
      },
    },
    specificQueries: {
      type: SpecificQueriesType,
      description: 'Specifc query data',
      resolve: () => {
        return SpecificQueriesType;
      },
    },
    numberOfRows: {
      type: new GraphQLList(pgStatStatementsRow),
      description:
        'Returns list of queries that touch a number rows of greater than provided value',
      args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements WHERE rows > $1;',
          [args.limit]
        );
        return data.rows;
      },
    },
    topAllCalls: {
      type: new GraphQLList(pgStatStatementsRow),
      description: 'Returns list of top queries',
      args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements ORDER BY calls DESC LIMIT $1;',
          [args.limit]
        );
        return data.rows;
      },
    },
    topSpecificCalls: {
      type: new GraphQLList(pgStatStatementsRow),
      description: 'Returns list of top queries',
      args: {
        criteria: { type: SpecificArgumentsType },
        limit: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements WHERE query LIKE $1 ORDER BY calls DESC LIMIT $2;',
          [`%${args.criteria}%`, args.limit]
        );
        return data.rows;
      },
    },
    dbStats: {
      type: pgStatDatabaseRow,
      description: 'Returns information from pg_stat_database',
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_database WHERE datname=$1;',
          [context.databaseName]
        );
        return data.rows[0];
      },
    },
    cacheHitRatio: {
      type: pgStatActivityRow,
      description: 'Returns information from pg_stat_activity',
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT sum(heap_blks_read) AS heap_read, sum(heap_blks_hit) AS heap_hit, sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS ratio FROM pg_statio_user_tables;'
        );
        return data.rows[0];
      },
    },
    statActivity: {
      type: GraphQLInt,
      description: 'Returns number of active sessions',
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          "SELECT * FROM pg_stat_activity WHERE datname = $1 and state = 'active';",
          [context.databaseName]
        );
        return data.rowCount;
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    database: {
      type: DatabaseQueryType,
      description: 'Connect to database',
      args: {
        uri: { type: GraphQLString },
      },
      resolve: async (obj, args, context) => {
        const pool = new Pool({
          connectionString: args.uri,
        });
        const db = {
          query: (text: string, params?: Array<string>) => {
            return pool.query(text, params);
          },
        };
        context.db = db;
        const databaseName =
          args.uri.split('.com/')[1] ||
          args.uri.split('5432/').pop().split('/')[0].replace(/\s/g, '');
        context.databaseName = databaseName;

        await context.db.query(
          'CREATE EXTENSION IF NOT EXISTS pg_stat_statements'
        );

        return DatabaseQueryType;
      },
    },
  }),
});

const DatabaseMutationType = new GraphQLObjectType({
  name: 'DatabaseMutation',
  description: 'Mutations to database of interest',
  fields: () => ({
    createExtension: {
      type: GraphQLString,
      description: 'Create extensions in users database if not already present',
      resolve: async (obj, args, context) => {
        const response = await context.db.query(
          'CREATE EXTENSION IF NOT EXISTS pg_stat_statements'
        );
        if (response) return 'Success';
        else return 'Failed';
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    database: {
      type: DatabaseMutationType,
      description: 'Connect to database',
      args: {
        uri: { type: GraphQLString },
      },
      resolve: (obj, args, context) => {
        const pool = new Pool({
          connectionString: args.uri,
        });
        const db = {
          query: (text: string, params?: Array<string>) => {
            return pool.query(text, params);
          },
        };
        context.db = db;
        return DatabaseMutationType;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

export default schema;
