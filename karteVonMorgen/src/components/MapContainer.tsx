import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

const MapComponent: React.FC = () => {
    const center = [51.1657, 10.4515]; // Center of Germany
    return (
        <div style={{ height: "100vh" }}>
            <LeafletMap center={center} zoom={13} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Hier können Marker und weitere Karten-Elemente hinzugefügt werden */}
            </LeafletMap>
        </div>
    );
};

export default MapComponent;
