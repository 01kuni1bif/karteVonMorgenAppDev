// Home.tsx
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TestComponent from '../components/TestComponent';
import Categories from '../components/Categories';
import MapComponent from '../components/MapComponent';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonTitle>Karte von Morgen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="home-content">
        <TestComponent />
        <MapComponent />
        <Categories />
      </div>
    </IonPage>
  );
};

export default Home;
