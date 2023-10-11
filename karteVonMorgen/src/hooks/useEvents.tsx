// useEvents.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig';

async function fetchData(bbox: string | null, tag: string | null, text: string | null, created_by: string | null, id: string | null) {

  if (id) {
    let url1 = `${API_BASE_URL}${ENDPOINTS.EVENTS.path}/${id}`
    const response1 = await axios.get(url1);

    if (response1.data && Array.isArray(response1.data)) {
      // Create a new array to store the extracted data
      const extractedData = response1.data.map(item => ({
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
      return extractedData;
    } else {
      throw new Error('Invalid data in API response');
    }

  } else {
    if (!bbox) {
      bbox = '42.27,-7.97,52.58,38.25';
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

    const response = await axios.get(url);

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
      return extractedData;
    } else {
      throw new Error('Invalid data in API response');
    }
  }
}

export function useEvents(
  bbox: string | null = null,
  tag: string | null = null,
  text: string | null = null,
  created_by: string | null = null,
  id: string | null = null
) {
  const [data, setData] = useState<{ lat: any; lng: any; title: any; id: any; description: any; street: any; zip: any; city: any; country: any; email: any; telephone: any; homepage: any; tags: any; organizer: any; }[]>([]);

  useEffect(() => {
    if (bbox && bbox !== "") {
      fetchData(bbox, tag, text, created_by, null)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    } else if (id) {
      fetchData(null, null, null, null, id)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [bbox, tag, text, created_by, id]);

  return data;
}
