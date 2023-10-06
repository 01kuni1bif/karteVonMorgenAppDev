// useTags.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';

export function useTags() {
  const [data, setData] = useState<any>(null);
  const url = `${API_BASE_URL}${ENDPOINTS.TAGS.path}`;

  useEffect(() => {
    axios
      .get(
        url
      )
      .then((response) => {
        if (response.data) {
          // Erstelle ein neues Array, um die extrahierten Daten zu speichern

          // Durchlaufe das visible-Array und extrahiere die gewünschten Felder

          setData(response.data);
          console.log(response.data);

        } else {
          // Hier geben wir die gefilterten Daten in der Konsole aus
          console.error('Ungültige Daten in der API-Antwort');
        }
      })
      .catch((error) => {
        console.error('Fehler bei der API-Anforderung:', error);
      });
  }, []); // Leeres Array, um sicherzustellen, dass dieser Effekt nur einmal ausgeführt wird

  return data;
}
