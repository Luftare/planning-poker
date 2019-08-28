const Room = require('./Room');

class Controller {
  constructor(io) {
    this.io = io;
    this.rooms = {};

    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.sockets.on('connection', socket => {
      socket.on('JOIN_ROOM', ({ id, name }, onSuccess) => {
        const room = this.rooms[id];

        if (room) {
          room.addUser(name);
          socket.join(id);
          onSuccess(room.getState());
          this.io.sockets.in(id).emit('ROOM_STATE', room.getState());
        }
      });

      socket.on('CREATE_ROOM', ({ deckIndex }, onSuccess) => {
        const room = new Room({ deckIndex });
        this.rooms[room.id] = room;

        socket.join(room.id);
        onSuccess(room.getState());
      });

      socket.on('VOTE', ({ name, vote, roomId }, onSuccess) => {
        const room = this.rooms[roomId];

        if (room) {
          room.handleVote(name, vote);
          onSuccess(room.getState());
          this.io.sockets.in(roomId).emit('ROOM_STATE', room.getState());
        }
      });

      socket.on('START_VOTE', roomId => {
        const room = this.rooms[roomId];

        if (room) {
          room.startVoting();
          this.io.sockets.in(roomId).emit('START_VOTE');
        }
      });
    });
  }
}

module.exports = Controller;
