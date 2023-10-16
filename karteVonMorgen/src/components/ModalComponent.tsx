import React from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import { EntryData, EventData } from '../consts/types';
import './modalComponent.css'

interface ModalComponentProps {
  modalOpen: boolean;
  closeModal: () => void;
  modalData: EntryData | EventData | EventData[] | null;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ modalOpen, closeModal, modalData }) => {

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

  // Define a mapping from English keys to German
  const germanKeys = {
    title: 'Titel',
    description: 'Beschreibung',
    street: 'Straße',
    zip: 'PLZ',
    city: 'Stadt',
    state: 'Bundesland',
    country: 'Land',
    homepage: 'Webseite',
    telephone: 'Telefonnummer',
    email: 'E-Mail',
    lat: 'Breitengrad',
    lng: 'Längengrad',
    tags: 'Tags',
    id: 'ID'
  };

  return (
    <IonModal
      isOpen={modalOpen}
      onDidDismiss={closeModal}
      backdropBreakpoint={1}
      showBackdrop={true}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.25, 0.5, 0.75, 1]}
    >
      <div className="ion-padding IonContent">
        <IonList>
          {modalData && commonKeys.map(key => (
            <IonItem key={key}>
              <IonLabel>
                {(modalData as any)[key] &&
                  <p className='IonLabel'>
                    {`${(germanKeys as any)[key]}: ${(modalData as any)[key]}`}
                  </p>
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
