import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';
import { currentGame } from '../App';

interface SetGameProps {
  previousPlayers: string[];
  setCurrentGame: (game: currentGame) => void;
}

const SetupGame: React.FC<SetGameProps> = ({
  previousPlayers
  , setCurrentGame
}) => {

  const nav = useHistory();
  const playersWithCheckBoolean = previousPlayers.map(x => ({
    name: x
    , checked: false
  }))

  const startGame = () => {

    // Set up the players and the start timestamp.
    setCurrentGame({
      start: new Date().toISOString()
      , players: [
        previousPlayers[0]
        , previousPlayers[1]
        , "Suzzie"
      ]
    });
    // Nav to the play screen
    nav.push("/play");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setup Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Setup Game</IonTitle>
          </IonToolbar>
        </IonHeader>

        <h3>
          Choose Players
        </h3>
        {
          playersWithCheckBoolean.map(x => <p key={x.name}>{x.name}({x.checked.toString()})</p>)
        }


        <IonButton
          onClick={startGame}
        >
            Start Playing
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetupGame;
