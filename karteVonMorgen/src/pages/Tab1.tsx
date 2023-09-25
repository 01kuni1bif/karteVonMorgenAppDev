import { IonCheckbox, IonContent, IonLabel, IonPage, IonSearchbar } from '@ionic/react';

import axios from 'axios';
import useSearchbar from '../hooks/useSearchbar';
import useEvents from '../hooks/useEvents';
import useEntries from '../hooks/useEntries';
import React, { useState, useEffect } from 'react';
import useCategories from '../hooks/useCategories';
import useTags from '../hooks/useTags';
import SearchBar from '../components/searchbar';


const Tab1: React.FC = () => {

  /*  const [filterText, setFilterText] = useState('');
 
   const data = useCategories('2cd00bebec0c48ba9db761da48678134', '100');
 
   const data1 = useCategories('77b3c33a92554bcf8e8c2c86cedd6f6f', '100'); */

  const tags1 = useTags();
  const [filterText, setFilterText] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  useEffect(() => {
    if (tags1 && tags1.length > 0) {
      const searchQuery = filterText.toLowerCase();
      const filteredEvents = tags1.filter((item: string) =>
        item.toLowerCase().includes(searchQuery)
      );
      setFilteredTags(filteredEvents);
    } else {
      setFilteredTags([]);
    }
  }, [tags1, filterText]);







  /*  const [searchText, setSearchText] = useState('');
   const [filteredData, setFilteredData] = useState(null);
 
   useEffect(() => {
     const response = useSearchbar();
     // Hier kannst du deinen Code für die Datenfilterung einfügen
     // Zum Beispiel: Filtere die Daten basierend auf searchText
     const filteredEntries = response
       .map((entryId) => useEntries(entryId))
       
       );
 
     setFilteredData(filteredEntries);
   }, [searchText]);  */




  return (
    <IonPage>
      <IonContent>

        <div>
          <input
            type="text"
            placeholder="Suche nach Tags..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <ul>
            {filteredTags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
