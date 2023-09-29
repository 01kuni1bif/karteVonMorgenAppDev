import { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

export const useMapBounds = () => {
    const [northEast, setNorthEast] = useState({ lat: null, lng: null });
    const [southWest, setSouthWest] = useState({ lat: null, lng: null });
    const map = useMapEvents({
        moveend: () => {
            const bounds = map.getBounds();
            setNorthEast(bounds.getNorthEast());
            setSouthWest(bounds.getSouthWest());
        },
    });

    return { northEast, southWest };
};
