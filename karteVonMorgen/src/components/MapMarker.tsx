// MapMarker.tsx
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  onClick: () => void;
  iconUrl: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, onClick, iconUrl }) => {
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: onClick }} />
    </React.Fragment>
  );
}

export default MapMarker;
