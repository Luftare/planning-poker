import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
const socketUrl =
  process.env.NODE_ENV === 'development' ? 'localhost:8000' : '';

const socket = io(socketUrl);

setGlobal({
  name: window.localStorage.getItem('voter-name') || '',
  facilitator: false,
  roomId: '',
  users: [],
  deckIndex: 0,
  nextVoteTopic: '',
  currentVoteTopic: '',
  voting: false,
  error: '',
  info: '',
  decks: [
    {
      label: 'T-shirt',
      cards: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      label: 'Exponential',
      cards: [1, 2, 4, 8, 16, 32, '?!'],
    },
    {
      label: 'Fibonacci',
      cards: [1, 2, 3, 5, 8, 13, 20, 40, '?!'],
    },
  ],
});

ReactDOM.render(<App socket={socket} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
