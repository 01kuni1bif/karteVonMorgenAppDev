import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import "leaflet/dist/leaflet.css"
import Geolocation from '@react-native-community/geolocation';

// import MarkerClusterGroup from 'react-leaflet-cluster';


import "./Tab2.css";


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import useSearchbar from '../hooks/useSearchbar';
import useEvents from '../hooks/useEvents';
import states from '../consts/states';
import useEventsCluster from '../hooks/useEventsCluster';

// import { Icon } from 'leaflet';


const Tab2: React.FC = () => {
  const extractedData = [];
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Fehler bei der Abfrage der Benutzerposition:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  
  useEffect(() => {
    getUserLocation();
  }, []);
  

  for (const item of states) {
    extractedData.push(useEventsCluster(item.coordinates,500));
   
  }
  console.log(extractedData);

  const data = useEvents();

  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
});

  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1"
    },
    {
      geocode: [48.96, 2.3522],
      popUp: "Hello, I am pop up 2"
    },
    {
      geocode: [48.90, 2.3522],
      popUp: "Hello, I am pop up 3"
    }
  ];

  const searchFilterModal = useRef<HTMLIonModalElement>(null);
    const searchBar = useRef<HTMLIonSearchbarElement>(null);

    //const router = useIonRouter();

    function OpenSearchModal() {
        searchFilterModal.current?.present();
        searchBar.current?.focus();
    }

 /*  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/7508/7508880.png",
    iconSize: [38,38] // size of the icon
  })
   */

 
  const position = [50.1109, 8.6821];
  return (
    <IonPage color='primary'>
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


        <MapContainer className='map-container' center={[userLocation.latitude, userLocation.longitude]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

           <MarkerClusterGroup
           chunkedLoading
           >
          {markers.map(marker => (
            <Marker position={marker.geocode}>
              <Popup>
                {marker.popUp}
              </Popup>
            </Marker>
          ))}
           </MarkerClusterGroup>

          
          
           {extractedData.map((itemArray, outerIndex) => (
  itemArray && itemArray.length > 0 && (
    <MarkerClusterGroup key={outerIndex}>
      {itemArray.map((item: { lat: any; lng: any; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, innerIndex: React.Key | null | undefined) => (
        <Marker key={innerIndex} position={[item.lat, item.lng]}>
          <Popup>
            {item.title}
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  )
))}


           
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;