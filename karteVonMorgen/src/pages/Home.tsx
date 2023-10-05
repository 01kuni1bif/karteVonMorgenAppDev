import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import MapComponent from '../components/MapComponent';
import './Home.css';
import SearchComponent from '../components/SearchComponent';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Karte von Morgen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* SearchComponent */}
        <SearchComponent/>
        <MapComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
