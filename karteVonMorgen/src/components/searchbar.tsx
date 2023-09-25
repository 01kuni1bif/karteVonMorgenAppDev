import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';


function SearchBar({
  filterText,
  onFilterTextChange
}) {
  return (
    <form>
       <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} /> 
    </form>
  );
}

export default SearchBar;
