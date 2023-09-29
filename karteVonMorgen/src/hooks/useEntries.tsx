/* import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useEntries(entryIds: string) {
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

export default useEntries; */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';

async function fetchData(entryIds: any) {
    try {
        if (!entryIds) {
            return null; // If category is not provided, return early or handle accordingly.
        }

        const formattedEntryIds = entryIds.replace(/,/g, '%2C');

        const url = `${API_BASE_URL}${ENDPOINTS.ENTRIES.path}/${formattedEntryIds}`;

        const response = await axios.get(url);

        // Handle die Antwort hier
        console.log(response.data);

        // Handle die Antwort hier
        console.log(response.data);
    } catch (error) {
        // Handle Fehler hier
        console.error('Fehler bei der Anfrage:', error);
    }
}

    
        
        


function useEntries(entryIds: string) { 
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchDataAndSetData() {
            const result = await fetchData(entryIds);
            if (result !== undefined && result !== null) {
                setData(result);
            }
        }

        fetchDataAndSetData();
    }, [entryIds]);

    return data;
}

export default useEntries;

