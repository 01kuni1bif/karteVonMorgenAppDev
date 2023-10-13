// ModalComponent.tsx
import React from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import './modalComponent.css'

interface ModalComponentProps {
  modalEntry: any;
  isModalOpen: boolean;
  onDidDismiss: () => void;
}


/* [
  {
    "title": "string",
    "description": "string",
    "lat": 37.2,
    "lng": 120.7,
    "street": "string",
    "zip": "string",
    "city": "string",
    "country": "string",
    "state": "string",
    "contact_name": "John Smith",
    "email": "john.smith@example.com",
    "telephone": "001 123456789",
    "homepage": "https://www.slowtec.de/",
    "opening_hours": "24/7",
    "founded_on": "1945-10-24",
    "categories": [
      "string"
    ],
    "tags": [
      "organic",
      "non-profit"
    ],
    "image_url": "https://www.slowtec.de/",
    "image_link_url": "https://www.slowtec.de/",
    "links": [
      {
        "url": "https://www.slowtec.de/",
        "title": "string",
        "description": "string"
      }
    ],
    "license": "ODbL-1.0",
    "id": "7cee99c287094a94acbdcf29ffff2e85",
    "version": 0,
    "created": 0,
    "ratings": [
      "string"
    ]
  }
] */




const ModalComponent: React.FC<ModalComponentProps> = ({ modalEntry, isModalOpen, onDidDismiss }) => {
  return (
    <IonModal isOpen={isModalOpen} onDidDismiss={onDidDismiss} backdropBreakpoint={1} showBackdrop={true} initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75, 1]}>
      <div className="ion-padding">
        <IonList>
          {modalEntry && Object.entries(modalEntry).map(([key, value]) => (
            <IonItem key={key}>
              <IonLabel>
                {modalEntry &&
                  <IonItem>
                    <IonLabel >
                      {value.title && <h2>{value.title}</h2>}

                      {modalEntry &&
                        <IonItem>
                          <IonLabel >

                            {value.description && <p className='IonLabel'>{`Beschreibung: ${value.description}`}</p>}


                          </IonLabel>
                        </IonItem>
                      }

                      {value.email && <p>{`Email: ${value.email}`}</p>}
                      {value.street && <p>{`Straße: ${value.street}`}</p>}
                      {value.zip && <p>{`PLZ: ${value.zip}`}</p>}
                      {value.city && <p>{`Stadt: ${value.city}`}</p>}
                      {value.state && <p>{`Land: ${value.state}`}</p>}
                      {value.tags && <p className='IonLabel'>{`Tags: ${value.tags}`}</p>}
                      
                      {value.contact_name && <p>{`Kontakt: ${value.contact_name}`}</p>}
                      {value.email && <p>{`Email-Adresse: ${value.email}`}</p>}
                      {value.telephone && <p>{`Telefon: ${value.telephone}`}</p>}
                      {value.homepage && <p>{`Homepage: ${value.homepage}`}</p>}
                      {value.opening_hours && <p>{`Öffnungszeiten: ${value.opening_hours}`}</p>}

                    </IonLabel>
                  </IonItem>
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
