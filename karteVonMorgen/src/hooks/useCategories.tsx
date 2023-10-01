import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';

async function fetchData(category: any, bbox: string | null) {
    try {
        if (!category) {
            return null; // If category is not provided, return early or handle accordingly.
        }

        let queryParams = {};

        if (category === "2cd00bebec0c48ba9db761da48678134" || category === "77b3c33a92554bcf8e8c2c86cedd6f6f") {
            // Wenn category entweder 'initiative' oder 'company' ist
            queryParams = {
                categories: category, // Kategorie setzen
            };

            if (bbox !== null) {
                queryParams = {
                    ...queryParams,
                    bbox: bbox,
                };
            }
        } else {
            return null; // Ungültige Kategorie, hier entsprechend behandeln
        }

        const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;

        const response = await axios.get(url, {
            params: queryParams,
        });

        // Handle die Antwort hier
        console.log(response.data);

        return response.data;
        
    } catch (error) {
        // Handle Fehler hier
        console.error('Fehler bei der Anfrage:', error);
    }
    
}









function useCategories(category: string, bbox: string | null, ids: string | null, tags: string | null, status: string | null) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchDataAndSetData() {
            const result = await fetchData(category, bbox);
            if (result !== undefined && result !== null) {
                console.log("ich bin drin ")
                setData(result);
            }
        }

        fetchDataAndSetData();
    }, [category]);

    return data;
}

export default useCategories;
