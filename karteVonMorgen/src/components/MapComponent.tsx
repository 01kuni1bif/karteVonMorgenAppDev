import "../styles/map-styles.css"
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useMapBounds } from "../hooks/useMapBounds";

const MyMap = () => {
    const map = useMap();
    const { northEast, southWest } = useMapBounds()

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100)
    }, [map])

    useEffect(() => {
        if (northEast.lat && northEast.lng && southWest.lat && southWest.lng) {
            console.log('North East Lat: ', northEast.lat, ' Lng: ', northEast.lng);
            console.log('South West Lat: ', southWest.lat, ' Lng: ', southWest.lng);
        }
    }, [northEast, southWest]);


    return null;
};

const MapComponent: React.FC = () => {
    const center = [51.1657, 10.4515]; // Center of Germany

    return (
        <div>
            <MapContainer center={center} zoom={6}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyMap />
                {/* Hier können Marker und weitere Karten-Elemente hinzugefügt werden */}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
