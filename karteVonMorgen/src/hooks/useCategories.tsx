import axios from 'axios';
import { useEffect, useState } from 'react';

function useCategories(category: string, limit: any) {
    const [data, setData] = useState<any>(null);
    useEffect(() => {

        // Beginnen Sie mit der Basis-URL
        let baseUrl = 'https://dev.ofdb.io/v0/search?bbox=42.27%2C-7.97%2C52.58%2C38.25&';

        // Fügen Sie die bbox zur URL hinzu, wenn sie vorhanden ist

        // Fügen Sie das Limit zur URL hinzu, wenn es vorhanden ist
        if (category) {
            baseUrl += category;
        }
        if (limit) {
            baseUrl += '&' + limit;
        }
        axios
            .get(
                baseUrl
            )
            .then((response) => {
                if (response.data && response.data.visible && Array.isArray(response.data.visible)) {
                    // Erstelle ein neues Array, um die extrahierten Daten zu speichern
                    const extractedData = [];

                    // Durchlaufe das visible-Array und extrahiere die gewünschten Felder
                    for (const item of response.data.visible) {
                        extractedData.push({
                            lat: item.lat,
                            lng: item.lng,
                            title: item.title,
                        });
                    }

                    setData(extractedData);

                    // Hier geben wir die gefilterten Daten in der Konsole aus
                } else {
                    console.error('Ungültige Daten in der API-Antwort');
                }
            })
            .catch((error) => {
                console.error('Fehler bei der API-Anforderung:', error);
            });
    }, []); // Leeres Array, um sicherzustellen, dass dieser Effekt nur einmal ausgeführt wird

    return data;
}

export default useCategories;
