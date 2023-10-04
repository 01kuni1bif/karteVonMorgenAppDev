import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { IonModal, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

const customIcon = new L.Icon({
  iconUrl: '/assets/images/icons8-marker-48.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface MapMarkerProps {
  position: [number, number];
  data: any;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const openModalWithContent = (content: any) => {
    setModalContent(content);
    setIsModalOpen(true); // Modal öffnen
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modal schließen
  };

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: () => openModalWithContent(data) }} />

      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
        <IonContent className="ion-padding">
          <IonList>
            {modalContent && Object.entries(modalContent).map(([key, value]) => (
              <IonItem key={key}>
                <IonLabel>
                  <h2>{key}</h2>
                  <p>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </React.Fragment>
  );
};

export default MapMarker;
