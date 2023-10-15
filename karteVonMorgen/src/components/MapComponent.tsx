// MapComponent.tsx
import React, { useEffect, useState } from 'react';
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
  const [bbox, setBbox] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const searchData: SearchData[] = useSearch({ bbox: bbox, categories: categories });
  const eventData = useEvents({ bbox: bbox });
  const [searchId, setSearchId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null)
  const entryDataById: EntryData[] = useEntries({ ids: searchId ? [searchId] : [] });
  const eventDataById: EventData | EventData[] = useEvents({ id: eventId });
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.1657, 10.4515]);
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [clickedMarkerId, setClickedMarkerId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<EntryData | EventData | EventData[] | null>(null);

  const forwardSearchId = (item: any) => {
    setSearchId(item.id);
    if (entryDataById && entryDataById.length > 0) {
      setModalData(entryDataById[0]);
    }
  };

  const forwardEventId = (item: any) => {
    setEventId(item.id);
    if (eventData) {
      setModalData(eventDataById);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div id="map">
      <div className='map-controls'>
        <Categories onCategoryChange={setCategories} />
        <SearchBar
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
          setClickedMarkerId={setClickedMarkerId}
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
          clickedMarkerId={clickedMarkerId}
          setClickedMarkerId={setClickedMarkerId}
          forwardSearchId={forwardSearchId}
          forwardEventId={forwardEventId}
          openModal={openModal}
        />
        <ModalComponent modalOpen={modalOpen} closeModal={closeModal} modalData={modalData} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
