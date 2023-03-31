import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType()
class QueryData {
  @Field()
  query: string;

  @Field()
  mean_exec_time: number;
}

@ObjectType()
class QuerySummary {
  @Field((type) => [QueryData])
  all: QueryData[];

  @Field()
  median: number;

  @Field()
  mean: number;

  @Field((type) => [QueryData])
  slowestQueries: QueryData[];
}

@ObjectType()
class Metrics {
  @Field((type) => QuerySummary)
  allTimes: QuerySummary;
}

export default Metrics;
