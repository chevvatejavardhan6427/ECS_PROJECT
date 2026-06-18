import { useCallback, useEffect, useState } from 'react';
import { defaultCenter } from '../data/mockData';

export const useGeoLocation = () => {
  const [coords, setCoords] = useState(defaultCenter);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setError('');
        setLoading(false);
      },
      () => {
        setError('Location permission denied. Showing approximate city-level results.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { coords, loading, error, requestLocation };
};
