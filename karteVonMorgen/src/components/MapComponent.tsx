// MapComponent.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet";
import { useSearch } from '../hooks/useSearch';
import { useEvents } from '../hooks/useEvents';
import { useEntries } from '../hooks/useEntries';
import SearchBar from './SearchBar';
import Categories from './Categories';
import ModalComponent from './ModalComponent';
import MyMap from './MyMap';
import { EntryData, EventData } from '../consts/types'
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css"

const bounds: LatLngBoundsLiteral = [[-90, -180], [90, 180]];

const MapComponent: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [bbox, setBbox] = useState<string | null>(null);
  const searchData = useSearch({ bbox: bbox, categories: categories });
  const eventData = useEvents({ bbox: bbox });
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.1657, 10.4515]);
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [searchId, setSearchId] = useState<string>("");
  const [eventId, setEventId] = useState("")
  const selectedEntryData: EntryData[] | null = useEntries({ ids: [searchId] });
  const selectedEventData: EventData[] | null = useEvents({ id: eventId });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const forwardSearchId = (item: any) => {
    setSearchId(item.id);
    setIsModalOpen(true);
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const forwardEventId = (item: any) => {
    setEventId(item.id);
    setIsModalOpen(true);
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let modalData: EntryData | EventData | null = null;

  if (searchId && selectedEntryData && selectedEntryData.length > 0) {
    modalData = selectedEntryData[0];
  } else if (eventId && selectedEventData) {
    modalData = selectedEventData[0];
  }

  return (
    <div id="map">
      <div className='map-controls'>
        <Categories onCategoryChange={setCategories} />
        <SearchBar
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
          forwardId={forwardSearchId}
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
          setBbox={setBbox}
          searchData={searchData}
          eventData={eventData}
          selectedCategories={categories}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          selectedEntryData={selectedEntryData}
          selectedEventData={selectedEventData}
          forwardSearchId={forwardSearchId}
          forwardEventId={forwardEventId}
        />
        <ModalComponent modalData={modalData} isModalOpen={isModalOpen} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
