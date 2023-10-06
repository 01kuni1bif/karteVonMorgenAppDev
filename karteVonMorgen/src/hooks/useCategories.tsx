// useCategories.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function fetchData(category: string) {
  return new Promise((resolve, reject) => {
    if (!category) {
      reject('Category not provided'); // If category is not provided, reject the promise
    }

    let queryParams = {};
    if (category === "2cd00bebec0c48ba9db761da48678134") {
      queryParams = {
        ...ENDPOINTS.SEARCH.defaultQueryParams, // Add default parameters
        categories: ENDPOINTS.SEARCH.flexibleParams.initiative, // Add custom parameters
      };

    } else if (category === "77b3c33a92554bcf8e8c2c86cedd6f6f") {
      queryParams = {
        ...ENDPOINTS.SEARCH.defaultQueryParams, // Add default parameters
        categories: ENDPOINTS.SEARCH.flexibleParams.company, // Add custom parameters
      };
    }

    const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;

    axios.get(url, { params: queryParams })
      .then(response => {
        resolve(response.data); // Resolve the promise with the data
      })
      .catch(error => {
        console.error('Fehler bei der Anfrage:', error);
        reject(error); // Reject the promise with the error
      });
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
