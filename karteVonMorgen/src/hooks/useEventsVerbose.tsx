import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

function useEventsVerbose(bbox: string | null,tag: string | null = null,
  
  text: string | null = null,
  created_by: string | null ) {

  const [data, setData] = useState<any>(null);

  let url = `${API_BASE_URL}${ENDPOINTS.EVENTS.path}`;

  if(bbox == null){
    bbox = '42.27,-7.97,52.58,38.25'
  }

  

  const queryParams = {
    bbox: `${bbox}`, // Bounding Box (immer vorhanden)
    tag: `${tag}`, // Organisatorisches Tag (optional)
    text: `${text}`, // Textsuche (optional)
    created_by: `${created_by}`, // IDs (optional)
    
  };


  if(bbox) url += `?bbox=${encodeURIComponent(queryParams.bbox)}`;
  if (tag) url += `&org_tag=${encodeURIComponent(queryParams.tag)}`;
  if (text) url += `&categories=${encodeURIComponent(queryParams.text)}`;
  if (created_by) url += `&text=${encodeURIComponent(queryParams.created_by)}`;
 

  


  useEffect(() => {
    axios
      .get(
        url
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
