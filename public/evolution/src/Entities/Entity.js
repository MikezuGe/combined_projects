
const { random, floor, } = Math;
const randomize = (min, max) => floor(random() * (max - min)) + min;


const ENTITY_MAX_SIZE = 10;


export default class Entity {

  constructor () {
    const {
      ENTITY_TYPE,
      TIME_TO_LIVE_MIN,
      TIME_TO_LIVE_MAX,
      TIME_TO_GROW_MIN,
      TIME_TO_GROW_MAX,
      TIME_TO_BREED_MIN,
      TIME_TO_BREED_MAX,
      SIZE_TO_BREED,
    } = this.constructor;

    this.cell = null;
    this.type = ENTITY_TYPE;
    this.size = 2;
    this.sizeToBreed = SIZE_TO_BREED;
    this.timeToLive = randomize(TIME_TO_LIVE_MIN, TIME_TO_LIVE_MAX);
    this.timeToCanGrow = randomize(TIME_TO_GROW_MIN, TIME_TO_GROW_MAX);
    this.timeToCanBreed = randomize(TIME_TO_BREED_MIN, TIME_TO_BREED_MAX);
  }

  grow () {
    if (this.size < ENTITY_MAX_SIZE) {
      this.size++;
      this.timeToCanGrow = randomize(TIME_TO_GROW_MIN, TIME_TO_GROW_MAX);
    }
  }

  breed () {
    const breedTo = this.cell.getEmptyAdjacentCell();
    if (breedTo) {
      breedTo.entity = new this.constructor();
      this.timeToCanBreed = randomize(TIME_TO_BREED_MIN, TIME_TO_BREED_MAX);
    }
  }

  die () {
    this.cell.entity = null;
    this.cell = null;
  }

}