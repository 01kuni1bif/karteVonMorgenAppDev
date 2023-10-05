import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import "leaflet/dist/leaflet.css"
import Geolocation from '@react-native-community/geolocation';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css'; // Stile für die Marker
import 'leaflet.awesome-markers/dist/images/markers-soft.png'; // Bildsatz für die Marker (siehe Hinweis unten)
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import "./Tab2.css";
import useEventsCluster from '../hooks/useEventsCluster';
import useCategories from '../hooks/useCategories';
import useEvents from '../hooks/useEvents';
import states from '../consts/states';
import MapBoundsDisplay from '../components/MapBoundsDisplay'; // Adjust the import path as needed
import SearchBar from '../components/searchbar';

const Tab2: React.FC = () => {
    const extractedData = [];
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
    const searchFilterModal = useRef<HTMLIonModalElement>(null);
    const searchBar = useRef<HTMLIonSearchbarElement>(null);
    const [modalContent, setModalContent] = useState('');
    const initiatives = useCategories('2cd00bebec0c48ba9db761da48678134', '100');
    const events = useEvents();
    const companies = useCategories('77b3c33a92554bcf8e8c2c86cedd6f6f', '100');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Add a state variable to store the selected category
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    const getUserLocation = () => {
        Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                console.log(userLocation);
            },
            (error) => {
                console.error('Fehler bei der Abfrage der Benutzerposition:', error);
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    for (const item of states) {
        extractedData.push(useEventsCluster(item.coordinates, 500));
    }

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

    function OpenSearchModal() {
        searchFilterModal.current?.present();
        searchBar.current?.focus();
    }

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/7508/7508880.png",
        iconSize: [25, 25] // size of the icon
    });
    const customIcon1 = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/3687/3687080.png",
        iconSize: [20, 20] // size of the icon
    });
    const customIcon2 = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/5312/5312928.png",
        iconSize: [25, 25] // size of the icon
    });
    const customIcon3 = new Icon({
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Map_pin_icon_green.svg",
        iconSize: [15, 20] // size of the icon
    });
    const handleMarkerClick = () => {
        openModal();
    };
    const position = [50.1109, 8.6821];
    // Function to filter markers based on the selected category
    const filterMarkersByCategory = (category: string | null) => {
        // If the selected category is already the same as the clicked category, deselect it
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };
    return (
        <IonPage color="primary">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Karte von Morgen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="searchContainer">
                    <SearchBar/>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="4">
                                <IonButton
                                    expand="block"
                                    shape="round"
                                    className={`custom-button ${selectedCategory === 'initiative' ? 'selected' : ''}`}
                                    onClick={() => filterMarkersByCategory('initiative')}
                                >
                                    initiative
                                </IonButton>
                            </IonCol>
                            <IonCol size="4">
                                <IonButton
                                    expand="block"
                                    shape="round"
                                    className={`custom-button ${selectedCategory === 'event' ? 'selected' : ''}`}
                                    onClick={() => filterMarkersByCategory('event')}
                                >
                                    event
                                </IonButton>
                            </IonCol>
                            <IonCol size="4">
                                <IonButton
                                    expand="block"
                                    shape="round"
                                    className={`custom-button ${selectedCategory === 'company' ? 'selected' : ''}`}
                                    onClick={() => filterMarkersByCategory('company')}
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
                <MapContainer className="map-container" center={position} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapBoundsDisplay /> {/* Include the MapBoundsDisplay component here */}
                     <MarkerClusterGroup chunkedLoading>
                        {markers.map((marker, index) => (
                            // Only render markers that match the selected category
                            (selectedCategory === null || marker.category === selectedCategory) && (
                                <Marker key={`marker-${index}`} position={marker.geocode} eventHandlers={{
                                    click: () => openModalWithContent(marker.popUp)
                                }}>
                                    <Popup>
                                        {marker.popUp}
                                    </Popup>
                                </Marker>
                            )
                        ))}
                    </MarkerClusterGroup> 
                    {initiatives && initiatives.map((initiative: { lng: any; lat: any; title: any }, outerIndex: React.Key | null | undefined) => (
                        (selectedCategory === null || selectedCategory === 'initiative') && (
                            <Marker key={outerIndex} position={[initiative.lat, initiative.lng]} icon={customIcon2}>
                                <Popup>
                                    {initiative.title}
                                </Popup>
                            </Marker>
                        )
                    ))}
                    {companies && companies.map((company: { lng: any; lat: any; title: any }, outerIndex: React.Key | null | undefined) => (
                        (selectedCategory === null || selectedCategory === 'company') && (
                            <Marker key={outerIndex} position={[company.lat, company.lng]} icon={customIcon}>
                                <Popup>
                                    {company.title}
                                </Popup>
                            </Marker>
                        )
                    ))}
                    {events && events.map((event: { lng: any; lat: any; title: any }, outerIndex: React.Key | null | undefined) => (
                        (selectedCategory === null || selectedCategory === 'event') && (
                            <Marker key={outerIndex} position={[event.lat, event.lng]} icon={customIcon3}>
                                <Popup>
                                    {event.title}
                                </Popup>
                            </Marker>
                        )
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
                </MapContainer>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;