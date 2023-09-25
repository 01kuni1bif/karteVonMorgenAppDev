import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useEntries(entryIds: string[]) {
  const [data, setData] = useState<any>(null);

  

  
  // Konvertiere das Array in einen komma-getrennten String
  const entryIdString = entryIds.join('%2C');
  
  // Erstelle die URL mit den Variablen
  const baseUrl = 'https://dev.ofdb.io/v0/entries/';
  const apiUrl = `${baseUrl}${entryIdString}`;
  
  // apiUrl enthält jetzt die vollständige URL mit den ersetzen Entry-IDs
  console.log(apiUrl);
  

  

  useEffect(() => {
    axios
      .get(
        apiUrl
      )
      .then((response) => {
        if (response.data ) {
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

export default useEntries;
