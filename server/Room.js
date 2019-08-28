const shortid = require('shortid');
const User = require('./User');

class Room {
  constructor({ deckIndex, facilitatorId }) {
    this.id = shortid.generate();
    this.facilitatorId = facilitatorId;
    this.deckIndex = deckIndex;
    this.users = [];
    this.voteTopic = '';
    this.voting = false;
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
      voting: this.voting,
    };
  }

  handleVote(id, vote) {
    this.users.find(u => u.id === id).handleVote(vote);
    const allUsersVoted = !this.users.some(u => !u.voted);

    if (allUsersVoted) {
      this.voting = false;
    }
  }

  startVoting() {
    this.users.forEach(user => user.reset());
  }
}

module.exports = Room;
