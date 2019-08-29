const shortid = require('shortid');
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

      socket.on('REQUEST_NEW_ROOM_ID', callback => {
        callback(null, shortid.generate());
      });

      socket.on(
        'CREATE_ROOM',
        ({ deckIndex, facilitatorName, roomId }, callback) => {
          if (this.rooms[roomId]) {
            callback('Room already exists.');
          } else {
            room = new Room({ deckIndex, roomId });
            room.addUser(facilitatorName, socket.id);
            this.rooms[room.id] = room;

            socket.join(room.id);
            callback(null, room.getState());
          }
        }
      );

      socket.on('DOES_ROOM_EXIST', (roomId, callback) => {
        callback(null, !!this.rooms[roomId]);
      });

      socket.on('KICK_USER', userId => {
        if (room) {
          room.removeUser(userId);
          this.io.sockets.to(userId).emit('QUIT_ROOM');
          this.io.sockets.in(room.id).emit('ROOM_STATE', room.getState());
        }
      });

      socket.on('ASSIGN_USER_TO_FACILITATOR', id => {
        if (room) {
          room.assignFacilitator(id);
          this.io.sockets.in(room.id).emit('ROOM_STATE', room.getState());
        }
      });

      socket.on('JOIN_ROOM', ({ id, name }, callback) => {
        room = this.rooms[id];

        if (!room) {
          return callback('Room not found.');
        }

        const duplicateName = room.users.some(u => u.name === name);
        if (duplicateName) {
          return callback('Name reserved.');
        }

        room.addUser(name, socket.id);
        socket.join(id);
        callback(null, room.getState());
        this.io.sockets.in(id).emit('ROOM_STATE', room.getState());
      });

      socket.on('ROOM_STATE', callback => {
        if (room) {
          callback(null, room.getState());
        } else {
          callback('Room not found.');
        }
      });

      socket.on('START_VOTE', ({ voteTopic, deckIndex }, callback) => {
        if (room) {
          room.deckIndex = deckIndex;
          room.voteTopic = voteTopic;
          room.voting = true;
          room.startVoting();
          this.io.sockets.in(room.id).emit('START_VOTE', room.getState());
          callback(null, room.getState());
        } else {
          callback('Failed to start vote.');
        }
      });

      socket.on('VOTE', ({ vote }, callback) => {
        if (room) {
          room.handleVote(socket.id, vote);
          callback(null, room.getState());
          this.io.sockets.in(room.id).emit('ROOM_STATE', room.getState());
        } else {
          callback('Room not found.');
        }
      });

      socket.on('disconnect', () => {
        if (room) {
          room.removeUser(socket.id);
          if (room.users.length === 0) {
            delete this.rooms[room.id];
          } else {
            this.io.sockets.in(room.id).emit('ROOM_STATE', room.getState());
          }
        }
      });
    });
  }
}

module.exports = Controller;
