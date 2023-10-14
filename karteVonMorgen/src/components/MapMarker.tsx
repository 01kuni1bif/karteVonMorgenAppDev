// MapMarker.tsx
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  modalEntry: any;
  onClick: (data: any) => void;
  iconUrl: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, modalEntry, onClick, iconUrl }) => {
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const openModalWithContent = () => {
    onClick(modalEntry);
  };

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: openModalWithContent }} />
    </React.Fragment>
  );
}

export default MapMarker;
