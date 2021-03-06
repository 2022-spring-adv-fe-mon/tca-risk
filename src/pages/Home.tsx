import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { gameResult } from '../App';

interface HomeProps {
  gameResults: gameResult[];
  previousPlayers: string[];
}

const calculateShortestGame = (r: gameResult[]) => (
  Math.min(
      ...r.map(x => Date.parse(x.end) - Date.parse(x.start))
  )
);

const calculateLeaderBoard = (p: string[], r: gameResult[]) => {

  const lb = p.map(x => {

    const gamesThisPlayerHasPlayed = r.filter(y => y.players.some(z => z.name === x));
    const gamesThisPlayerHasWon = gamesThisPlayerHasPlayed.filter(y => y.winner === x);

    return {
      name: x
      , wins: gamesThisPlayerHasWon.length
      , losses: gamesThisPlayerHasPlayed.length - gamesThisPlayerHasWon.length
      , winningPercentage: (gamesThisPlayerHasWon.length / gamesThisPlayerHasPlayed.length).toFixed(3)
    };

  });

  console.log("calculateLeaderBoard", lb);

  return lb;

};

const Home: React.FC<HomeProps> = ({
  gameResults
  , previousPlayers
}) => {

  const lb = calculateLeaderBoard(previousPlayers, gameResults);
return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>tca Risk (companion app)</IonTitle>
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
          Shortest Game (min): {(calculateShortestGame(gameResults) / 1000 / 60).toFixed(2)};
        </h3>
        <IonGrid>
          {calculateLeaderBoard(previousPlayers, gameResults)
          .sort((a, b) => b.winningPercentage.localeCompare(a.winningPercentage))
          .map(x => (
              <IonRow>
                <IonCol>
                  {x.wins}
                </IonCol>
                <IonCol>
                  {x.losses}
                </IonCol>
                <IonCol>
                  {x.winningPercentage}
                </IonCol>
                <IonCol>
                  {x.name}
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        <IonButton
          routerLink='/setup'
        >
            Play Risk
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
