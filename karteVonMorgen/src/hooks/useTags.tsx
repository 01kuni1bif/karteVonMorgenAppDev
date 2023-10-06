// useTags.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function fetchData() {
  const url = `${API_BASE_URL}${ENDPOINTS.TAGS.path}`;

  return axios.get(url)
    .then(response => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error('Invalid data in API response');
      }
    })
    .catch(error => {
      console.error('Error in API request:', error);
      throw error;
    });
}

export function useTags() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data: any) => setData(data)) // Set state with response.data
      .catch(error => console.error('Error fetching data:', error)); // Log any errors
  }, []);

  return data; // This will now be response.data or null if data is not loaded yet
}
