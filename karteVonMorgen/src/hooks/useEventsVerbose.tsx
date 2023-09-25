import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useEventsVerbose() {
  const [data, setData] = useState<any>(null);

  
  


  useEffect(() => {
    axios
      .get(
        'https://dev.ofdb.io/v0/events?bbox=42.27%2C-7.97%2C52.58%2C38.25&limit=3500'
      )
      .then((response) => {
        if (response.data ) {
          // Erstelle ein neues Array, um die extrahierten Daten zu speichern
          const extractedData = [];

          // Durchlaufe das visible-Array und extrahiere die gewünschten Felder
          for (const item of response.data) {
            extractedData.push({
                lat: item.lat || 0,
                lng: item.lng || 0,
                title: item.title || '',
                id: item.id || '',
                description: item.description || '',
                street: item.street || '',
                zip: item.zip || '',
                city: item.city || '',
                country: item.country || '',
                email: item.email || '',
                telephone: item.telephone || '',
                homepage: item.homepage || '',
                tags: item.tags || [],
                organizer: item.organizer || '',


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

export default useEventsVerbose;
