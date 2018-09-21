
const { random, floor, } = Math;


export default class Cell {

  constructor (cellNumber, cellType) {
    this.adjacentCells = null;
    this.cellNumber = cellNumber;
    this._entity = null;
    this.cellType = cellType;
  }

  getEmptyAdjacentCell () {
    cell = this.adjacentCells[floor(random() * 4)];
    return cell;
  }

  setAdjacentCells (cells) {
    this.adjacentCells = cells;
  }

  set entity (entity) {
    entity.cell = this;
    this._entity = entity;
  }

  get entity () {
    return this._entity;
  }

  update () {
    entity.update();
  }

}