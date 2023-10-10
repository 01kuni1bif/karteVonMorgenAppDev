// SearchBar.tsx
import { useState, useEffect } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import './SearchBar.css';
import { useSearch } from '../hooks/useSearch';
import { LatLngExpression } from 'leaflet';


interface SearchBarProps {
  setMapCenter: (center: LatLngExpression) => void;
  setMapZoom: (zoom: number) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ setMapCenter, setMapZoom }) => {
  const bbox = "42.27,-7.97,52.58,38.25"
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useSearch(bbox, null, null, searchQuery, null, null, null, 5);

  useEffect(() => {
    console.log('searchQuery wurde geändert:', searchQuery);
    console.log(searchResults)
  }, [searchQuery]);

  // Funktion zum Verarbeiten von Klicks auf Vorschläge
  const handleSuggestionClick = (suggestion: any) => {
    console.log(suggestion);
    console.log(suggestion.lat);
    console.log(suggestion.lng);
    setMapCenter([suggestion.lat,suggestion.lng]);
    setMapZoom(4);
  };

  return (
    <div>
      {/* Suchleiste */}
      <IonSearchbar
        placeholder='Wonach suchst du? (# für Tags)'
        onIonInput={(e) => {
          const query = e.target.value;
          console.log(query);
          setSearchQuery(query);
        }}
      />
      {searchQuery.length > 0 && searchResults && searchResults.length > 0 && (
        <IonList>
          {searchResults !== null && searchResults.map((suggestion, index) => (
            <IonItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.title}
            </IonItem>
          ))}
        </IonList>
      )}
    </div>
  );
}

export default SearchBar;
