function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class SpaceShip {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  getShipDetails(details) {
    console.log(details);
    console.log(this);
  }

  attack(target) {
    if (Math.random() < target.accuracy) {
      console.log(`${this.name} missed the ${target.name}`);
    } else {
      console.log(`${this.name} attacked the ${target.name}`);
      target.getShipDetails("Before Attack");
      target.hull = target.hull - this.firepower;
      target.getShipDetails("After Attack");
    }
  }
}

class HumanShip extends SpaceShip {
  constructor(name) {
    super(name, 20, 5, 0.7);
  }
}

class AlienShip extends SpaceShip {
  constructor(name, hull, firepower, accuracy) {
    super(name, hull, firepower, accuracy);
  }
}

class Game {
  constructor(humans, aliens) {
    this.humanship = humans;
    this.alienShip = aliens;
  }

  checkWin(attacker, target) {
    if (target.hull <= 0) {
      console.log(target.name + " ship went kabloo-ey.");
      console.log(
        attacker.name + " ship won the battle against the " + target.name
      );
      return true;
    } else {
      console.log(
        "The " + target.name + " is still alive and the Battle continues."
      );
      return false;
    }
  }

  beginBattle(attacker, target) {
    attacker.attack(target);
    let isWin = this.checkWin(attacker, target);
    if (!isWin) {
      this.beginBattle(target, attacker);
    }
  }
}

/////////   Battle filed   ///////////

let alienShip = new AlienShip(
  "Alien",
  getRandomNumber(3, 6),
  getRandomNumber(3, 6),
  getRandomNumber(0.6, 0.8)
);

let humanship = new HumanShip("USS");
let game = new Game(humanship, alienShip);

game.beginBattle(humanship, alienShip);
