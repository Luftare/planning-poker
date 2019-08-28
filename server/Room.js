const uuid = require('uuid');
const User = require('./User');

class Room {
  constructor({ deckIndex, facilitatorId }) {
    this.id = uuid();
    this.facilitatorId = facilitatorId;
    this.deckIndex = deckIndex;
    this.users = [];
    this.voteTopic = '';
  }

  addUser(name, id) {
    this.users.push(new User(name, id));
  }

  removeUser(id) {
    this.users = this.users.filter(u => u.id !== id);
  }

  getState() {
    return {
      users: this.users,
      id: this.id,
      deckIndex: this.deckIndex,
      voteTopic: this.voteTopic,
    };
  }

  handleVote(id, vote) {
    this.users.find(u => u.id === id).handleVote(vote);
  }

  startVoting() {
    this.users.forEach(user => user.reset());
  }
}

module.exports = Room;
