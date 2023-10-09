// Home.tsx
import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Categories from '../components/Categories';
import MapComponent from '../components/MapComponent';

import './Home.css';
import SearchBar from '../components/search';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Karte von Morgen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      
        {/* <SearchBar/> */}
        <Categories />
        <MapComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
