// Home.tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SearchComponent from '../components/SearchComponent';
import MapComponent from '../components/MapComponent';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Karte von Morgen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SearchComponent />
        <MapComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
