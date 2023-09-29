import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function useSearchbar(org_tag: string | null = null,
  categories: string | null = null,
  text: string | null = null,
  ids: string | null = null,
  tags: string | null = null,
  status: string | null = null,
  limit: number | null = null) {
  const [data, setData] = useState<any>(null);

  let baseUrl =`${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;

  console.log(text);
  console.log(limit);


  const queryParams = {
    bbox: '42.27,-7.97,52.58,38.25', // Bounding Box (immer vorhanden)
    org_tag: `${org_tag}`, // Organisatorisches Tag (optional)
    categories: `${status}`, // Kategorien (optional)
    text: `${text}`, // Textsuche (optional)
    ids: `${ids}`, // IDs (optional)
    tags: `${tags}`, // Tags (optional)
    status: `${status}`, // Status (optional)
    limit: limit, // Limit (optional, Standardwert: 20)
  };
  
  // Füge die optionalen Parameter hinzu, wenn sie vorhanden sind
  baseUrl += `?bbox=${encodeURIComponent(queryParams.bbox)}`
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
          

          setData(response.data.visible);
          
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
