// Categories.tsx
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import "./Categories.css"

const Categories: React.FC = () => {

  return (
    <div className='categories'>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonButton expand="block">
              initiatives
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="block">
              events
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="block">
              companies
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Categories;
