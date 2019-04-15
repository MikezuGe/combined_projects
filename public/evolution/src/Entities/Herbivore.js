import Entity from './Entity';
import { ENTITY_TYPE as ENTITY_PLANT, } from './Plant';


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
    this.timeToCanMove = randomize(this.TIME_TO_MOVE_MIN, this.TIME_TO_MOVE_MAX);
    this.timeToSatiationDecrease = randomize(this.TIME_SATIATION_DECREASE_MIN, this.TIME_SATIATION_DECREASE_MAX);

    this.direction = null;
  }

  getHungrier () {
    this.satiation--;
    if (this.satiation <= 0) {
      this.timeToLive = 0;
      return;
    }
    this.timeToSatiationDecrease = randomize(this.TIME_SATIATION_DECREASE_MIN, this.TIME_SATIATION_DECREASE_MAX);
  }

  findFood () {
    let direction = null;
    let closest = Infinity;
    for (let i = 0; i < 4; i++) {
      let distance = 1;
      let nextCell = this.cell.adjacentCells[i];
      if (!nextCell) continue;
      while ((nextCell = nextCell.adjacentCells[i])) {
        distance++;
        if (!nextCell.entity) continue;
        if (nextCell.entity.ENTITY_TYPE !== ENTITY_PLANT) break;
        if (distance < closest) {
          closest = distance
          direction = i;
        }
      }
    }
    if (closest < Infinity) return direction;
  }

  move () {
    const nextCell = this.cell.adjacentCells[this.direction];
    if (!nextCell) {
      this.direction = null;
    } else if (!nextCell.entity) {
      this.cell.moveEntityTo(nextCell);
    } else if (nextCell.entity.ENTITY_TYPE === ENTITY_PLANT) {
      this.eat(nextCell);
    }
  }

  eat (cell) {
    this.satiation += floor(cell.entity.size / 3) + 1;
    this.timeToSatiationDecrease = randomize(this.TIME_SATIATION_DECREASE_MIN, this.TIME_SATIATION_DECREASE_MAX);
    this.cell.moveEntityTo(cell);
    this.direction = null;
  }

  grow () {
    if (this.size >= this.ENTITY_MAX_SIZE) return;
    this.size++;
    this.timeToCanGrow = randomize(this.TIME_TO_GROW_MIN, this.TIME_TO_GROW_MAX);
  }

  breed () {
    const breedTo = this.cell.getEmptyAdjacentCell();
    if (!breedTo) return;
    breedTo.setEntity(new this.constructor());
    this.size -= this.SHRINK_ON_BREED;
    this.timeToCanBreed = randomize(this.TIME_TO_BREED_MIN, this.TIME_TO_BREED_MAX);
  }

  update () {
    this.timeToSatiationDecrease <= 0 ? this.getHungrier() : this.timeToSatiationDecrease--;
    if (--this.timeToLive <= 0) return this.die(); // Checks before this line may cause death to the entity
    
    this.timeToCanGrow <= 0 ? this.grow() : this.timeToCanGrow--;
    this.timeToCanBreed <= 0 ? this.breed() : this.timeToCanBreed--;
    this.timeToCanMove > 0 && this.timeToCanMove--;
    
    if (this.satiation <= this.SATIATION_TO_EAT) {
      if (!this.direction) {
        this.direction = this.findFood();
      }
      this.timeToCanMove <= 0 && this.move();
    }
  }

}

Herbivore.prototype.ENTITY_TYPE = ENTITY_TYPE;
Herbivore.prototype.ENTITY_COLOR = 1;
Herbivore.prototype.TIME_TO_LIVE_MIN = 3000;
Herbivore.prototype.TIME_TO_LIVE_MAX = 3500;
Herbivore.prototype.TIME_TO_GROW_MIN = 100;
Herbivore.prototype.TIME_TO_GROW_MAX = 140;
Herbivore.prototype.TIME_TO_BREED_MIN = 600;
Herbivore.prototype.TIME_TO_BREED_MAX = 800;
Herbivore.prototype.TIME_TO_MOVE_MIN = 40;
Herbivore.prototype.TIME_TO_MOVE_MAX = 50;
Herbivore.prototype.TIME_SATIATION_DECREASE_MIN = 80;
Herbivore.prototype.TIME_SATIATION_DECREASE_MAX = 100;

Herbivore.prototype.SATIATION_TO_EAT = 8;

Herbivore.prototype.ENTITY_MAX_SIZE = 10;
Herbivore.prototype.SIZE_TO_BREED = 8;
Herbivore.prototype.SHRINK_ON_BREED = 5;
