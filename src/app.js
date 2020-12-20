import { Resizer } from './resizer';

const blueWidth = document.getElementById('blue-width');
const blueHeight = document.getElementById('blue-height');
const pinkWidth = document.getElementById('pink-width');
const pinkHeight = document.getElementById('pink-height');
const spanDx = document.getElementById('dx');
const spanDy = document.getElementById('dy');

let pinkResizer = { newWidth: 150, newHeight: 150 };
let blueResizer = { newWidth: 150, newHeight: 150 };

const resizerOne = new Resizer(50, 100, 'pink', (newWidth, newHeight) => {
  pinkResizer = { newWidth, newHeight };
  getRelations();
});

const resizerTwo = new Resizer(50, 300, 'blue', (newWidth, newHeight) => {
  blueResizer = { newWidth, newHeight };
  getRelations();
});

const getRelations = () => {
  blueHeight.innerText = `Height : ${blueResizer.newHeight}`;
  blueWidth.innerText = `Width : ${blueResizer.newWidth}`;

  pinkHeight.innerText = `Height : ${pinkResizer.newHeight}`;
  pinkWidth.innerText = `Width : ${pinkResizer.newWidth}`;

  const dx =
    resizerTwo.div.getBoundingClientRect().left -
    resizerOne.div.getBoundingClientRect().right;

  const dy =
    resizerTwo.div.getBoundingClientRect().top -
    resizerOne.div.getBoundingClientRect().bottom;

  spanDx.innerText = `dx : ${dx} px`;
  spanDy.innerText = `dy : ${dy} px`;
};

resizerOne.render();
resizerTwo.render();
