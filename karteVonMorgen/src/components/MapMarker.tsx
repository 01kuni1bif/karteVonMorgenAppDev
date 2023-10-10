// MapMarker.tsx
import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';

interface MapMarkerProps {
  position: [number, number];
  data: any;
  onClick: (data: any) => void;
  iconUrl: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, data, onClick, iconUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalWithContent = () => {
    onClick(data);
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

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: openModalWithContent }}>
        {data !== null && (
          <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
            <div className="ion-padding">
              <IonList>
                {Object.entries(data).map(([key, value]) => (
                  <IonItem key={key}>
                    <IonLabel>
                      {typeof value === 'object' && value !== null && 'title' in value
                        && typeof value.title === 'string' && <h2>{value.title}</h2>}
                      {typeof value === 'object' && value !== null
                        && Object.entries(value).map(([propKey, propValue]) => (
                          <p key={propKey}>{`${propKey}: ${typeof propValue === 'object'
                            ? JSON.stringify(propValue) : String(propValue)}`}</p>
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
