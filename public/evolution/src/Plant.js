import Entity from 'Entity';


export default class Plant extends Entity {
  
  static TIME_TO_LIVE_MAX = 1800;
  static TIME_TO_LIVE_MIN = 1200;
  static TIME_TO_GROW_MIN = 80;
  static TIME_TO_GROW_MAX = 120;
  static TIME_TO_BREED_MIN = 400;
  static TIME_TO_BREED_MIN = 500;
  static SIZE_TO_BREED = 6;
  static BASE_COLOR = 'green';

  constructor () {
    super();
  }

}
