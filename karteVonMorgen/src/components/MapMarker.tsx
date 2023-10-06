// MapMarker.tsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  data: any;
  onClick: (data: any) => void;
  iconUrl: string; // Add this line
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, data, onClick, iconUrl }) => {
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const handleClick = () => {
    console.log('Marker clicked');
    onClick(data); // Pass the data to the onClick function
  };

  return (
    <React.Fragment>
      <Marker position={position} icon={customIcon} eventHandlers={{ click: handleClick }} >
        {data && (
          <Popup>
            {/* Display the content of the popup here */}
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <h2>{key}</h2>
                <p>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
              </div>
            ))}
          </Popup>
        )}
      </Marker>
    </React.Fragment>
  );
};

export default MapMarker;
