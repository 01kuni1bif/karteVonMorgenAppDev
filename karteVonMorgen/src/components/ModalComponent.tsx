// ModalComponent.tsx
import React, { useEffect } from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';

interface ModalComponentProps {
  data: any;
  isOpen: boolean;
  onDidDismiss: () => void;
}

const transformData = (data1: any) => {
  if (!data1) {
    return [];
  }
  const data2 = [data1]



  const data3 = data2.map((item: {
    organizer: any;
    registration: any;
    homepage: any;
    tags: any;
    telephone: any;
    email: any;
    state: any;
    counry: any;
    city: any;
    zip: any;
    street: any; lat: any; lng: any; title: any; description: any;
  }) => ({
    lat: item.lat,
    lng: item.lng,
    title: item.title,
    description: item.description,
    street: item.street,
    zip: item.zip,
    city: item.city,
    country: item.counry,
    state: item.state,
    email: item.email,
    telephone: item.telephone,
    tags: item.tags,
    homepage: item.homepage,
    registration: item.registration,
    organizer: item.organizer,
  }));
  return data3;



};



const ModalComponent: React.FC<ModalComponentProps> = ({ data, isOpen, onDidDismiss }) => {

  // Hilfsfunktion zum Umwandeln des Objekts in ein Array

  /* let transformedData;

  useEffect(() => { transformedData = transformData(data); }, [data]) */

{/* backdropBreakpoint={1} backdropDismiss={false} showBackdrop={false} initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75, 1] */}


  return (
    <IonModal isOpen={isOpen} backdropDismiss={false} onDidDismiss={onDidDismiss} backdropBreakpoint={1} showBackdrop={false} initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75, 1]}   >
      <div className="ion-padding">
        <IonList>
          {data && Object.entries(data).map(([key, value]) => (
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
  );
}

export default ModalComponent;
