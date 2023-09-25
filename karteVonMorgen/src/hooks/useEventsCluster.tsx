import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useEventsCluster(bbox: string[] | null, limit: number | null) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Beginnen Sie mit der Basis-URL
    let apiUrl = 'https://dev.ofdb.io/v0/events?';

    // Fügen Sie die bbox zur URL hinzu, wenn sie vorhanden ist
    if (bbox) {
      const bboxString = bbox.join('%2C');
      apiUrl += `bbox=${bboxString}`;
    }

    // Fügen Sie das Limit zur URL hinzu, wenn es vorhanden ist
    if (limit !== null) {
      apiUrl += `${bbox ? '&' : ''}limit=${limit}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data) {
          // Erstelle ein neues Array, um die extrahierten Daten zu speichern
          const extractedData = [];

          // Durchlaufe das visible-Array und extrahiere die gewünschten Felder
          for (const item of response.data) {
            extractedData.push({
              lat: item.lat,
              lng: item.lng,
              title: item.title,
            });
          }

          setData(extractedData);
          console.log("Data wird geloggt");
          console.log(extractedData);
          // Hier geben wir die gefilterten Daten in der Konsole aus
        } else {
          console.error('Ungültige Daten in der API-Antwort');
        }
      })
      .catch((error) => {
        console.error('Fehler bei der API-Anforderung:', error);
      });
  }, [bbox, limit]);

  return data;
}

export default useEventsCluster;
