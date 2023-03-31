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
  GraphQLScalarType,
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
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          'SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;'
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
        criteria: { type: GraphQLNonNull(SpecificQueryArgumentsType) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          `SELECT * FROM pg_stat_statements WHERE query LIKE '%${args.criteria}%' ORDER BY mean_exec_time;`
        );
        return data.rows;
      },
    },
    median: {
      type: GraphQLFloat,
      description: 'Median time',
      args: {
        criteria: { type: GraphQLNonNull(SpecificQueryArgumentsType) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          `SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements WHERE query LIKE '%${args.criteria}%';`
        );
        return data.rows[0].median;
      },
    },
    mean: {
      type: GraphQLFloat,
      description: 'Average query time',
      args: {
        criteria: { type: GraphQLNonNull(SpecificQueryArgumentsType) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          `SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements WHERE query LIKE '%${args.criteria}%';`
        );
        return data.rows[0].averagequerytime;
      },
    },
    slowestQueries: {
      type: new GraphQLList(pgStatStatementsRow),
      description: 'Slowest query data',
      args: {
        criteria: { type: GraphQLNonNull(SpecificQueryArgumentsType) },
      },
      resolve: async (obj, args, context) => {
        const data = await context.db.query(
          `SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%${args.criteria}%' ORDER BY mean_exec_time DESC LIMIT 10;`
        );
        return data.rows;
      },
    },
  }),
});

const SpecificQueryArgumentsType = new GraphQLEnumType({
  name: 'SpecificQueryArguments',
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
        const queryString = 'CREATE EXTENSION IF NOT EXISTS pg_stat_statements';
        const response = await context.db.query(queryString);
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
