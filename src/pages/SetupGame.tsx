import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

interface SetGameProps {
  previousPlayers: string[];
}

const SetupGame: React.FC<SetGameProps> = ({previousPlayers}) => {

  const playersWithCheckBoolean = previousPlayers.map(x => ({
    name: x
    , checked: false
  }))

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
          routerLink='/play'
        >
            Start Playing
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetupGame;
