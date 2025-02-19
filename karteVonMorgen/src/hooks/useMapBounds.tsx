// useMapBounds.tsx
import { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

export const useMapBounds = () => {
  const [southWest, setSouthWest] = useState<{ lat: number | null, lng: number | null }>
    ({ lat: null, lng: null });
  const [northEast, setNorthEast] = useState<{ lat: number | null, lng: number | null }>
    ({ lat: null, lng: null });
  const [mapLoaded, setMapLoaded] = useState(false);
  const map = useMapEvents({
    moveend: () => {
      if (mapLoaded) {
        const bounds = map.getBounds();
        setSouthWest(bounds.getSouthWest());
        setNorthEast(bounds.getNorthEast());
      }
    },
  });

  useEffect(() => {
    map.whenReady(() => {
      setMapLoaded(true);
    });
  }, [map]);

  return { southWest, northEast };
};
