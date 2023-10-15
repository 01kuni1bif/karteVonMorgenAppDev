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
  setClickedMarkerId: (id: string) => void;
  forwardId: (item: any) => void;
  openModal: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = (
  { position, iconUrl, iconSize, iconAnchor, item, setClickedMarkerId, forwardId, openModal }
) => {
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });

  const handleMarkerClick = () => {
    setClickedMarkerId(item.id)
    forwardId(item);
    openModal();
  }

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: handleMarkerClick }} />
    </React.Fragment>
  );
}

export default MapMarker;
