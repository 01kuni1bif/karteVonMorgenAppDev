import React, { useState } from 'react';
import { IonSearchbar } from '@ionic/react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<{ lat: any; lng: any; title: any; }[]>([]);
    const handleInputChange = (event) => {
        const newValue = event.detail.value; // Verwenden Sie event.detail.value, um den Wert zu erhalten
        console.log("ich bin drin");
        setSearchTerm(newValue);

        // Hier können Sie Ihren API-Aufruf durchführen, um Suchergebnisse zu erhalten
        // Ersetzen Sie 'Ihre_API_URL' durch die tatsächliche API-URL

        fetch(`https://dev.ofdb.io/v0/search?bbox=42.27%2C-7.97%2C52.58%2C38.25&text=${newValue}&limit=10`)
            .then(response => response.json())
            .then(data => {
                if (data.visible && Array.isArray(data.visible)) {
                    // Erstelle ein neues Array, um die extrahierten Daten zu speichern
                    const extractedData = [];

                    // Durchlaufe das visible-Array und extrahiere die gewünschten Felder
                    for (const item of data.visible) {
                        extractedData.push({
                            lat: item.lat,
                            lng: item.lng,
                            title: item.title,
                        });
                    }
                    setSearchResults(extractedData);
                    console.log(extractedData);
                    // Hier geben wir die gefilterten Daten in der Konsole aus
                } else {
                    console.error('Ungültige Daten in der API-Antwort');
                    setSearchResults([]); // Setzen Sie searchResults auf ein leeres Array, wenn die Daten ungültig sind
                }
            })
            .catch(error => {
                console.error('Fehler beim API-Aufruf:', error);
                setSearchResults([]); // Setzen Sie searchResults auf ein leeres Array, wenn ein Fehler auftritt
            });
    };

    return (
        <div>
            <IonSearchbar
                value={searchTerm}
                onIonChange={handleInputChange}
            ></IonSearchbar>

            {/* Hier können Sie Ihre Suchergebnisse anzeigen */}
            {searchResults.map((result, index) => (
                <div key={index}>{result.title}</div>
            ))}
        </div>
    );
}

export default SearchBar;
