import React from 'reactn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateRoom from './views/CreateRoom';
import Lobby from './views/Lobby';
import Login from './views/Login';
import Vote from './views/Vote';
import QR from './views/QR';
import ErrorWidget from './components/ErrorWidget';

function App(props) {
  return (
    <>
      <ErrorWidget />
      <Router>
        <Route exact path="/" render={() => <CreateRoom {...props} />} />
        <Route exact path="/:roomId" render={() => <Lobby {...props} />} />
        <Route exact path="/:roomId/qr" render={() => <QR {...props} />} />
        <Route
          exact
          path="/:roomId/login"
          render={() => <Login {...props} />}
        />
        <Route exact path="/:roomId/vote" render={() => <Vote {...props} />} />
      </Router>
    </>
  );
}

export default App;
