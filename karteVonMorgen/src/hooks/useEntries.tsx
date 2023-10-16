// useEntries.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiEndpoints';
import { EntryData } from '../consts/types';

async function fetchData(ids: string, org_tag: string | null): Promise<EntryData> {
  if (!ids.length) {
    throw new Error('IDs not provided');
  }

  let url = `${API_BASE_URL}${ENDPOINTS.ENTRIES.path}${ids}`;

  if (org_tag) {
    url += `?org_tag=${encodeURIComponent(org_tag)}`;
  }

  const response = await axios.get(url);

  return response.data[0];
}

export function useEntries({
  ids = null,
  org_tag = null
}: {
  ids: string | null,
  org_tag: string | null
}): EntryData | null {

  const [data, setData] = useState<EntryData | null>(null);

  useEffect(() => {
    if (ids) {
      fetchData(ids, org_tag)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [ids, org_tag]);

  return data;
}
