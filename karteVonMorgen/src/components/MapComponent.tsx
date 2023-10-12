// MapComponent.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet";
import { useSearch } from '../hooks/useSearch';
import { useEvents } from '../hooks/useEvents';
import SearchBar from './SearchBar';
import Categories from './Categories';
import MyMap from './MyMap';
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css"
import { useEntries } from '../hooks/useEntries';

const bounds: LatLngBoundsLiteral = [[-90, -180], [90, 180]];

const MapComponent: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [bbox, setBbox] = useState<string | null>(null);
  const searchData = useSearch(bbox, null, categories);
  const eventData = useEvents(bbox);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.1657, 10.4515]);
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [selectedId, setSelectedId] = useState("");
  const selectedEntryData = useEntries(selectedId);
  const selectedEventData = useEvents(null, null, null, null, selectedId);

  const handleMarkerClick = (item: any) => {
    setSelectedId(item.id);
    console.log("Id:", selectedId)
  };

  return (
    <div id="map">
      <div className='map-controls'>
        <Categories onCategoryChange={setCategories} />
        <SearchBar
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
          handleMarkerClick={handleMarkerClick}
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
          handleMarkerClick={handleMarkerClick}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
