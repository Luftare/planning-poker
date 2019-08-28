module.exports = class User {
  constructor(name) {
    this.name = name;
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
