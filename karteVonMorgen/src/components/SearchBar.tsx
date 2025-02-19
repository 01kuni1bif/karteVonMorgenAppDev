// SearchBar.tsx
import { useState } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import { LatLngExpression } from 'leaflet';
import * as stringSimilarity from 'string-similarity';
import { useSearch } from '../hooks/useSearch';
import { SearchData } from '../consts/types';
import './SearchBar.css';

interface SearchBarProps {
  setMapCenter: (center: LatLngExpression) => void;
  setMapZoom: (zoom: number) => void;
  setSelectedMarker: React.Dispatch<React.SetStateAction<{ id: string | null, type: string | null }>>;
  setClickedMarkerId: (item: any) => void;
  openModal: () => void;
}

const SearchBar: React.FC<SearchBarProps> = (
  { setMapCenter, setMapZoom, setSelectedMarker, setClickedMarkerId, openModal }
) => {
  const bbox = "42.27,-7.97,52.58,38.25";
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const searchResults: SearchData[] = useSearch({ bbox: bbox, text: searchQuery });

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

  const handleSuggestionClick = (suggestion: SearchData) => {
    // Calculate new map center and zoom based on the suggestion's coordinates
    const newMapCenter: LatLngExpression = [suggestion.lat, suggestion.lng];
    const newMapZoom = 16;

    // Update the map center and zoom
    setMapCenter(newMapCenter);
    setMapZoom(newMapZoom);

    setShowSuggestions(false);

    setSelectedMarker({ id: suggestion.id, type: 'search' });
    setClickedMarkerId(suggestion.id)
    openModal();
  };

  return (
    <div>
      <IonSearchbar
        className='ion-searchbar'
        placeholder='Wonach suchst du?'
        onIonInput={(e) => {
          const query = e.target.value || '';
          setSearchQuery(query);
          setShowSuggestions(true);
        }}
      />
      {showSuggestions && searchQuery.length > 0 && sortedSearchResults.length > 0 && (
        <IonList>
          {sortedSearchResults.map((suggestion: SearchData, index) => (
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
