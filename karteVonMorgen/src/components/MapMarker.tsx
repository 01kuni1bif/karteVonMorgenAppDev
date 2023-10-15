// MapMarker.tsx
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  forwardId: (item: any) => void;
  setSelectedMarkerId: (item: string) => void;
  item: any;
  openModal: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = (
  { position, iconUrl, iconSize, iconAnchor, forwardId, setSelectedMarkerId, item, openModal }
) => {
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });

  const handleMarkerClick = () => {
    forwardId(item);
    openModal();
    setSelectedMarkerId(item.id)
  }

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: handleMarkerClick }} />
    </React.Fragment>
  );
}

export default MapMarker;
