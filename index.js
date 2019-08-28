const PORT = process.env.PORT || 8000;
const Controller = require('./server/Controller');
const express = require('express');
const app = express();
const api = express.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  pingTimeout: 10000,
  pingInterval: 20000,
  cookie: false,
});

app.use('/api', api);
app.use('/', express.static(__dirname + '/client/build'));
app.use('*', express.static(__dirname + '/client/build'));

api.get('/test', (req, res) => {
  res.json({ foo: 'bar' });
});

const controller = new Controller(io);

http.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
