// ModalComponent.tsx
import React from 'react';
import {
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';

interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  content: any;
}

const ModalComponent: React.FC<ModalProps> = ({ showModal, setShowModal, content }) => {

  return (
    <IonContent className="ion-padding">
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} initialBreakpoint={0.75} breakpoints={[0, 0.75]}>
        <IonContent className="ion-padding">
          <IonList>
            {content && Object.entries(content).map(([key, value]) => (
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
    </IonContent>

  );
};

export default ModalComponent;
