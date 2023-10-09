// MapComponent.tsx
import React, { useState } from 'react';
import { IonContent, IonModal } from '@ionic/react'; // Import IonPage
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet";
import { useSearch } from '../hooks/useSearch';
import { useEvents } from '../hooks/useEvents';
import SearchBar from './SearchBar';
import Categories from './Categories';
import MyMap from './MyMap';
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css"

const bounds: LatLngBoundsLiteral = [[-90, -180], [90, 180]];

const MapComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [bbox, setBbox] = useState<string | null>(null);
  const data = useSearch(bbox, null, categories);
  const eventData = useEvents(bbox);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const center: LatLngExpression = [51.1657, 10.4515]; // Center of Germany

  return (
    <div id="map">
      <div className='map-controls'>
        <Categories onCategoryChange={setCategories} />
        <SearchBar />
      </div>
      <MapContainer
        center={center}
        zoom={6}
        minZoom={3}
        maxBounds={bounds}
        className="map-container"
        zoomControl={false}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyMap
          setBbox={setBbox}
          data={data}
          eventData={eventData}
          selectedCategories={categories} />
      </MapContainer>
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
        <IonContent>
          <div>{modalContent}</div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default MapComponent;
