const uuid = require('uuid');
const User = require('./User');

class Room {
  constructor({ deckIndex }) {
    this.id = uuid();
    this.deckIndex = deckIndex;
    this.users = [];
  }

  addUser(name) {
    this.users.push(new User(name));
  }

  getState() {
    return {
      users: this.users,
      id: this.id,
      deckIndex: this.deckIndex,
    };
  }

  handleVote(name, vote) {
    let user = this.users.find(u => u.name === name);

    if (!user) {
      user = new User(name);
      this.users.push(user);
    }

    user.handleVote(vote);
  }

  startVoting() {
    this.users.forEach(user => user.reset());
  }
}

module.exports = Room;
