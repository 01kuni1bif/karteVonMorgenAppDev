// useCategories.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

async function fetchData(category: string) {
  if (!category) {
    throw new Error('Category not provided');
  }

  const queryParams = category === "2cd00bebec0c48ba9db761da48678134" 
    ? { ...ENDPOINTS.SEARCH.defaultQueryParams, categories: ENDPOINTS.SEARCH.flexibleParams.initiative }
    : { ...ENDPOINTS.SEARCH.defaultQueryParams, categories: ENDPOINTS.SEARCH.flexibleParams.company };

  const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;

  try {
    const response = await axios.get(url, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error);
    throw error;
  }
}

export function useCategories(category: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (category && category !== "") {
      fetchData(category)
        .then(setData)
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [category]);

  return data;
}
