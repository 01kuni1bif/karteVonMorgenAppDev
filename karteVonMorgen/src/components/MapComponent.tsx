// MapComponent.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet";
import { useSearch } from '../hooks/useSearch';
import { useEvents } from '../hooks/useEvents';
import { useEntries } from '../hooks/useEntries';
import MyMap from './MyMap';
import Categories from './Categories';
import ModalComponent from './ModalComponent';
import SearchBar from './SearchBar';
import { EntryData, EventData, SearchData } from '../consts/types'
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css"

const bounds: LatLngBoundsLiteral = [[-90, -180], [90, 180]];

const MapComponent: React.FC = () => {
  const [bbox, setBbox] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const searchData: SearchData[] = useSearch({ bbox: bbox, categories: categories });
  const eventData = useEvents({ bbox: bbox });
  const [searchId, setSearchId] = useState<string>('');
  const [eventId, setEventId] = useState<string>('')
  const entryDataById: EntryData[] = useEntries({ ids: [searchId] });
  const eventDataById: EventData | EventData[] = useEvents({ id: eventId });
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.1657, 10.4515]);
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string>('');

  const forwardSearchId = (item: any) => {
    setSearchId(item.id);
  };

  const forwardEventId = (item: any) => {
    setEventId(item.id);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let modalData: EntryData | EventData | EventData[] | null = null;

  if (searchId && entryDataById && entryDataById.length > 0) {
    modalData = entryDataById[0];
  } else if (eventId && eventDataById) {
    modalData = eventDataById;
  }

  return (
    <div id="map">
      <div className='map-controls'>
        <Categories onCategoryChange={setCategories} />
        <SearchBar
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
          forwardSearchId={forwardSearchId}
          openModal={openModal}
        />
      </div>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={3}
        maxBounds={bounds}
        className="map-container"
        zoomControl={false}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMap
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          setBbox={setBbox}
          searchData={searchData}
          eventData={eventData}
          categories={categories}
          forwardSearchId={forwardSearchId}
          forwardEventId={forwardEventId}
          setSelectedMarkerId={setSelectedMarkerId}
          openModal={openModal}
          selectedMarkerId={selectedMarkerId} // Übergeben Sie den Zustand an die MyMap 
        />
        <ModalComponent modalOpen={modalOpen} closeModal={closeModal} modalData={modalData} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
