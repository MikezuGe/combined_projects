const { random, floor, } = Math;


export default class Cell {

  constructor (cellNumber, cellType, renderingPosition) {
    this.cellNumber = cellNumber;
    this.cellType = cellType;
    this.renderingPosition = renderingPosition;
    this.adjacentCells = [];
    this.entity = null;
  }

  getEmptyAdjacentCell () {
    const { adjacentCells, } = this;
    const openCells = adjacentCells.filter(cell => cell && !cell.entity);
    return openCells.length
      ? openCells[floor(random() * openCells.length)]
      : null;
  }

  setEntity (entity) {
    this.entity = entity;
    entity.cell = this;
  }

  removeEntity () {
    this.entity.cell = null;
    this.entity = null;
  }

  update () {
    this.entity && this.entity.update();
  }

}