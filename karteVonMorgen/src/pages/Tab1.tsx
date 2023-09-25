import { IonContent, IonPage } from '@ionic/react';

import axios from 'axios';
import useSearchbar from '../hooks/useSearchbar';
import useEvents from '../hooks/useEvents';
import useEntries from '../hooks/useEntries';
import React, { useState, useEffect } from 'react';


const Tab1: React.FC = () => {

  
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(null);
  
    useEffect(() => {
      const response = useSearchbar();
      // Hier kannst du deinen Code für die Datenfilterung einfügen
      // Zum Beispiel: Filtere die Daten basierend auf searchText
      const filteredEntries = response
        .map((entryId) => useEntries(entryId))
        
        );
  
      setFilteredData(filteredEntries);
    }, [searchText]);

 
  

  return (
    <IonPage>
      <IonContent>
      <div>
        Hello World {data !== null ? data.map(item => (
          <div key={item.title}>
            Lat: {item.lat}, Lng: {item.lng}, Title: {item.title}
          </div>
        )) : 'Loading...'}
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
