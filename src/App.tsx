import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter, IonReactHashRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SetupGame from './pages/SetupGame';
import PlayGame from './pages/PlayGame';

import { useState, useEffect} from 'react';

import localforage from 'localforage';
import { saveGameToCloud, loadGamesFromCloud } from './TcaCloudApi';


setupIonicReact();

interface player {
  name: string;
  order: number;
}

export interface gameResult {
  start: string;      // "2022-02-14T18:49:30"
  end: string;        // "2022-02-14T18:59:30"
  winner: string      // "Me"
  players: player[]   
}

export interface currentGame {
  start: string;
  players: string[];
}

const game1: gameResult = {
  start: "2022-02-14T18:55:00"
  , end: "2022-02-14T19:00:00"
  , winner: "Justen"
  , players: [{ name: "Me", order: 1 }, { name: "Justen", order: 2 }, { name: "Audri", order: 3 }]  
};

const game2: gameResult = {
  start: "2022-02-14T19:05:00"
  , end: "2022-02-14T19:35:00"
  , winner: "Audri"
  , players: [{ name: "Me", order: 1 }, { name: "Tammy", order: 2 }]
};

const gameResultsBad: gameResult[] = [
  game1
  , game2
];

const getUniquePlayers = (games: gameResult[]) => (
  [...new Set(games.flatMap(x => x.players.map(y => y.name)))]
);

const App: React.FC = () => {

  const loadGameResults = async () => {
    try {
      const r = await localforage.getItem<gameResult[]>("gameResults");
      setResults(r ?? []);
    }

    catch(err) {
      console.error(err);
      setResults([]);
    }
  };

useEffect(
  () => {
    loadGameResults();
  }
  , []
);

  // App state as useState() until it gets unmanagable.
  const [results, setResults] = useState<gameResult[]>([]);
  const[currentGame, setCurrentGame] = useState<currentGame>({
    start: ""
    , players: []
  });

  const addGameResult = async (singleGameResult: gameResult) => {

    const updatedResults = [
      ...results
      , singleGameResult
    ];

    setResults(updatedResults);

    
    //const savedResults = await localforage.setItem('gameResults', updatedResults);
    await saveGameToCloud(
      "JWaldburger@madisoncollege.edu"
      , "tca-risk"
      , singleGameResult.end
      , singleGameResult
    );
  };

  return (
  <IonApp>
    <IonReactHashRouter>
      <IonRouterOutlet>
      <Route exact path="/play">
          <PlayGame
            addGameResult={addGameResult}
            currentGame={currentGame}
          />
        </Route>
        <Route exact path="/setup">
          <SetupGame
          previousPlayers={getUniquePlayers(results)}
          setCurrentGame={setCurrentGame}
          />
        </Route>
        <Route exact path="/home">
          <Home
            previousPlayers={getUniquePlayers(results)}
            gameResults={results}
          />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactHashRouter>
  </IonApp>
  );
}
export default App;
