// Home.tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Categories from '../components/Categories';
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
        <Categories />
        <MapComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
