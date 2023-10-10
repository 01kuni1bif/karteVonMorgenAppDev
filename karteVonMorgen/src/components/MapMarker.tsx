// MapMarker.tsx
import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { IonContent, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';

interface MapMarkerProps {
  position: [number, number];
  data: any;
  onClick: (data: any) => void;
  iconUrl: string; // Add this line
  
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, data, onClick, iconUrl }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const openModalWithContent = () => {
    /*  setModalContent(content); */

    onClick(data);


    /*  console.log(content); */
    setIsModalOpen(true); // Modal öffnen
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modal schließen
  };
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  /* const handleClick = () => {
    console.log('Marker clicked');
    onClick(data); // Pass the data to the onClick function
  }; */

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: openModalWithContent }}>
        {/* Modal is conditionally rendered when data is not null */}
        {data !== null && (
          <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
            <div className="ion-padding">
              <IonList>
                {Object.entries(data).map(([key, value]) => (
                  <IonItem key={key}>
                    <IonLabel>
                      <h2>{value.title}</h2>
                      {Object.entries(value).map(([propKey, propValue]) => (
                        <p key={propKey}>{`${propKey}: ${typeof propValue === 'object' ? JSON.stringify(propValue) : String(propValue)}`}</p>
                      ))}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </div>
          </IonModal>
        )}
      </Marker>
    </React.Fragment>
  );
}

export default MapMarker;
