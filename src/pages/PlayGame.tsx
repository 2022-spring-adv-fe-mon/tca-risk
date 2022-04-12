import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { currentGame, gameResult } from '../App';
import { useHistory } from "react-router-dom";
interface PlayGameProps {
  addGameResult: (r: gameResult) => void;
  currentGame: currentGame;
}

const PlayGame: React.FC<PlayGameProps> = ({
  addGameResult
  , currentGame
}) => {

  const history = useHistory();

  const endGame = (winningPlayer: string) => {

      // Add the new game result to the app data.
      const mappedPlayers = currentGame.players.map(x => ({
        name: x
        , order: 0
      }));
      console.log(mappedPlayers);

      addGameResult({
        start: currentGame.start
        , end: new Date().toISOString()
        , players: mappedPlayers
        , winner: winningPlayer
      });
      // Navigate home.
      history.push("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Play Risk</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Play Game</IonTitle>
          </IonToolbar>
        </IonHeader>
        { currentGame.players.map(x => (
          <IonButton
            key={x}
            onClick={() => endGame(x)}
          >
            {x} Won
          </IonButton>
        ))}
      <IonButton
          onClick={() => history.push("/")}
        >
            Quit Risk
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PlayGame;
