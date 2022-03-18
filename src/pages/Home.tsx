import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { gameResult } from '../App';


interface HomeProps {
  gameResults: gameResult[]
}
const Home: React.FC<HomeProps> = ({gameResults}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h3>
          Total Games Played: {gameResults.length}
        </h3>
        <IonButton
          routerLink='/setup'
        >
            Play
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
