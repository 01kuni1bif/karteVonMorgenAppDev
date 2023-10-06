// useSearch.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function fetchData(bbox: string, org_tag: string | null, categories: string | null, text: string | null, ids: string | null, tags: string | null, status: string | null, limit: number | null) {
  return new Promise((resolve, reject) => {
    const queryParams = {
      bbox: bbox,
      org_tag: org_tag,
      categories: categories,
      text: text,
      ids: ids,
      tags: tags,
      status: status,
      limit: limit,
    };

    const query = Object.entries(queryParams)
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string | number)}`)
      .join('&');

    const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}?${query}`;

    axios.get(url)
      .then(response => {
        if (response.data && response.data.visible && Array.isArray(response.data.visible)) {
          resolve(response.data.visible); // Resolve the promise with the data
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

export function useSearch(
  bbox: string | null = null,
  org_tag: string | null = null,
  categories: string | null = null,
  text: string | null = null,
  ids: string | null = null,
  tags: string | null = null,
  status: string | null = null,
  limit: number | null = null
) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (bbox) {
      fetchData(bbox, org_tag, categories, text, ids, tags, status, limit)
        .then((result: any) => setData(result)) // Set state with response data
        .catch(error => console.error('Error fetching data:', error)); // Log any errors
    }
  }, [bbox, org_tag, categories, text, ids, tags, status, limit]);

  return data; // This will now be response.data or null if data is not loaded yet
}
