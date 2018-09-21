
const { random, floor, } = math;
const randomize = (min, max) => min + floor(random() * (max - min));


export default class Entity {

  constructor () {
    const {
      TIME_TO_LIVE_MIN,
      TIME_TO_LIVE_MAX,
      TIME_TO_GROW_MIN,
      TIME_TO_GROW_MAX,
      TIME_TO_BREED_MIN,
      TIME_TO_BREED_MAX,
      SIZE_TO_BREED,
    } = this.constructor;
    this.cell = null;
    this.size = 2;
    this.sizeToBreed = SIZE_TO_BREED;
    this.timeToLive = randomize(TIME_TO_LIVE_MIN, TIME_TO_LIVE_MAX);
    this.timeToGrow = randomize(TIME_TO_GROW_MIN, TIME_TO_GROW_MAX);
    this.timeToBreed = randomize(TIME_TO_BREED_MIN, TIME_TO_BREED_MAX);
  }

  breed () {
    const breedTo = this.cell.getEmptyAdjacentCell();
    if (breedTo) {
      breedTo.entity = new this.constructor();
    }
  }

  die () {

  }

  update () {

  }

}