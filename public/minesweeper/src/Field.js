// This is minesweeper


let timeout = null;


class Field {

  constructor ({ containerElement, width, height, mineCount, resetButton, }) {
    this.width = width;
    this.height = height;
    this.mineCount = mineCount;
    this.cells = [];

    this.playing = false;
    this.gameOver = false;
    this.cellsOpened = 0;
    this.cellsOpenToWin = width * height - mineCount;

    this.resetButton = resetButton;
    this.containerElement = containerElement;

    this.createField({ containerElement, width, height, });
  }

  createField ({ containerElement, width, height, }) {
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    this.resetButton.style.zIndex = 1020;
    for (let i = 0; i < height; i++) {
      const row = document.createElement('tr');
      const rowArray = [];
      for (let k = 0; k < width; k++) {
        const cell = document.createElement('td');
        cell.addEventListener('mouseup', e => {
          e.preventDefault();
          e.stopPropagation();
          if (!this.playing) {
            this.startGame();
            this.insertMines({ clickedX: k, clickedY: i, });
            this.clickCell({ x: k, y: i, e, });
          } else {
            this.clickCell({ x: k, y: i, e, });
          }
        });
        cell.style.border = '1px solid #000';
        cell.style.width = '30px';
        cell.style.height = '30px';
        cell.style.textAlign = 'center';
        cell.style.verticalAlign = 'middle';
        cell.innerHTML = '<i class="fas fa-square"></i>';
        rowArray.push({
          element: cell,
          content: {
            isOpen: false,
            hasMine: false,
            hasFlag: false,
            threat: 0, // Number of surrounding mines, 0-9
          },
        })
        row.append(cell);
      }
      this.cells.push(rowArray);
      table.append(row);
    }
    containerElement.append(table);
  }

  clickCell ({ e, x, y, }) {
    if (this.gameOver) {
      this.resetButton.click();
    }

    const cell = this.cells[y][x];

    if (e.button === 2) {
      cell.content.hasFlag
        ? (
          cell.element.innerHTML = '<i class="fas fa-square"></i>',
          cell.content.hasFlag = false
        )
        : (
          cell.element.innerHTML = '<i class="far fa-flag"></i>',
          cell.content.hasFlag = true
        );
    } else {
      cell.content.hasMine ? this.endGame() : !cell.content.isOpen && this.openCells({ x, y, });
    }
    this.checkIfVictory();
  }

  checkIfVictory () {
    console.log(this.cellsOpened, this.cellsOpenToWin);
    if (this.cellsOpened === this.cellsOpenToWin) {
      this.winGame();
    }
  }

  openCells ({ x, y, }) {
    const cells = this.cells;
    for (let i = -1; i <= 1; i++) {
      for (let k = -1; k <= 1; k++) {
        const nx = x + k;
        const ny = y + i;
        const cell = cells[ny] && cells[ny][nx];
        if (!cell || cell.content.isOpen || cell.content.hasMine) {
          continue;
        }
        this.cellsOpened++;
        cell.content.isOpen = true;
        cell.element.innerHTML = cell.content.threat
          ? cell.content.threat
          : ((i || k) && this.openCells({ x: nx, y: ny, }), '');
      }
    }
  }

  insertMines ({ clickedX, clickedY, }) {
    const { floor, random, } = Math;
    const { height, width, mineCount, cells, } = this;
    for (let i = mineCount; i--;) {
      const randomRow = () => floor(random() * height);
      const randomCell = () => floor(random() * width);
      let cell = null;
      do {
        const rRow = randomRow();
        const rCell = randomCell();
        if (clickedY === rRow && clickedX === rCell) {
          continue;
        }
        cell = cells[rRow][rCell];
      } while (!cell || cell.content.hasMine);
      cell.content.hasMine = true;
    }
    this.setThreats();
  }

  setThreats () {
    const cells = this.cells;
    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        for (let i = -1; i <= 1; i++) {
          for (let k = -1; k <= 1; k++) {
            if (!i && !k) {
              continue;
            }
            const nx = x + k;
            const ny = y + i;
            const neighbourCell = cells[ny] && cells[ny][nx];
            if (neighbourCell && neighbourCell.content.hasMine) {
              cell.content.threat++;
            }
          }
        }
      });
    });
  }

  startGame () {
    this.playing = true;
  }

  endGame () {
    this.cells.flat().forEach(function (cell) {
      cell.element.innerHTML = cell.content.hasMine
        ? '<i class="fas fa-bomb"></i>'
        : cell.content.threat
          ? cell.content.threat
          : '';
    });
    this.playing = false;
    this.gameOver = true;
  }

  winGame () {
    this.endGame();
    const { random, } = Math;
    (function r () {
      let winElement = document.getElementById('winContainer');
      if (!winElement) {
        winElement = document.createElement('div');
        winElement.id = 'winContainer';
        winElement.style.width = '100vw';
        winElement.style.height = '100vh';
        document.body.append(winElement);
      }
      timeout = setTimeout(r, 100 + (random() * 100 | 0));
      let el = document.createElement(`div`);
      el.innerHTML = `🏆`;
      el.style.position = `absolute`;
      el.style.zIndex = 1010;
      el.style.fontSize = (((random() * 48) | 0) + 16) + `px`;
      el.style.left = ((random() * innerWidth) | 0) + `px`;
      el.style.top = ((random() * (innerHeight + pageYOffset)) | 0) + `px`;
      winElement.append(el);
    })();
    alert('Voitit pelin');
  }

  destroy () {
    while (this.containerElement.lastChild) {
      this.containerElement.removeChild(this.containerElement.lastChild);
    }
    const winElement = document.getElementById('winContainer');
    if (winElement) {
      clearTimeout(timeout);
      winElement.remove();
    }
  }

}


export default Field;
