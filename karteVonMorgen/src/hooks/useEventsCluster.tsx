// useEventsCluster.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

async function fetchClusterEventData(bbox: any[], limit: number) {
  try {
    let baseUrl = `${API_BASE_URL}${ENDPOINTS.EVENTS.path}`;

    if (bbox) {
      const bboxString = bbox.join('%2C');
      baseUrl += `bbox=${bboxString}`;
    }

    if (limit !== null) {
      baseUrl += `${bbox ? '&' : ''}limit=${limit}`;
    }

    const response = await axios.get(baseUrl);

    if (response.data) {
      return response.data.map((item: { lat: any; lng: any; title: any; }) => ({
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

export function useEventsCluster(bbox: any[], limit: number) {
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
