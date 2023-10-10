// useTags.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig';

async function fetchData() {
  const url = `${API_BASE_URL}${ENDPOINTS.TAGS.path}`;

  const response = await axios.get(url);

  if (response.data) {
    return response.data;
  } else {
    throw new Error('Invalid data in API response');
  }
}

export function useTags() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return data;
}
