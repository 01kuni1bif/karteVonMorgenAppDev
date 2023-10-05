// MapComponent.tsx
import "../styles/map-styles.css"
import "./MapComponent.css"
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react'; // Import IonPage
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useMapBounds } from '../hooks/useMapBounds';
import { useSearch } from '../hooks/useSearch';
import MapMarker from '../components/MapMarker';
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet";
import { useEntries } from "../hooks/useEntries";
import ModalComponent from "./ModalComponent";

const bounds: LatLngBoundsLiteral = [[-90, -180], [90, 180]];

const MyMap = () => {

  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });
  const map = useMap();
  const { southWest, northEast } = useMapBounds();
  const [bbox, setBbox] = useState<string | null>(null);
  const data = useSearch(bbox);

  const [selectedEntryId, setSelectedEntryId] = useState("");
  const selectedEntryData = useEntries(selectedEntryId);

  const handleMarkerClick = (id: string) => {
    setSelectedEntryId(id);
  };

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
      {data && data.map((item: { lat: number; lng: number; id: string; }, index: React.Key | null | undefined) => (
        <MapMarker key={index} position={[item.lat, item.lng]} onClick={() => handleMarkerClick(item.id)} data={selectedEntryData} />
      ))}
    </React.Fragment>
  );
};

const MapComponent: React.FC = () => {



  

  const center: LatLngExpression = [51.1657, 10.4515]; // Center of Germany

  return (
    <IonPage>
      <div>
        
        <IonContent fullscreen>
          
          <MapContainer center={center} zoom={6} maxBounds={bounds} className="map-container">
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MyMap />

          </MapContainer>

         
          {/* <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>

            <IonContent>
              <div>{modalContent}</div>

            </IonContent>
          </IonModal> */}
        </IonContent>
      </div >
    </IonPage>
  );
};

export default MapComponent;
