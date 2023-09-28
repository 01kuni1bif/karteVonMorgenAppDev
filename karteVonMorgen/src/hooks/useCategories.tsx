import axios from 'axios';
import { useEffect, useState } from 'react';

async function fetchData(category, limit) {
    try {
        if (!category) {
            return null; // If category is not provided, return early or handle accordingly.
        }

        const baseUrl = 'https://dev.ofdb.io/v0/search';
        const queryParams = new URLSearchParams({
            bbox: '42.27,-7.97,52.58,38.25',
            categories: category,
            limit: limit || '',
        });

        const url = `${baseUrl}?${queryParams.toString()}`;
        const response = await axios.get(url);

        if (response.data && response.data.visible && Array.isArray(response.data.visible)) {
            return response.data.visible.map(item => ({
                lat: item.lat,
                lng: item.lng,
                title: item.title,
            }));
        } else {
            console.error('Ungültige Daten in der API-Antwort');
            return null;
        }
    } catch (error) {
        console.error('Fehler bei der API-Anforderung:', error);
        return null;
    }
}

function useCategories(category, limit) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchDataAndSetData() {
            const result = await fetchData(category, limit);
            if (result !== null) {
                setData(result);
            }
        }

        fetchDataAndSetData();
    }, [category, limit]);

    return data;
}

export default useCategories;
