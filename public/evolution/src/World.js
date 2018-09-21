import Cell from 'Cell';


export default class World {

  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.dimension = width * height;
    this.field = [];
    for (let i = 0; i < this.dimension; i++) {
      this.field[i] = new Cell(i, this.getCellType(i));
    }
    for (let i = 0; i < this.dimension; i++) {
      this.field[i].setAdjacentCells([
        this.field[i - width] || undefined,
        this.field[i + width] || undefined,
        this.field[i - 1] || undefined,
        this.field[i - 1] || undefined,
      ]);
    }
  }

  getCellType (i) {
    const { width, dimension, } = this;
    if (i === 0) return 'top-left';
    if (i === width - 1) return 'top-right';
    if (i === dimension - width) return 'bottom-left';
    if (i === dimension - 1) return 'bottom-right';
    if (i < width) return 'top';
    if (i > dimension - width - 1) return 'bottom';
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