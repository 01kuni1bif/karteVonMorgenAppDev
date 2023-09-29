import { IonCheckbox, IonContent, IonLabel, IonPage, IonSearchbar } from '@ionic/react';

import axios from 'axios';
import useSearchbar from '../hooks/useSearchbar';
import useEvents from '../hooks/useEvents';
import useEntries from '../hooks/useEntries';
import React, { useState, useEffect } from 'react';
import useCategories from '../hooks/useCategories';
import useTags from '../hooks/useTags';
import { API_BASE_URL } from '../consts/apiConfig/apiConfig';
import { ENDPOINTS } from '../consts/apiConfig/apiConfig';
import useEventsVerbose from '../hooks/useEventsVerbose';
   

// import SearchBar from '../components/searchbar';


const Tab1: React.FC = () => {
/* console.log(API_BASE_URL);
console.log(`${API_BASE_URL}${ENDPOINTS.SEARCH.path}${ENDPOINTS.SEARCH.defaultQueryParams.bbox}`);
const string = "dsfasdfas";
ENDPOINTS.SEARCH.flexibleParams.text = string;

console.log(ENDPOINTS.SEARCH.flexibleParams.text);
 */
const ids = "cc33e558cf4749bf9c2f52a4731c1e10,cc33e558cf4749bf9c2f52a4731c1e10"
const initative = useCategories("2cd00bebec0c48ba9db761da48678134");
const company = useCategories("77b3c33a92554bcf8e8c2c86cedd6f6f");
const entries = useEntries(ids);

const search = useSearchbar(null,null,"h",null,null,null,5);

const verbose = useEventsVerbose(null,null,null,null);




/* if(search ==! null){
  console.log(search);
} */

/* if(entries ==! null){
  console.log(entries);
}

  if(initative ==! null){
    console.log(initative);
  }
  if(company ==! null){
    console.log(company);
  } */
  




 /* useEffect(() => {
  const endpointName = 'SEARCH'; // Der Name des Endpunkts, den du verwenden möchtest
  const queryParams = {
    ...ENDPOINTS[endpointName].defaultQueryParams, // Füge Standardparameter hinzu
    categories : ENDPOINTS.SEARCH.flexibleParams.company, // Füge benutzerdefinierte Parameter hinzu
  };
  
  

  // Die URL wird basierend auf dem API_BASE_URL und den generierten queryParams generiert
  const url = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;

  // Führe die GET-Anfrage mit den Parametern durch
  axios.get(url, {
    params: queryParams,
  })
    .then((response) => {
      // Handle die Antwort hier
      console.log(response.data);
    })
    .catch((error) => {
      // Handle Fehler hier
      console.error('Fehler bei der Anfrage:', error);
    });
}, []); // Leeres Abhängigkeitsarray, um sicherzustellen, dass dieser Effekt nur einmal ausgeführt wird
 */








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

               

            </IonContent>
        </IonPage>
    );
};

export default Tab1;
