import React, { useState, useEffect } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import './search.css';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<{ lat: any; lng: any; title: any; }[]>([]);

    // Test-Array mit Suchvorschlägen
    let testSuggestions = [
        { name: 'Apfel' },
        { name: 'Banane' },
        { name: 'Kirsche' },
        { name: 'Dattel' },
        { name: 'Erdbeere' },
        { name: 'Feige' },
        { name: 'Grapefruit' },
        { name: 'Himbeere' },
        { name: 'Zitrone' },
        { name: 'Mango' },
        { name: 'Orange' },
        { name: 'Pfirsich' },
        { name: 'Ananas' },
        { name: 'Birne' },
        { name: 'Pflaume' }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<{ name: string }[]>([]);

    useEffect(() => {
        // Filtere die Vorschläge basierend auf der Eingabe
        const filtered = testSuggestions.filter((suggestion) =>
            suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredSuggestions(filtered);
    }, [searchQuery]);

    // Funktion zum Verarbeiten von Klicks auf Vorschläge
    const handleSuggestionClick = (suggestion: string) => {
        console.log(`Vorschlag geklickt: ${suggestion}`);
    };

    return (
        <div>
            {/* Suchleiste */}
            <IonSearchbar placeholder='Wonach suchst du? (# für Tags)' onIonChange={(e) => { setSearchQuery(e.target.value) }} />

            {searchQuery.length > 0 && (
                <IonList>
                    {filteredSuggestions.map((suggestion, index) => (
                        <IonItem key={index} onClick={() => handleSuggestionClick(suggestion.name)}>
                            {suggestion.name}
                        </IonItem>
                    ))}
                </IonList>
            )}
        </div>
    );
}

export default SearchBar;
