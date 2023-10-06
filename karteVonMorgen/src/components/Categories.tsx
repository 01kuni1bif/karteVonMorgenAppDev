// Categories.tsx
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import "./Categories.css"

const Categories: React.FC = () => {

  return (
    <div className='categories'>
      <IonGrid className="ion-align-items-center">
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeMd="6">
            <IonButton expand="block" className="custom-button">
              initiatives
            </IonButton>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonButton expand="block" className="custom-button">
              companies
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Categories;
