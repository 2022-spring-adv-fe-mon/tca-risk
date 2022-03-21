import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { gameResult } from '../App';


interface HomeProps {
  gameResults: gameResult[]
}
const calculateWinningPercentage = (results: gameResult[], who: string) => (
  results.filter(x => x.winner === who).length 
  / results.filter(
      x => 
          x.winner !== "~~None~~" 
          && x.players.some(
              y => y.name === who
          )
      ).length
);

const calculateShortestGame = (r: gameResult[]) => (
  Math.min(
      ...r.map(x => Date.parse(x.end) - Date.parse(x.start))
  )
);
const Home: React.FC<HomeProps> = ({gameResults}) => {

  const suzziesWinningPercentage = 
   !isNaN(calculateWinningPercentage(gameResults, "Suzzie"))
   ? calculateWinningPercentage(gameResults, "Suzzie") 
   : 0;

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
        <h3>
          Suzzie's Winning %: {suzziesWinningPercentage}
        </h3>
        <h3>
          My Winning %: {calculateWinningPercentage(gameResults, "Me")}
        </h3>
        <h3>
          Shortest Game (min): {calculateShortestGame(gameResults)/ 1000 / 60}
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
