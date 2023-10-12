// MapMarker.tsx
import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import ModalComponent from './ModalComponent';

interface MapMarkerProps {
  position: [number, number];
  modalEntry: any;
  onClick: (data: any) => void;
  iconUrl: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, modalEntry, onClick, iconUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const openModalWithContent = () => {
    onClick(modalEntry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: openModalWithContent }}>
        <ModalComponent modalEntry={modalEntry} isModalOpen={isModalOpen} onDidDismiss={closeModal} />
      </Marker>
    </React.Fragment>
  );
}

export default MapMarker;
