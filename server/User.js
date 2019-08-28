module.exports = class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.voted = false;
    this.vote = 0;
  }

  handleVote(vote) {
    this.vote = vote;
    this.voted = true;
  }

  reset() {
    this.voted = false;
  }
};
