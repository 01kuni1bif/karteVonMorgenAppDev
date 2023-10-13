// ModalComponent.tsx
import React from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';

interface ModalComponentProps {
  modalEntry: any;
  isModalOpen: boolean;
  onDidDismiss: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ modalEntry, isModalOpen, onDidDismiss }) => {
  return (
    <IonModal isOpen={isModalOpen} onDidDismiss={onDidDismiss} backdropBreakpoint={1} showBackdrop={true} initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75, 1]}>
      <div className="ion-padding">
        <IonList>
          {modalEntry && Object.entries(modalEntry).map(([key, value]) => (
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
