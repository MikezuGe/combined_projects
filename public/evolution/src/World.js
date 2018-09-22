import Cell from 'Cell';
import { entityTypes, } from 'Entities';


const { floor, } = Math;


export default class World {

  constructor (width = 32, height = 32) {
    if (width < 3 || height < 3) {
      throw new Error('Too small world, must be at least 3x3');
    }
    this.width = width;
    this.height = height;
    this.dimension = width * height;
    this.field = [];
    this.setupFieldCells();
  }

  setupFieldCells () {
    const { field, width, height, dimension, getCellType, } = this;
    for (let i = 0; i < dimension; i++) {
      field[i] = new Cell(i, getCellType(i, width, dimension), {
        x: -1 + 2 * ((i % width * 10 + 5) / 10 / width),
        y: -1 + 2 * ((floor(i / width) * 10 + 5) / 10 / height),
      });
      console.log(field[i].renderingPosition);
    }
    for (let i = 0; i < dimension; i++) {
      // Get adjacent cells
      const adjacentCells = {};
      if (field[i - width]) adjacentCells.top = field[i - width];
      if (field[i + width]) adjacentCells.bottom = field[i + width];
      if (i % width !== 0 && field[i - 1]) adjacentCells.left = field[i - 1];
      if ((i + 1) % width !== 0 && field[i + 1]) adjacentCells.right = field[i + 1];
      field[i].adjacentCells = adjacentCells;
    }
  }

  getCellType (i, width, dimension) {
    if (i === 0) return 'top-left';
    if (i + 1 === width) return 'top-right';
    if (i + width === dimension) return 'bottom-left';
    if (i + 1 === dimension) return 'bottom-right';
    if (i < width) return 'top';
    if (i + width + 1 > dimension) return 'bottom';
    if (i % width === 0) return 'left';
    if ((i + 1) % width === 0) return 'right';
    return 'normal';
  }

  update () {
    const { field, } = this;
    for (const cell of field) {
      cell.update();
    }
  }

}