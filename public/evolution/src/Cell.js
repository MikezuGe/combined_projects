import { entityTypes, } from './Entities';
const {
  ENTITY_PLANT,
  ENTITY_HERBIVORE,
  //ENTITY_CARNIVORE,
} = entityTypes;


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
    const { adjacentCells, entity: { ENTITY_TYPE, }, } = this;
    const openCells = adjacentCells.filter(cell => {
      if (!cell) return false;
      if (!cell.entity) return true;
      switch (ENTITY_TYPE) {
      case ENTITY_HERBIVORE: return cell.entity.ENTITY_TYPE === ENTITY_PLANT;
        //case ENTITY_CARNIVORE: return cell.entity.ENTITY_TYPE !== ENTITY_CARNIVORE;
      default: return false;
      }
    });
    return openCells.length
      ? openCells[floor(random() * openCells.length)]
      : null;
  }

  setEntity (entity) {
    this.entity && this.removeEntity();
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
