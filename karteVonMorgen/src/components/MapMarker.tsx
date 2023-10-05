// MapMarker.tsx
import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import ModalComponent from './ModalComponent'; // import ModalComponent

const customIcon = new L.Icon({
  iconUrl: '/assets/images/icons8-marker-48.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface MapMarkerProps {
  position: [number, number];
  data: any;
  onClick: (data: any) => void; // Add this line
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, data, onClick }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  
  const handleClick = () => {
    console.log('Marker clicked');
    setIsModalOpen(true);
    onClick(data); // Pass the data to the onClick function
  };

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: handleClick }} >
      {data && ( // Überprüfen, ob data vorhanden ist
        <ModalComponent showModal={isModalOpen} setShowModal={setIsModalOpen} content={data}/>
      )}
      </Marker>
    </React.Fragment>
  );
};

export default MapMarker;
