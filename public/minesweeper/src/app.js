import Field from './Field';


const rootElement = document.getElementById('root');
rootElement.style.margin = '0 auto';
rootElement.style.maxWidth = '500px'
rootElement.style.width = '100%'
const containerElement = document.createElement('div');
const settingsElement = document.createElement('div');
rootElement.append(settingsElement);
rootElement.append(containerElement);


const resetButton = document.createElement('button');
resetButton.innerText = 'Reset';
settingsElement.append(resetButton);


const gameSettings = {
  containerElement,
  width: 8,
  height: 8,
  mineCount: 10,
  resetButton,
};


const mineInputContainer = document.createElement('div');
const minesInputLabel = document.createElement('label');
minesInputLabel.htmlFor = 'minesInput';
minesInputLabel.innerText = 'Mines: ';
mineInputContainer.append(minesInputLabel);
const minesInput = document.createElement('input');
minesInput.id = 'minesInput';
minesInput.type = 'number';
minesInput.max = gameSettings.width * gameSettings.height - 1;
minesInput.min = 1;
minesInput.step = 1;
minesInput.value = gameSettings.mineCount;
minesInput.addEventListener('change', ({ target: { value, }, }) => {
  gameSettings.mineCount = parseInt(value);
});
mineInputContainer.append(minesInput);

const widthInputContainer = document.createElement('div');
const widthInputLabel = document.createElement('label');
widthInputLabel.htmlFor = 'widthInput';
widthInputLabel.innerText = 'Width: ';
widthInputContainer.append(widthInputLabel);
const widthInput = document.createElement('input');
widthInput.id = 'widthInput';
widthInput.type = 'number';
widthInput.max = 10;
widthInput.min = 3;
minesInput.step = 1;
widthInput.value = gameSettings.width;
widthInput.addEventListener('change', ({ target: { value, }, }) => {
  gameSettings.width = parseInt(value);
  minesInput.max = gameSettings.width * gameSettings.height - 1;
  if (parseInt(minesInput.value) >= minesInput.max) {
    minesInput.value = minesInput.max;
    gameSettings.mineCount = minesInput.max;
  }
});
widthInputContainer.append(widthInput);

const heightInputContainer = document.createElement('div');
const heightInputLabel = document.createElement('label');
heightInputLabel.htmlFor = 'heightInput';
heightInputLabel.innerText = 'Heigh: ';
heightInputContainer.append(heightInputLabel);
const heightInput = document.createElement('input');
heightInput.id = 'heightInput';
heightInput.type = 'number';
heightInput.max = 10;
heightInput.min = 3;
minesInput.step = 1;
heightInput.value = gameSettings.height;
heightInput.addEventListener('change', ({ target: { value, }, }) => {
  gameSettings.height = parseInt(value);
  minesInput.max = gameSettings.width * gameSettings.height - 1;
  if (parseInt(minesInput.value) >= minesInput.max) {
    minesInput.value = minesInput.max;
    gameSettings.mineCount = minesInput.max;
  }
});
heightInputContainer.append(heightInput);


settingsElement.append(mineInputContainer);
settingsElement.append(widthInputContainer);
settingsElement.append(heightInputContainer);


let field = new Field(gameSettings);
resetButton.addEventListener('click', () => {
  field.destroy();
  field = new Field(gameSettings);
});

document.addEventListener('contextmenu', event => event.preventDefault());
