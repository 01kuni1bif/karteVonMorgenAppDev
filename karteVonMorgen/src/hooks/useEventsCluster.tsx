// useEventsCluster.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiEndpoints';

async function fetchClusterEventData(bbox: any[], limit: number) {
  let baseUrl = `${API_BASE_URL}${ENDPOINTS.EVENTS.path}`;

  if (bbox) {
    const bboxString = bbox.join('%2C');
    baseUrl += `bbox=${bboxString}`;
  }

  if (limit !== null) {
    baseUrl += `${bbox ? '&' : ''}limit=${limit}`;
  }

  const response = await axios.get(baseUrl);

  if (response.data && Array.isArray(response.data)) {
    const data = response.data.map((item: { lat: any; lng: any; title: any; }) => ({
      lat: item.lat,
      lng: item.lng,
      title: item.title,
    }));
    
    return data;
  } else {
    throw new Error('Invalid data in API response');
  }
}

export function useEventsCluster(bbox: any[], limit: number) {
  const [data, setData] = useState<{ lat: any; lng: any; title: any; }[]>([]);

  useEffect(() => {
    fetchClusterEventData(bbox, limit)
      .then(setData)
      .catch(error => console.error('Error fetching data:', error));
  }, [bbox, limit]);

  return data;
}
