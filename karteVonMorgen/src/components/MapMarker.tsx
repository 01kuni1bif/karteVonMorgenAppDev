// MapMarker.tsx
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import ModalComponent from './ModalComponent'; // import ModalComponent

const customIcon = new L.Icon({
  iconUrl: '/assets/images/icons8-marker-48.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapMarker: React.FC<{ position: [number, number], onClick: () => void, data: any }> = ({ position, onClick, data }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data) {
      console.log('Data received', data);
      setShowModal(true);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: onClick }} />
      <ModalComponent showModal={showModal} setShowModal={setShowModal} content={data} />
    </React.Fragment>
  );
};

export default MapMarker;
