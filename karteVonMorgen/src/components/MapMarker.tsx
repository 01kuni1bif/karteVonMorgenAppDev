import React from 'react';
import { Marker as LeafletMarker } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: '../../public/assets/images/icons8-marker-48.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});


const MapMarker: React.FC<{ position: [number, number] }> = ({ position }) => {
    return (
        <LeafletMarker position={position} icon={customIcon}>
            {/* Hier können Inhalte für den Marker platziert werden */}
        </LeafletMarker>
    );
};

export default MapMarker;
