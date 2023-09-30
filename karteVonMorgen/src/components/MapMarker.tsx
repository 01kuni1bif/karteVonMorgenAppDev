import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: '../../public/assets/images/icons8-marker-48.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapMarker: React.FC<{ position: [number, number], title: string }> = ({ position, title }) => {
  return (
    <Marker position={position} icon={customIcon}>
      <Popup>{title}</Popup>
    </Marker>
  );
};

export default MapMarker;
