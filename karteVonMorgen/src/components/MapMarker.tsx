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
  isModalOpen: boolean;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, modalEntry, onClick, iconUrl, isModalOpen}) => {
 /*  const [isModalOpen, setIsModalOpen] = useState(false); */
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const openModalWithContent = () => {
    onClick(modalEntry);
    
  };

 /*  const closeModal = () => {
    setIsModalOpen(false);
  }; */

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: openModalWithContent }}>
        {/* <ModalComponent modalEntry={modalEntry} isModalOpen={isModalOpen}  /> */}
      </Marker>
    </React.Fragment>
  );
}

export default MapMarker;
