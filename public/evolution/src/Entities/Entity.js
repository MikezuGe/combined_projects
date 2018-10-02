const { random, floor, } = Math;
const randomize = (min, max) => floor(random() * (max - min)) + min;


export default class Entity {

  constructor () {
    const {
      ENTITY_TYPE,
      ENTITY_COLOR,
      ENTITY_MAX_SIZE,
      TIME_TO_LIVE_MIN,
      TIME_TO_LIVE_MAX,
      TIME_TO_GROW_MIN,
      TIME_TO_GROW_MAX,
      TIME_TO_BREED_MIN,
      TIME_TO_BREED_MAX,
      SIZE_TO_BREED,
    } = this.constructor;

    ENTITY_TYPE && (this.ENTITY_TYPE = ENTITY_TYPE);
    ENTITY_COLOR && (this.ENTITY_COLOR = ENTITY_COLOR);
    ENTITY_MAX_SIZE && (this.ENTITY_MAX_SIZE = ENTITY_MAX_SIZE);
    TIME_TO_LIVE_MIN && (this.TIME_TO_LIVE_MIN = TIME_TO_LIVE_MIN);
    TIME_TO_LIVE_MAX && (this.TIME_TO_LIVE_MAX = TIME_TO_LIVE_MAX);
    TIME_TO_GROW_MIN && (this.TIME_TO_GROW_MIN = TIME_TO_GROW_MIN);
    TIME_TO_GROW_MAX && (this.TIME_TO_GROW_MAX = TIME_TO_GROW_MAX);
    TIME_TO_BREED_MIN && (this.TIME_TO_BREED_MIN = TIME_TO_BREED_MIN);
    TIME_TO_BREED_MAX && (this.TIME_TO_BREED_MAX = TIME_TO_BREED_MAX);
    SIZE_TO_BREED && (this.SIZE_TO_BREED = SIZE_TO_BREED);

    this.cell = null;
    this.size = 2;
    this.timeToLive = randomize(TIME_TO_LIVE_MIN, TIME_TO_LIVE_MAX);
    this.timeToCanGrow = randomize(TIME_TO_GROW_MIN, TIME_TO_GROW_MAX);
    this.timeToCanBreed = randomize(TIME_TO_BREED_MIN, TIME_TO_BREED_MAX);
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
      breedTo.entity = new this.constructor();
      this.timeToCanBreed = randomize(this.TIME_TO_BREED_MIN, this.TIME_TO_BREED_MAX);
    }
  }

  die () {
    this.cell.entity = null;
    this.cell = null;
  }

}