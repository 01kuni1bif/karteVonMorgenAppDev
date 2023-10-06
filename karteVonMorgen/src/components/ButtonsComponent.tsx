import { IonButton, IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import "./ButtonsComponent.css"
import React from 'react';

const ButtonsComponent: React.FC = () => {


    return (

        <div className='buttons-container'>
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

export default ButtonsComponent;
