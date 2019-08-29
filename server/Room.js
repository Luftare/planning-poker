const shortid = require('shortid');
const User = require('./User');

class Room {
  constructor({ deckIndex, roomId = shortid.generate() }) {
    this.id = roomId;
    this.deckIndex = deckIndex;
    this.users = [];
    this.voteTopic = '';
    this.voting = false;
  }

  assignFacilitator(id) {
    this.users.forEach(user => {
      user.facilitator = user.id === id;
    });
  }

  addUser(name, id) {
    const shouldBecomeFacilitator = this.users.length === 0;
    this.users.push(new User(name, id));

    if (shouldBecomeFacilitator) {
      this.assignFacilitator(id);
    }
  }

  removeUser(id) {
    this.users = this.users.filter(u => u.id !== id);

    const shouldAssignNewFacilitator =
      this.users.length > 0 && !this.users.some(u => u.facilitator);

    if (shouldAssignNewFacilitator) {
      const newFacilitator = this.users[0];
      this.assignFacilitator(newFacilitator.id);
    }
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
    const allUsersVoted = !this.users
      .filter(u => !u.facilitator)
      .some(u => !u.voted);

    if (allUsersVoted) {
      this.voting = false;
    }
  }

  startVoting() {
    this.users.forEach(user => user.reset());
  }
}

module.exports = Room;
