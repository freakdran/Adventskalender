class X {
  constructor(x) {
    this.x = x;
    this.hitFrom = 0;
    this.hitUntil = 0;
    this.drop = false;
    this.y = [];
  }

  get hitcombinations() {
    this.y.sort((a, b) => {
      return a - b;
    });
    let combs = [];
    this.y.forEach(y => {
      combs.push(`${this.x},${y.y}`);
    });
    return combs;
  }
  get numberOfHits() {
    return this.y.length;
  }
  addY(y) {
    this.y.push(y);
  }
}

module.exports = X;
