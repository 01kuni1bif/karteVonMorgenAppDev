import "../styles/map-styles.css"
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useMapBounds } from '../hooks/useMapBounds';
import { useSearch } from '../hooks/useSearch';
import MapMarker from '../components/MapMarker';
import { LatLngBoundsLiteral } from "leaflet";

const bounds: LatLngBoundsLiteral = [[-90, -180], [90, 180]];

const MyMap = () => {
  const map = useMap();
  const { southWest, northEast } = useMapBounds();
  const [bbox, setBbox] = useState<string | null>(null);
  const data = useSearch(bbox);

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100)
  }, [map])

  useEffect(() => {
    if (southWest && southWest.lat !== null && southWest.lng !== null && northEast && northEast.lat !== null && northEast.lng !== null) {
      // Ensure latitudes are between -90 and 90
      const swLat = Math.max(-90, Math.min(90, southWest.lat));
      const neLat = Math.max(-90, Math.min(90, northEast.lat));

      // Normalize longitudes to be between -180 and 180
      const swLng = ((southWest.lng + 180) % 360 + 360) % 360 - 180;
      const neLng = ((northEast.lng + 180) % 360 + 360) % 360 - 180;

      const newBbox = `${swLat.toFixed(2)},${swLng.toFixed(2)},${neLat.toFixed(2)},${neLng.toFixed(2)}`;
      setBbox(newBbox);
    }
  }, [southWest, northEast]);

  return (
    <React.Fragment>
      {data && data.map((item, index) => (
        <MapMarker key={index} position={[item.lat, item.lng]} title={item.title} />
      ))}
    </React.Fragment>
  );
};

const MapComponent: React.FC = () => {
  const center = [51.1657, 10.4515]; // Center of Germany

  return (
    <div>
      <MapContainer center={center} zoom={6} maxBounds={bounds}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMap />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
