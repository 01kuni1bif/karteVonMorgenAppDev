// useMapBounds.tsx
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

export const useMapBounds = () => {
  const [southWest, setSouthWest] = useState<{ lat: number | null, lng: number | null }>
    ({ lat: null, lng: null });
  const [northEast, setNorthEast] = useState<{ lat: number | null, lng: number | null }>
    ({ lat: null, lng: null });
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      setSouthWest(bounds.getSouthWest());
      setNorthEast(bounds.getNorthEast());
    },
  });

  return { southWest, northEast };
};
