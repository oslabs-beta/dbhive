// react-query custom hooks
import { useQuery } from 'react-query';

// custom hook to fetch metrics from the backend and handle state
export function useQueryMetrics(key: string[], uri: string, interval: number) {
  const { isLoading, isError, data } = useQuery(
    key,
    async () => {
      const res = await fetch('/api/queryMetrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ uri: uri }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
    { refetchInterval: interval, refetchIntervalInBackground: true }
  );
  return { isLoading, isError, data };
}
