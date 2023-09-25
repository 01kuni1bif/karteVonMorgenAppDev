import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useEventsVerbose() {
    const [data, setData] = useState<any>(null);





    useEffect(() => {
        axios
            .get(
                'https://dev.ofdb.io/v0/tags'
            )
            .then((response) => {
                if (response.data) {
                    // Erstelle ein neues Array, um die extrahierten Daten zu speichern
                    

                    // Durchlaufe das visible-Array und extrahiere die gewünschten Felder
                   
                    setData(response.data);
                    console.log(response.data);
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
