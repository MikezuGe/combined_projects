const { random, floor, } = Math;


export default class Cell {

  constructor (cellNumber, cellType, renderingPosition) {
    this.cellNumber = cellNumber;
    this.cellType = cellType;
    this.renderingPosition = renderingPosition;
    this.adjacentCells = {};
    this._entity = null;
  }

  getEmptyAdjacentCell () {
    const openCells = Object.values(this.adjacentCells)
      .filter(({ entity, }) => entity === null);
    return openCells.length
      ? openCells[floor(random() * openCells.length)]
      : null;
  }

  set entity (entity) {
    if (entity) entity.cell = this;
    this._entity = entity;
  }

  get entity () {
    return this._entity;
  }

  update () {
    this._entity && this._entity.update();
  }

}