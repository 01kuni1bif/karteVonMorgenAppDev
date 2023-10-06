// useCategories.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';

async function fetchData(category: any) {
  try {
    if (!category) {
      return null; // If category is not provided, return early or handle accordingly.
    }

    let queryParams = {};
    if (category === "2cd00bebec0c48ba9db761da48678134") {
      queryParams = {
        ...ENDPOINTS.SEARCH.defaultQueryParams, // Füge Standardparameter hinzu
        categories: ENDPOINTS.SEARCH.flexibleParams.initative, // Füge benutzerdefinierte Parameter hinzu
      };

    } else if (category === "77b3c33a92554bcf8e8c2c86cedd6f6f") {
      queryParams = {
        ...ENDPOINTS.SEARCH.defaultQueryParams, // Füge Standardparameter hinzu
        categories: ENDPOINTS.SEARCH.flexibleParams.company, // Füge benutzerdefinierte Parameter hinzu
      };
    }

    const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;


    const response = await axios.get(url, {
      params: queryParams,
    });

    // Handle die Antwort hier
    console.log(response.data);
  } catch (error) {
    // Handle Fehler hier
    console.error('Fehler bei der Anfrage:', error);
  }
}

function useCategories(category: unknown) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDataAndSetData() {
      const result = await fetchData(category);
      if (result !== undefined && result !== null) {
        setData(result);
      }
    }

    fetchDataAndSetData();
  }, [category]);

  return data;
}

export default useCategories;
