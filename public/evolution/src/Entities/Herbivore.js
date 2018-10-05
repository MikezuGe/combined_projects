import Entity from './Entity';


const { random, floor, } = Math;
const randomize = (min, max) => floor(random() * (max - min)) + min;


export const ENTITY_TYPE = 'ENTITY_HERBIVORE';


export default class Herbivore extends Entity {

  constructor () {
    super();
    this.size = 2;
    this.satiation = 3;
    this.timeToLive = randomize(this.TIME_TO_LIVE_MIN, this.TIME_TO_LIVE_MAX);
    this.timeToCanGrow = randomize(this.TIME_TO_GROW_MIN, this.TIME_TO_GROW_MAX);
    this.timeToCanBreed = randomize(this.TIME_TO_BREED_MIN, this.TIME_TO_BREED_MAX);

    this.direction = null;
  }

  findFood () {
    let direction = null;
    let closest = Infinity;
    for (let i = 0; i < 4; i++) {
      let nextCell = this.adjacentCells[i];
      let distance = 1;
      if (!nextCell) continue;
      while ((nextCell = nextCell.adjacentCells[i])) {
        distance++;
        if (!nextCell.entity) continue;
        if (nextCell.entity.ENTITY_TYPE === ENTITY_PLANT) {
          if (distance < closest) {
            closest = distance
            direction = i;
          }
        } else {
          break;
        }
      }
    }
    if (closest < Infinity) return direction;
  }

  move () {

  }

  eat () {

  }

  grow () {
    if (this.size < this.ENTITY_MAX_SIZE) {
      this.size++;
      this.timeToCanGrow = randomize(this.TIME_TO_GROW_MIN, this.TIME_TO_GROW_MAX);
    }
  }

  breed () {
    const breedTo = this.cell.getEmptyAdjacentCell();
    if (breedTo) {
      breedTo.setEntity(new this.constructor());
      this.size -= this.SHRINK_ON_BREED;
      this.timeToCanBreed = randomize(this.TIME_TO_BREED_MIN, this.TIME_TO_BREED_MAX);
    }
  }

  update () {
    if (--this.timeToLive <= 0) return this.die();
    
    // Get hungrier
    
    this.timeToCanGrow <= 0 ? this.grow() : this.timeToCanGrow--;
    this.timeToCanBreed <= 0 ? this.breed() : this.timeToCanBreed--;
    
    if (this.direction) {
      this.move();
    } else if (this.satiation < this.SATIATION_TO_EAT) {
      this.direction = this.findFood();
      this.move();
    }
  }

}

Herbivore.prototype.ENTITY_TYPE = ENTITY_TYPE;
Herbivore.prototype.ENTITY_COLOR = 1;
Herbivore.prototype.TIME_TO_LIVE_MIN = 3000;
Herbivore.prototype.TIME_TO_LIVE_MAX = 3500;
Herbivore.prototype.TIME_TO_GROW_MIN = 150;
Herbivore.prototype.TIME_TO_GROW_MAX = 200;
Herbivore.prototype.TIME_TO_BREED_MIN = 800;
Herbivore.prototype.TIME_TO_BREED_MAX = 1000;

Herbivore.prototype.SATIATION_TO_EAT = 8;

Herbivore.prototype.ENTITY_MAX_SIZE = 10;
Herbivore.prototype.SIZE_TO_BREED = 8;
Herbivore.prototype.SHRINK_ON_BREED = 5;
