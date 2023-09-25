import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useSearchbar(org_tag: string | null = null,
  categories: string | null = null,
  text: string | null = null,
  ids: string | null = null,
  tags: string | null = null,
  status: string | null = null,
  limit: BigInteger | null = null) {
  const [data, setData] = useState<any>(null);

  let baseUrl = 'https://dev.ofdb.io/v0/search';


  const queryParams = {
    bbox: '42.27,-7.97,52.58,38.25', // Bounding Box (immer vorhanden)
    org_tag: '', // Organisatorisches Tag (optional)
    categories: '', // Kategorien (optional)
    text: '', // Textsuche (optional)
    ids: '', // IDs (optional)
    tags: '', // Tags (optional)
    status: '', // Status (optional)
    limit: 20, // Limit (optional, Standardwert: 20)
  };
  
  // Füge die optionalen Parameter hinzu, wenn sie vorhanden sind
  if (org_tag) baseUrl += `&org_tag=${encodeURIComponent(queryParams.org_tag)}`;
  if (categories) baseUrl += `&categories=${encodeURIComponent(queryParams.categories)}`;
  if (text) baseUrl += `&text=${encodeURIComponent(queryParams.text)}`;
  if (ids) baseUrl += `&ids=${encodeURIComponent(queryParams.ids)}`;
  if (tags) baseUrl += `&tags=${encodeURIComponent(queryParams.tags)}`;
  if (status) baseUrl += `&status=${encodeURIComponent(queryParams.status)}`;
  if (limit) baseUrl += `&limit=${queryParams.limit}`;
  
  // Jetzt enthält baseUrl die vollständige variable URL mit optionalen Parametern
  console.log(baseUrl);
  

 
  
  useEffect(() => {
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

export default useSearchbar;
