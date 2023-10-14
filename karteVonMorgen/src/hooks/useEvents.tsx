// useEvents.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiEndpoints';
import { EventData } from '../consts/types';

async function fetchDataById(id: string): Promise<EventData> {
  const url = `${API_BASE_URL}${ENDPOINTS.EVENTS_BY_ID.path}${id}`;
  const response = await axios.get(url);

  if (response.data) {
    return response.data;
  } else {
    throw new Error('Invalid data in API response');
  }
}

async function fetchDataByParams(
  bbox: string,
  limit: number | null,
  tag: string | null,
  start_min: number | null,
  start_max: number | null,
  end_min: number | null,
  end_max: number | null,
  text: string | null,
  created_by: string | null
): Promise<EventData[]> {

  const queryParams = {
    bbox: bbox || '42.27,-7.97,52.58,38.25',
    limit: limit,
    org_tag: tag,
    start_min: start_min,
    start_max: start_max,
    end_min: end_min,
    end_max: end_max,
    text: text,
    created_by: created_by
  };

  const query = Object.entries(queryParams)
    .filter(([_, value]) => value !== null)
    .map(([_, value]) => `${_}=${encodeURIComponent(value as string | number)}`)
    .join('&');

  const url = `${API_BASE_URL}${ENDPOINTS.EVENTS_BY_PARAMS.path}?${query}`;

  const response = await axios.get(url);

  if (response.data && Array.isArray(response.data)) {
    return response.data;
  } else {
    throw new Error('Invalid data in API response');
  }
}

export function useEvents({
  bbox = null,
  limit = null,
  tag = null,
  start_min = null,
  start_max = null,
  end_min = null,
  end_max = null,
  text = null,
  created_by = null,
  id = null
}: {
  bbox?: string | null,
  limit?: number | null,
  tag?: string | null,
  start_min?: number | null,
  start_max?: number | null,
  end_min?: number | null,
  end_max?: number | null,
  text?: string | null,
  created_by?: string | null,
  id?: string | null
} = {}): EventData | EventData[] {

  const [data, setData] = useState<EventData | EventData[]>(null || []);

  useEffect(() => {
    if (id) {
      fetchDataById(id)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    } else if (bbox) {
      fetchDataByParams(bbox, limit, tag, start_min, start_max, end_min, end_max, text, created_by)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [bbox, limit, tag, start_min, start_max, end_min, end_max, text, created_by, id]);

  return data;
}
