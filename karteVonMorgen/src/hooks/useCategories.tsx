// useCategories.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function fetchData(category: string) {
  if (!category) {
    return Promise.reject('Category not provided');
  }

  let queryParams = {};
  if (category === "2cd00bebec0c48ba9db761da48678134") {
    queryParams = {
      ...ENDPOINTS.SEARCH.defaultQueryParams,
      categories: ENDPOINTS.SEARCH.flexibleParams.initiative,
    };
  } else if (category === "77b3c33a92554bcf8e8c2c86cedd6f6f") {
    queryParams = {
      ...ENDPOINTS.SEARCH.defaultQueryParams,
      categories: ENDPOINTS.SEARCH.flexibleParams.company,
    };
  }

  const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;

  return axios.get(url, { params: queryParams })
    .then(response => response.data)
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error);
      throw error;
    });
}


export function useCategories(category: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (category && category !== "") {
      fetchData(category)
        .then((data: any) => setData(data)) // Set state with response.data
        .catch(error => console.error('Error fetching data:', error)); // Log any errors
    }
  }, [category]);

  return data; // This will now be response.data or null if data is not loaded yet
}
