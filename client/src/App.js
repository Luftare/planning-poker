import React from 'reactn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateRoom from './views/CreateRoom';
import Lobby from './views/Lobby';
import Login from './views/Login';
import Vote from './views/Vote';

function App(props) {
  return (
    <Router>
      <Route path="/" exact render={() => <CreateRoom {...props} />} />
      <Route exact path="/:roomId/login" render={() => <Login {...props} />} />
      <Route exact path="/:roomId/vote" render={() => <Vote {...props} />} />
      <Route exact path="/:roomId" render={() => <Lobby {...props} />} />
    </Router>
  );
}

export default App;
