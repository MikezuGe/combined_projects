import Entity from './Entity';


export const ENTITY_TYPE = 'ENTITY_PLANT';

export default class Plant extends Entity {
  
  static BASE_COLOR = 'green';
  static ENTITY_TYPE = ENTITY_TYPE;
  static ENTITY_MAX_SIZE = 10;
  static TIME_TO_LIVE_MAX = 1800;
  static TIME_TO_LIVE_MIN = 1200;
  static TIME_TO_GROW_MIN = 80;
  static TIME_TO_GROW_MAX = 120;
  static TIME_TO_BREED_MIN = 400;
  static TIME_TO_BREED_MIN = 500;
  static SIZE_TO_BREED = 6;

  constructor () {
    super();
  }

  update () {
    !--this.timeToLive && this.die();
    (!this.timeToCanGrow && this.grow()) || this.timeToCanGrow--;
    (!this.timeToCanBreed && this.breed()) || this.timeToCanBreed--;
  }

}
