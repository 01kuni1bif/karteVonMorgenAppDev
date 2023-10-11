// ModalComponent.tsx
import React from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';

interface ModalComponentProps {
  data: any;
  isOpen: boolean;
  onDidDismiss: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ data, isOpen, onDidDismiss }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
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
