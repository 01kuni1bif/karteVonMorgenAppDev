// SearchComponent.tsx
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';

const SearchComponent: React.FC = () => {

  return (
    <div className='search-container'>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonButton
              expand="block"
            >
              initiative
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton
              expand="block"
            >
              event
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton
              expand="block"
            >
              company
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default SearchComponent;
