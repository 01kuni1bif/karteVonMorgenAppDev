// useSearch.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig';

async function fetchData(bbox: string, org_tag: string | null, categories: string[] | null, text: string | null, ids: string | null, tags: string | null, status: string | null, limit: number | null) {
  const queryParams = {
    bbox: bbox,
    org_tag: org_tag,
    categories: categories ? categories.join(',') : null, // Join the categories array into a comma-separated string
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
  const response = await axios.get(url);

  if (response.data && response.data.visible && Array.isArray(response.data.visible)) {
    return response.data.visible;
  } else {
    throw new Error('Invalid data in API response');
  }
}

export function useSearch(
  bbox: string | null = null,
  org_tag: string | null = null,
  categories: string[] | null = null,
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
        .then(data => {
          setData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [bbox, org_tag, categories, text, ids, tags, status, limit]);

  return data; // Return isLoading along with data
}


