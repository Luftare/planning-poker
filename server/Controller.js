const Room = require('./Room');

class Controller {
  constructor(io) {
    this.io = io;

    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.sockets.on('connection', socket => {
      socket.on('JOIN_ROOM', roomId => {
        console.log('JOIN ROOM: ', roomId);
      });
    });
  }
}

module.exports = Controller;
