import axios from 'axios';
import { useEffect, useState } from 'react';

async function fetchClusterEventData(bbox, limit) {
    try {
        let apiUrl = 'https://dev.ofdb.io/v0/events?';

        if (bbox) {
            const bboxString = bbox.join('%2C');
            apiUrl += `bbox=${bboxString}`;
        }

        if (limit !== null) {
            apiUrl += `${bbox ? '&' : ''}limit=${limit}`;
        }

        const response = await axios.get(apiUrl);

        if (response.data) {
            return response.data.map((item) => ({
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

function useEventsCluster(bbox, limit) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchDataAndSetData() {
            const result = await fetchClusterEventData(bbox, limit);
            if (result !== null) {
                setData(result);
            }
        }

        fetchDataAndSetData();
    }, [bbox, limit]);

    return data;
}

export default useEventsCluster;
