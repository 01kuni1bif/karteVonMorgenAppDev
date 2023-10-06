// useEvents.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function fetchData(bbox: string, tag: string | null, text: string | null, created_by: string | null) {
  return new Promise((resolve, reject) => {
    if (!bbox) {
      reject('Bounding Box not provided'); // If Bounding Box is not provided, reject the promise
    }

    let url = `${API_BASE_URL}${ENDPOINTS.EVENTS.path}`;

    const queryParams = {
      bbox: bbox,
      tag: tag,
      text: text,
      created_by: created_by,
    };

    if (bbox) url += `?bbox=${encodeURIComponent(queryParams.bbox)}`;
    if (tag) url += `&org_tag=${encodeURIComponent(queryParams.tag as string)}`;
    if (text) url += `&categories=${encodeURIComponent(queryParams.text as string)}`;
    if (created_by) url += `&text=${encodeURIComponent(queryParams.created_by as string)}`;

    axios.get(url)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          // Create a new array to store the extracted data
          const extractedData = response.data.map(item => ({
            lat: item.lat || 0,
            lng: item.lng || 0,
            title: item.title || '',
            id: item.id || '',
            description: item.description || '',
            street: item.street || '',
            zip: item.zip || '',
            city: item.city || '',
            country: item.country || '',
            email: item.email || '',
            telephone: item.telephone || '',
            homepage: item.homepage || '',
            tags: item.tags || [],
            organizer: item.organizer || '',
          }));

          resolve(extractedData); // Resolve the promise with the data
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

export function useEvents(
  bbox: string | null = '42.27,-7.97,52.58,38.25',
  tag: string | null = null,
  text: string | null = null,
  created_by: string | null = null
) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (bbox && bbox !== "") {
      fetchData(bbox, tag, text, created_by)
        .then((data: any) => setData(data)) // Set state with response.data
        .catch(error => console.error('Error fetching data:', error)); // Log any errors
    }
  }, [bbox, tag, text, created_by]);

  return data; // This will now be response.data or null if data is not loaded yet
}
