const Room = require('./Room');

class Controller {
  constructor(io) {
    this.io = io;
    this.rooms = {};

    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.sockets.on('connection', socket => {
      let room;

      socket.on('CREATE_ROOM', ({ deckIndex }, onSuccess) => {
        room = new Room({ deckIndex, facilitatorId: socket.id });
        this.rooms[room.id] = room;

        socket.join(room.id);
        onSuccess(room.getState());
      });

      socket.on('DOES_ROOM_EXIST', (roomId, callback) => {
        callback(!!this.rooms[roomId]);
      });

      socket.on('JOIN_ROOM', ({ id, name }, callback) => {
        room = this.rooms[id];

        if (room) {
          room.addUser(name, socket.id);
          socket.join(id);
          callback(null, room.getState());
          this.io.sockets.in(id).emit('ROOM_STATE', room.getState());
        } else {
          callback('Room not found.');
        }
      });

      socket.on('VOTE', ({ vote, roomId }, callback) => {
        if (room) {
          room.handleVote(socket.id, vote);
          callback(null, room.getState());
          this.io.sockets.in(roomId).emit('ROOM_STATE', room.getState());
        } else {
          callback('Room not found.');
        }
      });

      socket.on('START_VOTE', () => {
        if (room) {
          room.startVoting();
          this.io.sockets.in(room.id).emit('START_VOTE');
        }
      });

      socket.on('disconnect', () => {
        if (room) {
          if (room.facilitatorId === socket.id) {
            delete this.rooms[room.id];
            this.io.sockets.in(room.id).emit('QUIT_ROOM');
          }

          room.removeUser(socket.id);
        }
      });
    });
  }
}

module.exports = Controller;
