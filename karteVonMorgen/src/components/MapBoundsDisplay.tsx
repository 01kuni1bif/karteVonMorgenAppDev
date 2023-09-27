import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

function MapBoundsDisplay() {
    const map = useMap();
    const boundsControlRef = useRef<L.Control | null>(null);

    useEffect(() => {
        const updateBounds = () => {
            const bounds = map.getBounds();
            const southWest = bounds.getSouthWest();
            const northEast = bounds.getNorthEast();
            const boundsText = `Bounds: (${southWest.lat.toFixed(4)}, ${southWest.lng.toFixed(4)}) - (${northEast.lat.toFixed(4)}, ${northEast.lng.toFixed(4)})`;

            if (!boundsControlRef.current) {
                const boundsControl = L.control({ position: "bottomleft" });

                boundsControl.onAdd = () => {
                    const div = L.DomUtil.create("div", "leaflet-control-bounds");
                    div.innerHTML = boundsText;
                    boundsControlRef.current = div;
                    return div;
                };

                boundsControl.addTo(map);
            } else {
                // Update the content of the existing bounds control
                boundsControlRef.current.innerHTML = boundsText;
            }
        };

        // Listen for map events to update bounds when the map view changes
        map.on("moveend", updateBounds);

        // Initial bounds update
        updateBounds();

        // Clean up when the component unmounts
        return () => {
            map.off("moveend", updateBounds);
            if (boundsControlRef.current) {
                boundsControlRef.current.remove();
                boundsControlRef.current = null;
            }
        };
    }, [map]);

    return null;
}

export default MapBoundsDisplay;
