// react-query custom hooks
import { useQuery } from 'react-query';

// custom hook to fetch metrics from the backend and handle state
export function useQueryMetrics(key: string[], uri: string, interval: number) {
  const { isLoading, isError, data } = useQuery(
    key,
    async () => {
      const res = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          {
            database(uri: "postgres://postgres:dozier1818@dbhive.ckgii0y0xfut.us-west-2.rds.amazonaws.com/postgres") {
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
              statActivity
            }
          }
          
          `,
        }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const response = await res.json();
      return response.data.database;
    },
    { refetchInterval: interval, refetchIntervalInBackground: true }
  );
  return { isLoading, isError, data };
}
