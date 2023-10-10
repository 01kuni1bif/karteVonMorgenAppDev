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

interface Suggestion {
  title: string;
  lat: number;
  lng: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ setMapCenter, setMapZoom }) => {
  const bbox = "42.27,-7.97,52.58,38.25"
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults: Suggestion[] = useSearch(bbox, null, null, searchQuery, null, null, null, 5);

  useEffect(() => {
    console.log('searchQuery wurde geändert:', searchQuery);
    console.log(searchResults)
  }, [searchQuery]);

  // Funktion zum Verarbeiten von Klicks auf Vorschläge
  const handleSuggestionClick = (suggestion: Suggestion) => {
    console.log(suggestion);
    console.log(suggestion.lat);
    console.log(suggestion.lng);
    setMapCenter([suggestion.lat, suggestion.lng]);
    setMapZoom(4);
  };

  return (
    <div>
      <IonSearchbar
        placeholder='Wonach suchst du? (# für Tags)'
        onIonChange={(e) => {
          const query = e.target.value || '';
          setSearchQuery(query);
        }}
      />
      {searchQuery.length > 0 && searchResults && Array.isArray(searchResults) && searchResults.length > 0 && (
        <IonList>
          {searchResults.map((suggestion: Suggestion, index) => (
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
