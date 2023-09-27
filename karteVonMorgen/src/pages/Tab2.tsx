import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import "leaflet/dist/leaflet.css"
import Geolocation from '@react-native-community/geolocation';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css'; // Stile für die Marker
import 'leaflet.awesome-markers/dist/images/markers-soft.png'; // Bildsatz für die Marker (siehe Hinweis unten)


// import MarkerClusterGroup from 'react-leaflet-cluster';


import "./Tab2.css";


import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import useSearchbar from '../hooks/useSearchbar';
import useEvents from '../hooks/useEvents';
import states from '../consts/states';
import useEventsCluster from '../hooks/useEventsCluster';
import useCategories from '../hooks/useCategories';

import { Icon } from 'leaflet';
import L from 'leaflet';


// Define BoundsDisplay component to show map bounds
function BoundsDisplay({ onUpdateBoundingBox }) {
  const map = useMap();
  const boundsControlRef = useRef<L.Control | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      const bounds = map.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      const newBoundingBox = {
        southwest: { lat: southWest.lat, lng: southWest.lng },
        northeast: { lat: northEast.lat, lng: northEast.lng }
      };

      onUpdateBoundingBox(newBoundingBox);

      const boundsText = `Bounds: (${southWest.lat.toFixed(4)}, ${southWest.lng.toFixed(4)}) - (${northEast.lat.toFixed(4)}, ${northEast.lng.toFixed(4)})`;

      if (!boundsControlRef.current) {
        const boundsControl = L.control({ position: "bottomleft" });

        boundsControl.onAdd = () => {
          const div = L.DomUtil.create("div", "leaflet-control-bounds");
          div.innerHTML = boundsText;
          boundsControlRef.current = div;
          return div;
        };

        boundsControl.addTo(map);
      } else {
        // Update the content of the existing bounds control
        boundsControlRef.current.innerHTML = boundsText;
      }
    };

    // Listen for map events to update bounds when the map view changes
    map.on("moveend", updateBounds);

    // Initial bounds update
    updateBounds();

    // Clean up when the component unmounts
    return () => {
      map.off("moveend", updateBounds);
      if (boundsControlRef.current) {
        boundsControlRef.current.remove();
        boundsControlRef.current = null;
      }
    };
  }, [map, onUpdateBoundingBox]);

  return null;
}


const Tab2: React.FC = () => {

  const extractedData = [];

  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

  const [selectedButton, setSelectedButton] = useState(null);

  const searchFilterModal = useRef<HTMLIonModalElement>(null);

  const searchBar = useRef<HTMLIonSearchbarElement>(null);

  const [modalContent, setModalContent] = useState('');

  const [boundingBox, setBoundingBox] = useState(null);

  const initiatives = useCategories('2cd00bebec0c48ba9db761da48678134', '100');

  const companies = useCategories('77b3c33a92554bcf8e8c2c86cedd6f6f', '100');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateBoundingBox = (newBoundingBox: React.SetStateAction<null>) => {
    setBoundingBox(newBoundingBox);
    console.log(boundingBox);
  };


  // Funktion zum Öffnen des Modals mit dem Popup-Inhalt
  const openModalWithContent = (content) => {
    setModalContent(content);
    openModal(); // Öffnen Sie das Modal
  };

  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* const mapRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current; // Karteninstanz über das ref abrufen

    // Event-Handler für Änderungen der Kartenansicht (Zoomen oder Verschieben)
    map.on('moveend', () => {
      const bounds = map.getBounds(); // Abruf der Bounding Box der aktuellen Kartenansicht
      console.log('Bounding Box:', bounds.toBBoxString());
    });

    // Setze die Ausgangsansicht der Karte
    map.setView([51.505, -0.09], 13); // Hier wird ein Startpunkt und Zoom-Level gesetzt
  }, []); */

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
    extractedData.push(useEventsCluster(item.coordinates, 500));

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



  //const router = useIonRouter();

  function OpenSearchModal() {
    searchFilterModal.current?.present();
    searchBar.current?.focus();
  }




  const handleButtonClick = (buttonId: string | React.SetStateAction<null>) => {
    setSelectedButton(buttonId);
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/7508/7508880.png",
    iconSize: [20, 20] // size of the icon
  });
  const customIcon1 = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3687/3687080.png",
    iconSize: [25, 25] // size of the icon
  });

  const customIcon2 = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/5312/5312928.png",
    iconSize: [25, 25] // size of the icon
  });

  const handleMarkerClick = () => {
    openModal();
  };

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
          <IonSearchbar ref={searchBar} itemID="searchBar" class="custom" debounce={1000} color="danger" placeholder='Wonach suchst du? (# für Tags)' onFocus={OpenSearchModal} />
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <IonButton
                  expand="block"
                  shape="round"
                  className={`custom-button ${selectedButton === 'initiative' ? 'selected' : ''}`}
                  onClick={() => handleButtonClick('initiative')}
                >
                  initiative
                </IonButton>
              </IonCol>
              <IonCol size="4">
                <IonButton
                  expand="block"
                  shape="round"
                  className={`custom-button ${selectedButton === 'event' ? 'selected' : ''}`}
                  onClick={() => handleButtonClick('event')}
                >
                  event
                </IonButton>
              </IonCol>
              <IonCol size="4">
                <IonButton
                  expand="block"
                  shape="round"
                  className={`custom-button ${selectedButton === 'company' ? 'selected' : ''}`}
                  onClick={() => handleButtonClick('company')}
                >
                  company
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonModal ref={searchFilterModal} backdropBreakpoint={1} backdropDismiss={false} showBackdrop={false} initialBreakpoint={0.75} breakpoints={[0, 0.25, 0.5, 0.75, 1]}>
            <IonContent className="ion-padding">

            </IonContent>
          </IonModal>
          <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
            {/* Hier können Sie den Inhalt Ihres Modals platzieren */}
            <IonContent>
              <div>{modalContent}</div>
              {/* Hier den Inhalt des Modals einfügen */}
            </IonContent>
          </IonModal>


        </div>


        <MapContainer className='map-container' center={position} zoom={5} scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <BoundsDisplay onUpdateBoundingBox={updateBoundingBox} />

          <MarkerClusterGroup
            chunkedLoading
          >
            {markers.map(marker => (
              <Marker position={marker.geocode} eventHandlers={{
                click: () => openModalWithContent(marker.popUp)
              }}>
                <Popup>
                  {marker.popUp}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {companies && companies.map((company: { lng: any; lat: any; title: any }, outerIndex: React.Key | null | undefined) => (
            <Marker key={outerIndex} position={[company.lat, company.lng]} icon={customIcon}> {/* Beachte die Verwendung von [] um die Koordinaten zu einem Array zu machen */}
              <Popup>
                {company.title}
              </Popup>

            </Marker>
          ))}

          {initiatives && initiatives.map((initiative: { lng: any; lat: any; title: any }, outerIndex: React.Key | null | undefined) => (
            <Marker key={outerIndex} position={[initiative.lat, initiative.lng]} icon={customIcon2}> {/* Beachte die Verwendung von [] um die Koordinaten zu einem Array zu machen */}
              <Popup>
                {initiative.title}
              </Popup>

            </Marker>
          ))}




          {extractedData.map((itemArray, outerIndex) => (
            itemArray && itemArray.length > 0 && (
              <MarkerClusterGroup key={outerIndex}>
                {itemArray.map((item: { lat: any; lng: any; title: string; }, innerIndex: any) => (
                  <Marker key={`${outerIndex}-${innerIndex}`} position={[item.lat, item.lng]}>
                    <Popup>
                      {item.title}
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            )
          ))}



          <Marker position={position} icon={customIcon1}>
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