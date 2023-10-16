// useSearch.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiEndpoints';
import { SearchData } from '../consts/types';

async function fetchData(
  bbox: string,
  org_tag: string | null,
  categories: string[] | null,
  text: string | null,
  ids: string[] | null,
  tags: string[] | null,
  status: string | null,
  limit: number | null
): Promise<SearchData[]> {
  const queryParams = {
    bbox: bbox || '42.27,-7.97,52.58,38.25',
    org_tag: org_tag,
    categories: categories ? categories.join('%2C') : null,
    text: text,
    ids: ids ? ids.join('%2C') : null,
    tags: tags ? tags.join('%2C') : null,
    status: status,
    limit: limit,
  };

  const query = Object.entries(queryParams)
    .filter(([_, value]) => value !== null)
    .map(([_, value]) => `${_}=${encodeURIComponent(value as string | number)}`)
    .join('&');

  const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}?${query}`;

  const response = await axios.get(url);

  if (response.data && response.data.visible && Array.isArray(response.data.visible)) {
    return response.data.visible;
  } else {
    throw new Error('Invalid data in API response');
  }
}

export function useSearch({
  bbox = null,
  org_tag = null,
  categories = null,
  text = null,
  ids = null,
  tags = null,
  status = null,
  limit = null
}: {
  bbox?: string | null,
  org_tag?: string | null,
  categories?: string[] | null,
  text?: string | null,
  ids?: string[] | null,
  tags?: string[] | null,
  status?: string | null,
  limit?: number | null
} = {}): SearchData[] {
  
  const [data, setData] = useState<SearchData[]>([]);

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

  return data;
}
