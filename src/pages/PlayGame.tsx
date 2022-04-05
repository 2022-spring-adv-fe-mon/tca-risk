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
      const mappedPlayers = currentGame.players.map(x => ({
        name: x
        , order: 0
      }));
      console.log(mappedPlayers);

      addGameResult({
        start: currentGame.start
        , end: new Date().toISOString()
        , players: mappedPlayers
        , winner: currentGame.players[0]
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
        { currentGame.players.map(x => (
          <p
            key={x}
          >
            {x}
          </p>
        ))}
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
