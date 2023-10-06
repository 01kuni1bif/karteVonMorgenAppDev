// useEntries.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';

async function fetchData(id: string) {
  if (!id) {
    throw new Error('ID not provided');
  }
  const formattedEntryIds = id.replace(/,/g, '%2C');
  const url = `${API_BASE_URL}${ENDPOINTS.ENTRIES.path}/${formattedEntryIds}`;

  const response = await axios.get(url);
  return response.data;
}

export function useEntries(id: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id && id !== "") {
      fetchData(id)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id]);

  return data;
}
