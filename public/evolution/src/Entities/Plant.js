import Entity from './Entity';


const { random, floor, } = Math;
const randomize = (min, max) => floor(random() * (max - min)) + min;


export const ENTITY_TYPE = 'ENTITY_PLANT';


export default class Plant extends Entity {

  constructor () {
    super();
    this.size = 2;
    this.timeToLive = randomize(this.TIME_TO_LIVE_MIN, this.TIME_TO_LIVE_MAX);
    this.timeToCanGrow = randomize(this.TIME_TO_GROW_MIN, this.TIME_TO_GROW_MAX);
    this.timeToCanBreed = randomize(this.TIME_TO_BREED_MIN, this.TIME_TO_BREED_MAX);
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
    this.timeToCanGrow <= 0 ? this.grow() : this.timeToCanGrow--;
    this.timeToCanBreed <= 0 ? this.breed() : this.timeToCanBreed--;
  }

}

Plant.prototype.ENTITY_TYPE = ENTITY_TYPE;
Plant.prototype.ENTITY_COLOR = 0;
Plant.prototype.TIME_TO_LIVE_MIN = 800;
Plant.prototype.TIME_TO_LIVE_MAX = 1000;
Plant.prototype.TIME_TO_GROW_MIN = 10;//80;
Plant.prototype.TIME_TO_GROW_MAX = 20;//120;
Plant.prototype.TIME_TO_BREED_MIN = 50;//100;
Plant.prototype.TIME_TO_BREED_MAX = 100;//500;

Plant.prototype.ENTITY_MAX_SIZE = 10;
Plant.prototype.SIZE_TO_BREED = 6;
Plant.prototype.SHRINK_ON_BREED = 4;
