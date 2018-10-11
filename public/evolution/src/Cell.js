const { random, floor, } = Math;


export default class Cell {

  constructor (cellNumber, cellType, renderingPosition) {
    this.cellNumber = cellNumber;
    this.cellType = cellType;
    this.renderingPosition = renderingPosition;
    this.adjacentCells = {};
    this.entity = null;
  }

  getEmptyAdjacentCell () {
    const openCells = Object.values(this.adjacentCells)
      .filter(({ entity, }) => entity === null);
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