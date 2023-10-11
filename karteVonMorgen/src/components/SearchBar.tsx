// SearchBar.tsx
import { useState } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import { useSearch } from '../hooks/useSearch';
import { LatLngExpression } from 'leaflet';
import * as stringSimilarity from 'string-similarity';
import './SearchBar.css';

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
  const bbox = "42.27,-7.97,52.58,38.25";
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults: Suggestion[] = useSearch(bbox, null, null, searchQuery, null, null, null, null);
  // Sort the searchResults by letter-based relevance (case-insensitive)
  const sortedSearchResults = searchResults && Array.isArray(searchResults)
    ? [...searchResults].sort((a, b) => {
      // Convert query and suggestion titles to lowercase
      const queryLower = searchQuery.toLowerCase();
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      // Check if either title starts with the query
      const startsWithA = titleA.startsWith(queryLower);
      const startsWithB = titleB.startsWith(queryLower);
      // Prioritize suggestions that start with the query
      if (startsWithA && !startsWithB) {
        return -1; // Move 'a' ahead if it starts with the query and 'b' doesn't
      } else if (!startsWithA && startsWithB) {
        return 1; // Move 'b' ahead if it starts with the query and 'a' doesn't
      }
      // If both start with or without the query, sort by Levenshtein distance
      const similarityA = stringSimilarity.compareTwoStrings(titleA, queryLower);
      const similarityB = stringSimilarity.compareTwoStrings(titleB, queryLower);

      return similarityB - similarityA; // Sort by descending similarity
    }).slice(0, 15) // Limit to the top 15 suggestions
    : [];

  const handleSuggestionClick = (suggestion: Suggestion) => {
    // Calculate new map center and zoom based on the suggestion's coordinates
    const newMapCenter: LatLngExpression = [suggestion.lat, suggestion.lng];
    const newMapZoom = 16; // You can adjust the desired zoom level
    // Update the map center and zoom
    setMapCenter(newMapCenter);
    setMapZoom(newMapZoom);
  };

  return (
    <div>
      <IonSearchbar
        placeholder='Wonach suchst du? (# für Tags)'
        onIonInput={(e) => {
          const query = e.target.value || '';
          setSearchQuery(query);
        }}
      />
      {searchQuery.length > 0 && sortedSearchResults.length > 0 && (
        <IonList>
          {sortedSearchResults.map((suggestion: Suggestion, index) => (
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
