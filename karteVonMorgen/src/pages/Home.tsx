import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import MapComponent from '../components/MapComponent';
import './Home.css';
import ButtonsComponent from '../components/ButtonsComponent';

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
        <ButtonsComponent/>
        <MapComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
