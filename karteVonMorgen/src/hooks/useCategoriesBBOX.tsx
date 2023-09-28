import axios from 'axios';
import { useEffect, useState } from 'react';

function useCategoriesBBOX(category: string | null, limit: any | null, bbox: string [] | null) {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        //TODO: hier könnte noch ein Fehler sein ist noch nicht getestet
        // Beginnen Sie mit der Basis-URL
        let baseUrl = 'https://dev.ofdb.io/v0/search?';


        // Fügen Sie die bbox zur URL hinzu, wenn sie vorhanden ist
        if (bbox) {
            const bboxString = bbox.join('%2C');
            baseUrl += `bbox=${bboxString}`;
        }
        // Fügen Sie die bbox zur URL hinzu, wenn sie vorhanden ist

        // Fügen Sie das Limit zur URL hinzu, wenn es vorhanden ist
        if (category) {
            baseUrl += '&' + category;
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
                  console.log(extractedData);
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

export default useCategoriesBBOX;
