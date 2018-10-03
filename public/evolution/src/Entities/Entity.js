export default class Entity {

  constructor () {
    this.cell = null;
  }

  die () {
    this.cell.removeEntity();
  }

}
