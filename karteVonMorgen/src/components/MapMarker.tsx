// MapMarker.tsx
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  item: any;
  setSelectedMarker: React.Dispatch<React.SetStateAction<{ id: string | null, type: string | null }>>;
  type: string;
  setClickedMarkerId: (id: string) => void;
  openModal: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = (
  { position, iconUrl, iconSize, iconAnchor, item, setSelectedMarker, type, setClickedMarkerId, openModal }
) => {
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });

  const handleMarkerClick = () => {
    setSelectedMarker({ id: item.id, type: type });
    setClickedMarkerId(item.id)
    openModal();
  }

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: handleMarkerClick }} />
    </React.Fragment>
  );
}

export default MapMarker;
