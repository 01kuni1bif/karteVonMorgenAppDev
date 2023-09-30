import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';

async function fetchData(entryIds: any) {
  try {
    if (!entryIds) {
      return null; // If category is not provided, return early or handle accordingly.
    }
    const formattedEntryIds = entryIds.replace(/,/g, '%2C');
    const url = `${API_BASE_URL}${ENDPOINTS.ENTRIES.path}/${formattedEntryIds}`;
    const response = await axios.get(url);
    // Handle die Antwort hier
    console.log(response.data);
    // Handle die Antwort hier
    console.log(response.data);

  } catch (error) {
    // Handle Fehler hier
    console.error('Fehler bei der Anfrage:', error);
  }
}

export function useEntries(entryIds: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDataAndSetData() {
      const result = await fetchData(entryIds);
      if (result !== undefined && result !== null) {
        setData(result);
      }
    }

    fetchDataAndSetData();
  }, [entryIds]);

  return data;
}
