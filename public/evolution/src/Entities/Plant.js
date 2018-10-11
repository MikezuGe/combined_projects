import Entity from './Entity';


export const ENTITY_TYPE = 'ENTITY_PLANT';


export default class Plant extends Entity {

  constructor () {
    super();
  }

  update () {
    if (--this.timeToLive <= 0) {
      return this.die();
    }
    this.timeToCanGrow <= 0 ? this.grow() : this.timeToCanGrow--;
    this.timeToCanBreed <= 0 ? this.breed() : this.timeToCanBreed--;
  }

}

Plant.prototype.ENTITY_TYPE = ENTITY_TYPE;
Plant.prototype.ENTITY_COLOR = 0;
Plant.prototype.ENTITY_MAX_SIZE = 10;
Plant.prototype.TIME_TO_LIVE_MIN = 1200;
Plant.prototype.TIME_TO_LIVE_MAX = 1800;
Plant.prototype.TIME_TO_GROW_MIN = 10;//80;
Plant.prototype.TIME_TO_GROW_MAX = 20;//120;
Plant.prototype.TIME_TO_BREED_MIN = 50;//100;
Plant.prototype.TIME_TO_BREED_MAX = 100;//500;
Plant.prototype.SIZE_TO_BREED = 6;
Plant.prototype.SHRINK_ON_BREED = 4;
