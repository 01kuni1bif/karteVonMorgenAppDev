import React from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import { EntryData, EventData } from '../consts/types';
import './modalComponent.css'

interface ModalComponentProps {
  modalData: EntryData | EventData | null;
  isModalOpen: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ modalData, isModalOpen }) => {

  // Define the keys that are present in both EntryData and EventData
  const commonKeys = [
    'title',
    'description',
    'street',
    'zip',
    'city',
    'state',
    'country',
    'homepage',
    'telephone',
    'email',
    'lat',
    'lng',
    'tags',
    'id',
  ];

  return (
    <IonModal isOpen={isModalOpen} backdropBreakpoint={1} showBackdrop={true} initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75, 1]}>
      <div className="ion-padding">
        <IonList>
          {modalData && commonKeys.map(key => (
            <IonItem key={key}>
              <IonLabel>
                {(modalData as any)[key] &&
                  <p>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${(modalData as any)[key]}`}</p>
                }
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>
    </IonModal>
  );
}

export default ModalComponent;
