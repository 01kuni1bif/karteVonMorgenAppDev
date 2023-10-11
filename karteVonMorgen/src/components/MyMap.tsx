// MyMap.tsx
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useMapBounds } from '../hooks/useMapBounds';
import MapMarker from './MapMarker';
import { useIonViewDidEnter } from '@ionic/react';
import { useEntries } from '../hooks/useEntries';
import { LatLngExpression } from 'leaflet';
import { useEvents } from '../hooks/useEvents';

const MyMap: React.FC<{
  setBbox: (bbox: string | null) => void,
  data: any,
  eventData: any,
  selectedCategories: string[],
  mapCenter: LatLngExpression, // Add this line
  mapZoom: number, // Add this line
}> = ({ setBbox, data, eventData, selectedCategories, mapCenter, mapZoom }) => {

  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });



  const map = useMap();
  const { southWest, northEast } = useMapBounds();
  const [selectedId, setSelectedId] = useState("");
  const [isEvent, setIsEvent] = useState(false);



  const handleMarkerClick = (item: any) => {
    setSelectedId(item.id);
    console.log(selectedId);


  };
  /* const handleIsEvent = (isEvent: boolean) => {
    setIsEvent(isEvent);
  } */

  const selectedEntryData = useEntries(selectedId);
  
  const selectedEventData = useEvents(null,null,null,null,selectedId);

  console.log(selectedEventData);
  
  /* const selectedEntryData = useEntries(selectedEntryId); */

  /* useEffect(() => {
    if (selectedEventId) {
      setSelectedEntryData(useEvents(null,null,null,null,selectedEventId));
      // Hier können Sie den Code ausführen, der ausgeführt werden soll,
      // wenn sich selectedEventId ändert.
      // Dieser Effekt wird nur ausgeführt, wenn selectedEventId vorhanden ist.
      // Beispiel: fetchData(selectedEventId);
    }
  }, [selectedEventId]);
  
  useEffect(() => {
    if (selectedEntryId) {
      setSelectedEntryData(useEntries(selectedEntryData));
      // Hier können Sie den Code ausführen, der ausgeführt werden soll,
      // wenn sich selectedEntryId ändert.
      // Dieser Effekt wird nur ausgeführt, wenn selectedEntryId vorhanden ist.
      // Beispiel: fetchData(selectedEntryId);
    }
  }, [selectedEntryId]); */


  /* if(Array.isArray(selectedEntryData) && selectedEntryData.length === 0 || selectedEntryData === null ){
    console.log("im in");
    selectedEntryData = useEvents(null,null,null,null,selectedEntryId);
    console.log(selectedEntryData);
  } */


  useEffect(() => {
    map.setView(mapCenter, mapZoom);
  }, [mapCenter, mapZoom, map]);

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100)
  }, [map])

  useEffect(() => {
    if (southWest && southWest.lat !== null && southWest.lng !== null && northEast && northEast.lat !== null && northEast.lng !== null) {
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
      {data && data.map((item: { lat: number; lng: number; id: string; categories: string[] }, index: React.Key | null | undefined) => {
        if (selectedCategories.length > 0 && !selectedCategories.some(category => item.categories.includes(category))) {
          return null; // Skip this item if its category is not selected
        }
        let iconUrl = '/assets/images/icons8-marker-48-yellow.png'; // Default marker
        if (item.categories.includes('2cd00bebec0c48ba9db761da48678134')) { // Check if the categories array includes the category ID for initiatives
          iconUrl = '/assets/images/icons8-marker-48-lightgreen.png';
        } else if (item.categories.includes('77b3c33a92554bcf8e8c2c86cedd6f6f')) { // Check if the categories array includes the category ID for companies
          iconUrl = '/assets/images/icons8-marker-48-blue.png';
        }
        return (
          <MapMarker key={index} position={[item.lat, item.lng]} onClick={() => handleMarkerClick(item)}/*  setIsEvent={() => handleIsEvent(isEvent)} */ data={selectedEntryData}  iconUrl={iconUrl} />
        );
      })}
      {(selectedCategories.length === 0 || selectedCategories.includes('events')) && eventData && eventData.map((item: { lat: number; lng: number; id: string }, index: React.Key | null | undefined) => {
        let iconUrl = '/assets/images/icons8-marker-48.png'; // Yellow marker for events
        return (
          <MapMarker key={index} position={[item.lat, item.lng]} onClick={() => handleMarkerClick(item)} /* setIsEvent={() => handleIsEvent(isEvent)} */ data={selectedEventData}  iconUrl={iconUrl} />
        );
      })}
    </React.Fragment>
  );
};

export default MyMap;
