// MyMap.tsx
import React, { useEffect } from 'react';
import { useIonViewDidEnter } from '@ionic/react';
import { useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useMapBounds } from '../hooks/useMapBounds';
import MapMarker from './MapMarker';

interface MyMapProps {
  mapCenter: LatLngExpression;
  mapZoom: number;
  setBbox: (bbox: string) => void;
  searchData: any;
  eventData: any;
  categories: string[];
  forwardSearchId: (item: any) => void;
  forwardEventId: (item: any) => void;
  setSelectedMarkerId: (item: string) => void;
  openModal: () => void;
  selectedMarkerId: string | null;
}

const MyMap: React.FC<MyMapProps> = ({
  mapCenter,
  mapZoom,
  setBbox,
  searchData,
  eventData,
  categories,
  forwardSearchId,
  forwardEventId,
  setSelectedMarkerId,
  openModal,
  selectedMarkerId // Empfangen Sie den Zustand in den Props
}) => {
  const map = useMap();
  const { southWest, northEast } = useMapBounds();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100)
  }, [map])

  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });

  useEffect(() => {
    map.setView(mapCenter, mapZoom);
  }, [map, mapCenter, mapZoom]);

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
      {searchData && searchData.map(
        (
          item: { categories: string | string[]; lat: number; lng: number; id: string },
          index: React.Key | null | undefined
        ) => {
          // Skip this item if its category is not selected
          if (categories.length > 0 && !categories.some(category =>
            item.categories.includes(category))) {
            return null;
          }
          let iconUrl = '/assets/images/icons8-marker-48-yellow.png';
          let iconSize: [number, number] = [32, 32]
          let iconAnchor: [number, number] = [iconSize[0] / 2, iconSize[1]]
          // Wenn dieser Marker ausgewählt ist, ändern Sie das Icon in Gelb
          if (item.id === selectedMarkerId) {
            iconUrl = '/assets/images/icons8-marker-48-red.png';
            iconSize = [42, 42]
            iconAnchor = [iconSize[0] / 2, iconSize[1]]
          }
          // Check if the categories array includes the category ID for initiatives
          else if (item.categories.includes('2cd00bebec0c48ba9db761da48678134')) {
            iconUrl = '/assets/images/icons8-marker-48-lightgreen.png';
            // Check if the categories array includes the category ID for companies
          } else if (item.categories.includes('77b3c33a92554bcf8e8c2c86cedd6f6f')) {
            iconUrl = '/assets/images/icons8-marker-48-blue.png';
          }
          return (
            <MapMarker
              key={index}
              position={[item.lat, item.lng]}
              iconUrl={iconUrl}
              iconSize={iconSize}
              iconAnchor={iconAnchor}
              forwardId={forwardSearchId}
              setSelectedMarkerId={setSelectedMarkerId}
              item={item}
              openModal={openModal}
            />
          );
        })}
      {(categories.length === 0 || categories.includes('events')) && eventData &&
        eventData.map(
          (
            item: { lat: number; lng: number; id: string },
            index: React.Key | null | undefined
          ) => {
            let iconUrl = '/assets/images/icons8-marker-48-purple-origin.png';
            let iconSize: [number, number] = [32, 32]
            let iconAnchor: [number, number] = [iconSize[0] / 2, iconSize[1]]
            // Wenn dieser Marker ausgewählt ist, ändern Sie das Icon in Gelb
            if (item.id === selectedMarkerId) {
              iconUrl = '/assets/images/icons8-marker-48-red.png';
              iconSize = [42, 42]
              iconAnchor = [iconSize[0] / 2, iconSize[1]]
            }
            return (
              <MapMarker
                key={index}
                position={[item.lat, item.lng]}
                iconUrl={iconUrl}
                iconSize={iconSize}
                iconAnchor={iconAnchor}
                forwardId={forwardEventId}
                setSelectedMarkerId={setSelectedMarkerId}
                item={item}
                openModal={openModal}
              />
            );
          })}
    </React.Fragment>
  );
};

export default MyMap;
