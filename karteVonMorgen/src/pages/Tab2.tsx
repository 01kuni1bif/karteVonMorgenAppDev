import { IonCard, IonContent, IonButton, IonModal, IonToast, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter, IonGrid, IonRow, useIonRouter, IonCol } from '@ionic/react';
import React, { useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker } from 'react-leaflet'

import "./Tab2.css";

export interface MapLocationProps {
    lat: number
    lng: number
    zoom: number
}

const MapView: React.FC = () => {

    useIonViewDidEnter(() => {
        window.dispatchEvent(new Event('resize'));
    });

    const searchFilterModal = useRef<HTMLIonModalElement>(null);
    const searchBar = useRef<HTMLIonSearchbarElement>(null);

    //const router = useIonRouter();

    function OpenSearchModal() {
        searchFilterModal.current?.present();
        searchBar.current?.focus();
    }

    return (
        <IonPage >

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Karte von Morgen</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className='searchContainer'>
                    <IonSearchbar ref={searchBar}itemID="searchBar" class="custom" debounce={1000} color="danger" placeholder='Wonach suchst du? (# für Tags)' onFocus={OpenSearchModal} />
                    <IonGrid>
                        <IonRow>
                            <IonCol size="4">
                                <IonButton expand="block" shape="round">initiative</IonButton>
                            </IonCol>
                            <IonCol size="4">
                                <IonButton expand="block" shape="round">event</IonButton>
                            </IonCol>
                            <IonCol size="4">
                                <IonButton expand="block" shape="round">company</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonModal ref={searchFilterModal} backdropBreakpoint={1} backdropDismiss={false} showBackdrop={false}  initialBreakpoint={0.75} breakpoints={[0, 0.25, 0.5, 0.75, 1]}>
                        <IonContent className="ion-padding">

                        </IonContent>
                    </IonModal>

                </div>
                <MapContainer className='map-container' center={[50.826, 10.92]} zoom={7} scrollWheelZoom={true} zoomControl={false} >
                    <Marker position={[0.00, 256.00]}>
                    </Marker>
                    <ZoomControl position="bottomright" />
                    <TileLayer
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                </MapContainer>

            </IonContent>
        </IonPage >
    );
};

export default MapView;