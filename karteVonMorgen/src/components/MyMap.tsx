// MyMap.tsx
import React, { useEffect, useState } from 'react';
import { useIonViewDidEnter } from '@ionic/react';
import { useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useMapBounds } from '../hooks/useMapBounds';
import { useEntries } from '../hooks/useEntries';
import { useEvents } from '../hooks/useEvents';
import MapMarker from './MapMarker';

interface MyMapProps {
  setBbox: (bbox: string | null) => void,
  data: any,
  eventData: any,
  selectedCategories: string[],
  mapCenter: LatLngExpression,
  mapZoom: number,
}

const MyMap: React.FC<MyMapProps> = ({
  setBbox, data, eventData, selectedCategories, mapCenter, mapZoom }) => {
  const map = useMap();
  const { southWest, northEast } = useMapBounds();
  const [selectedId, setSelectedId] = useState("");
  const selectedEntryData = useEntries(selectedId);
  const selectedEventData = useEvents(null, null, null, null, selectedId);

  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });

  const handleMarkerClick = (item: any) => {
    setSelectedId(item.id);
  };

  useEffect(() => {
    map.setView(mapCenter, mapZoom);
  }, [mapCenter, mapZoom, map]);

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100)
  }, [map])

  useEffect(() => {
    if (southWest && southWest.lat !== null && southWest.lng !== null && northEast &&
      northEast.lat !== null && northEast.lng !== null) {
      // Ensure latitudes are between -90 and 90
      const swLat = Math.max(-90, Math.min(90, southWest.lat));
      const neLat = Math.max(-90, Math.min(90, northEast.lat));

      // Normalize longitudes to be between -180 and 180
      const swLng = ((southWest.lng + 180) % 360 + 360) % 360 - 180;
      const neLng = ((northEast.lng + 180) % 360 + 360) % 360 - 180;

      const newBbox = `${swLat.toFixed(2)},${swLng.toFixed(2)},${neLat.toFixed(2)},${neLng.toFixed(2)}`;
      setBbox(newBbox);
    }
  }, [southWest, northEast]);

  return (
    <React.Fragment>
      {data && data.map((item: { lat: number; lng: number; id: string; categories: string[] },
        index: React.Key | null | undefined) => {
        if (selectedCategories.length > 0 && !selectedCategories.some(category =>
          item.categories.includes(category))) {
          return null; // Skip this item if its category is not selected
        }
        let iconUrl = '/assets/images/icons8-marker-48-yellow.png';
        if (item.categories.includes('2cd00bebec0c48ba9db761da48678134')) { // Check if the categories array includes the category ID for initiatives
          iconUrl = '/assets/images/icons8-marker-48-lightgreen.png';
        } else if (item.categories.includes('77b3c33a92554bcf8e8c2c86cedd6f6f')) { // Check if the categories array includes the category ID for companies
          iconUrl = '/assets/images/icons8-marker-48-blue.png';
        }
        return (
          <MapMarker key={index} position={[item.lat, item.lng]} onClick={() =>
            handleMarkerClick(item)} data={selectedEntryData} iconUrl={iconUrl} />
        );
      })}
      {(selectedCategories.length === 0 || selectedCategories.includes('events')) && eventData &&
        eventData.map((item: { lat: number; lng: number; id: string },
          index: React.Key | null | undefined) => {
          let iconUrl = '/assets/images/icons8-marker-48.png';
          return (
            <MapMarker key={index} position={[item.lat, item.lng]} onClick={() =>
              handleMarkerClick(item)} data={selectedEventData} iconUrl={iconUrl} />
          );
        })}
    </React.Fragment>
  );
};

export default MyMap;
