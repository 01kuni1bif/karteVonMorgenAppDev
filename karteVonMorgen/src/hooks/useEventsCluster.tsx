// useEventsCluster.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function fetchClusterEventData(bbox: any[], limit: number) {
  return new Promise((resolve, reject) => {
    let baseUrl = `${API_BASE_URL}${ENDPOINTS.EVENTS.path}`;

    if (bbox) {
      const bboxString = bbox.join('%2C');
      baseUrl += `bbox=${bboxString}`;
    }

    if (limit !== null) {
      baseUrl += `${bbox ? '&' : ''}limit=${limit}`;
    }

    axios.get(baseUrl)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.map((item: { lat: any; lng: any; title: any; }) => ({
            lat: item.lat,
            lng: item.lng,
            title: item.title,
          }));
          resolve(data); // Resolve the promise with the data
        } else {
          reject('Invalid data in API response');
        }
      })
      .catch(error => {
        console.error('Error in API request:', error);
        reject(error); // Reject the promise with the error
      });
  });
}

export function useEventsCluster(bbox: any[], limit: number) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchClusterEventData(bbox, limit)
      .then((data: any) => setData(data)) // Set state with response.data
      .catch(error => console.error('Error fetching data:', error)); // Log any errors
  }, [bbox, limit]);

  return data; // This will now be response.data or null if data is not loaded yet
}
