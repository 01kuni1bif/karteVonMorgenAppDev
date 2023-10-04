// useEntries.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';

function fetchData(id: string) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('ID not provided'); // If ID is not provided, reject the promise
    }
    const formattedEntryIds = id.replace(/,/g, '%2C');
    const url = `${API_BASE_URL}${ENDPOINTS.ENTRIES.path}/${formattedEntryIds}`;
    axios.get(url)
      .then(response => {
        resolve(response.data); // Resolve the promise with the data
      })
      .catch(error => {
        console.error('Fehler bei der Anfrage:', error);
        reject(error); // Reject the promise with the error
      });
  });
}

export function useEntries(id: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id && id !== "") {
      fetchData(id)
        .then((data: any) => setData(data)) // Set state with response.data
        .catch(error => console.error('Error fetching data:', error)); // Log any errors
    }
  }, [id]);

  return data; // This will now be response.data or null if data is not loaded yet
}
