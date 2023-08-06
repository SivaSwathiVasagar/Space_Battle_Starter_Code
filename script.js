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
    if (target.hull != 0) {
      if (Math.random() < target.accuracy) {
        console.log(`${this.name} missed the ${target.name}.`);
      } else {
        console.log(`${this.name} attacked the ${target.name}.`);
        target.getShipDetails("Before Attack:");
        target.hull = target.hull - this.firepower;
        target.getShipDetails("After Attack:");
      }
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

  battle(attacker, target, destroyedAlienShips) {
    console.log( );
    console.log("@@@@@@@@@@@@@@@@  NEW BATTLE BEGINS  @@@@@@@@@@@@@@@@");
    console.log( );
    attacker.attack(target);
    let isWin = game.checkWin(attacker, target);
    if (isWin) {
      if (target instanceof AlienShip) {
        destroyedAlienShips.push(target);
      }
    } else {
      this.battle(target, attacker, destroyedAlienShips);
    }
  }

  beginBattle(humanShip, alienShips) {
    let destroyedAlienShips = [];
    for (let i = 0; i < alienShips.length; i++) {
      this.battle(humanShip, alienShips[i], destroyedAlienShips);
      if (humanShip.hull <= 0) {
        console.log( );
        console.log("****************************************");
        console.log( );
        console.log("BATTLE IS OVER! ALIENS DEFEATED HUMANS!!");
        console.log( );
        console.log("****************************************");
        break;
      }
      if (alienShips.length == destroyedAlienShips.length) {
        console.log( );
        console.log("*************************************************");
        console.log( );
        console.log("BATTLE IS OVER! HUMAN DEFEATED ALL ALIENS SHIPS!!");
        console.log( );
        console.log("*************************************************");
        break;
      }
    }
  }
}

let humanship = new HumanShip("USS");
let alienShips = [];
for (let i = 1; i <= 6; i++) {
  let as = new AlienShip(
    `Alien${i}`,
    getRandomNumber(3, 6),
    getRandomNumber(3, 6),
    getRandomNumber(0.6, 0.8)
  );

  alienShips.push(as);
}

let game = new Game();
game.beginBattle(humanship, alienShips);
