import io from 'socket.io-client';
const socketUrl =
  process.env.NODE_ENV === 'development' ? 'localhost:8000' : '';

export default class Connection {
  constructor() {
    this.socket = io(socketUrl);
  }

  joinRoom(roomId) {
    this.socket.emit('JOIN_ROOM', roomId);
  }
}
