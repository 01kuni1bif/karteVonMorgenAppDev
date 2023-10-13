// MapComponent.tsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet";
import { useSearch } from '../hooks/useSearch';
import { useEvents } from '../hooks/useEvents';
import { useEntries } from '../hooks/useEntries';
import SearchBar from './SearchBar';
import Categories from './Categories';
import ModalComponent from './ModalComponent';
import MyMap from './MyMap';
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css"

const bounds: LatLngBoundsLiteral = [[-90, -180], [90, 180]];

const MapComponent: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [bbox, setBbox] = useState<string | null>(null);
  const searchData = useSearch(bbox, null, categories);
  const eventData = useEvents(bbox);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.1657, 10.4515]);
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [searchId, setSearchId] = useState("");
  const [eventId, setEventId] = useState("")
  const selectedEntryData = useEntries(searchId);
  const selectedEventData = useEvents(null, null, null, null, eventId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const forwardSearchId = (item: any) => {
    setSearchId(item.id);
    setIsModalOpen(true);
    if(isModalOpen){
      setIsModalOpen(false);
    }
  };

  const forwardEventId = (item: any) => {
    setEventId(item.id);
    setIsModalOpen(true);
    if(isModalOpen){
      setIsModalOpen(false);
    }
    
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(searchId);
    console.log(isModalOpen);
  }, [searchId, isModalOpen])

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
        <ModalComponent modalEntry={selectedEntryData} isModalOpen={isModalOpen}  />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
