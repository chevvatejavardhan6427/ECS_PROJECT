import { useCallback, useEffect, useState } from 'react';

export const useRealtimeFeed = (fetcher, dependencies = [], interval = 20000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const run = useCallback(async () => {
    try {
      setError('');
      const next = await fetcher();
      setData(next);
    } catch (err) {
      setError(err.message || 'Unable to refresh data.');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    setLoading(true);
    run();

    // Polling keeps location-aware data fresh without requiring websocket infrastructure.
    const timer = window.setInterval(run, interval);
    return () => window.clearInterval(timer);
  }, [interval, run]);

  return { data, loading, error, refresh: run };
};
