class Reindeer {
  constructor(name, speed, sprintTime, restTime) {
    this.name = name;
    this.speed = speed;
    this.sprintTime = sprintTime;
    this.restTime = restTime;
    this.resting = 0;
    this.sprinting = sprintTime;
    this.position = 0;
    this.points = 0;
  }
}

module.exports = Reindeer;
