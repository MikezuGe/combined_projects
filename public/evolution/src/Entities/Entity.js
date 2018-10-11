const { random, floor, } = Math;
const randomize = (min, max) => floor(random() * (max - min)) + min;


export default class Entity {

  constructor () {
    this.cell = null;
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

  die () {
    this.cell.removeEntity();
  }

}