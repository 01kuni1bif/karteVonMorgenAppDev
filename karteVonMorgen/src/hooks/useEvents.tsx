import axios from 'axios';
import { useEffect, useState } from 'react';

async function fetchEventData() {
    try {
        const baseUrl = 'https://dev.ofdb.io/v0/events';
        const queryParams = new URLSearchParams({
            bbox: '42.27,-7.97,52.58,38.25',
        });

        const url = `${baseUrl}?${queryParams.toString()}`;
        const response = await axios.get(url);

        if (response.data) {
            return response.data.map(item => ({
                lat: item.lat,
                lng: item.lng,
                title: item.title,
            }));
        } else {
            console.error('Ungültige Daten in der API-Antwort');
            return null;
        }
    } catch (error) {
        console.error('Fehler bei der API-Anforderung:', error);
        return null;
    }
}

function useEvents() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchDataAndSetData() {
            const result = await fetchEventData();
            if (result !== null) {
                setData(result);
                // Hier geben wir die gefilterten Daten in der Konsole aus
                console.log(result);
            }
        }

        fetchDataAndSetData();
    }, []);

    return data;
}

export default useEvents;
