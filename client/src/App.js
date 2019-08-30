import React from 'reactn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home';
import CreateRoom from './views/CreateRoom';
import Lobby from './views/Lobby';
import Login from './views/Login';
import Vote from './views/Vote';
import QR from './views/QR';
import NotificationWidget from './components/NotificationWidget';

function App(props) {
  return (
    <>
      <NotificationWidget topic="error" type="error" />
      <NotificationWidget topic="info" type="info" />
      <Router>
        <Route exact path="/" render={() => <Home {...props} />} />
        <Route exact path="/create" render={() => <CreateRoom {...props} />} />
        <Route exact path="/room/:roomId" render={() => <Lobby {...props} />} />
        <Route exact path="/room/:roomId/qr" render={() => <QR {...props} />} />
        <Route
          exact
          path="/room/:roomId/login"
          render={() => <Login {...props} />}
        />
        <Route
          exact
          path="/room/:roomId/vote"
          render={() => <Vote {...props} />}
        />
      </Router>
    </>
  );
}

export default App;
