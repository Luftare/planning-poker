const uuid = require('uuid');

class Room {
  constructor(io) {
    this.id = uuid();
  }
}

module.exports = Room;
