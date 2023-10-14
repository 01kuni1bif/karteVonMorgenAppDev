// useEntries.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiEndpoints';
import { EntryData } from '../consts/types';

async function fetchData(ids: string[], org_tag?: string): Promise<EntryData[]> {
  if (!ids.length) {
    throw new Error('IDs not provided');
  }

  const formattedEntryIds = ids.join('%2C');

  let url = `${API_BASE_URL}${ENDPOINTS.ENTRIES.path}${formattedEntryIds}`;

  if (org_tag) {
    url += `?org_tag=${encodeURIComponent(org_tag)}`;
  }

  const response = await axios.get(url);

  return response.data;
}

export function useEntries({
  ids = [],
  org_tag = undefined
}: {
  ids: string[],
  org_tag?: string
} = { ids: [] }): EntryData[] {

  const [data, setData] = useState<EntryData[]>([]); // Use EntryData[] for type safety

  useEffect(() => {
    if (ids.length) {
      fetchData(ids, org_tag)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [ids, org_tag]);

  return data;
}
