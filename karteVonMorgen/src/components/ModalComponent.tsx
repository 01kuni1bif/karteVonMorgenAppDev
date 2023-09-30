import { IonModal, IonButton, IonContent } from '@ionic/react';

const ModalComponent = ({ showModal, setShowModal, content }) => {
  return (
    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
      <IonContent>
        {content && JSON.stringify(content)}
      </IonContent>
      <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
    </IonModal>
  );
};

export default ModalComponent;
