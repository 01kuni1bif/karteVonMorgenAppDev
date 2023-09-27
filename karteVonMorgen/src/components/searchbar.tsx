// import React, { useState } from 'react';
// import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// function SearchBar({
//   filterText,
//   onFilterTextChange,
   
// }) {

//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleInputChange = (newValue: React.SetStateAction<string>) => {
    
//     setSearchTerm(newValue);
//     // Hier können Sie Ihren API-Aufruf durchführen, um Suchergebnisse zu erhalten
//     // Ersetzen Sie 'Ihre_API_URL' durch die tatsächliche API-URL
//     fetch(`Ihre_API_URL?query=${newValue}`)
//       .then(response => response.json())
//       .then(data => {
//         // Aktualisieren Sie den Zustand mit den Suchergebnissen
//         setSearchResults(data);
//       })
//       .catch(error => {
//         console.error('Fehler beim API-Aufruf:', error);
//       });
//   };
//   return (
//     <Autocomplete
//       freeSolo
//       value={searchTerm}
//       onChange={handleInputChange}
//       options={searchResults.map(result => result.name)}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Suche..."
//           margin="normal"
//           variant="outlined"
//           fullWidth
//         />
//       )}
//       renderOption={(props, option) => (
//         <li {...props}>{option}</li>
//       )}
//     />
//   );
  
// }

// export default SearchBar;
