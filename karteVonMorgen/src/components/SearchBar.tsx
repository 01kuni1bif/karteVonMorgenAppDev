// SearchBar.tsx
import { useState, useEffect } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import './SearchBar.css';
import { useSearch } from '../hooks/useSearch';

function SearchBar() {
  const bbox = "42.27,-7.97,52.58,38.25"
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults  = useSearch(bbox,null,null,searchQuery,null,null,null,5);

  useEffect(() => {
    console.log('searchQuery wurde geändert:', searchQuery);
    console.log(searchResults)
  }, [searchQuery]);

  // Funktion zum Verarbeiten von Klicks auf Vorschläge
  const handleSuggestionClick = (suggestion: string) => {
    console.log(`Vorschlag geklickt: ${suggestion}`);
  };

  return (
    <div>
      {/* Suchleiste */}
      <IonSearchbar
        placeholder='Wonach suchst du? (# für Tags)'
        onIonChange={(e) => {
          const query = e.target.value;
          setSearchQuery(query);
        }}
      />
       {searchQuery.length > 0 && searchResults && searchResults.length > 0 && (
        <IonList>
          {searchResults !== null && searchResults.map((suggestion, index) => (
            <IonItem key={index} onClick={() => handleSuggestionClick(suggestion.title)}>
              {suggestion.title}
            </IonItem>
          ))}
        </IonList>
      )} 
    </div>
  );
}

export default SearchBar;
