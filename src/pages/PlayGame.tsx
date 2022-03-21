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

  const endgame = () => {

      // Add the new game result to the app data.
      addGameResult({
        start: currentGame.start
        , end: new Date().toISOString()
        , players: currentGame.players.map(x => ({
          name: x
          , order: 0
        }))
        , winner: "Suzzie"
      });
      // Navigate home.
      history.push("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Play Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Play Game</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          onClick={endgame}
        >
            Done
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PlayGame;
