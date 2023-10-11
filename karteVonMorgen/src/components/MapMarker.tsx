// MapMarker.tsx
import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import ModalComponent from './ModalComponent'; // Import the ModalComponent

interface MapMarkerProps {
  position: [number, number];
  data: any;
  onClick: (data: any) => void;
  iconUrl: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, data, onClick, iconUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  
  const openModalWithContent = () => {
    onClick(data);
    setIsModalOpen(true); // Open the modal
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: openModalWithContent }}>
        <ModalComponent data={data} isOpen={isModalOpen} onDidDismiss={closeModal} /> {/* Use the ModalComponent */}
      </Marker>
    </React.Fragment>
  );
}

export default MapMarker;
