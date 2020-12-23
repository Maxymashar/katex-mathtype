import { Resizer } from './resizer';
import './katex';

const pinkBox = document.getElementById('pink-box');
const amberBox = document.getElementById('amber-box');
const greenBox = document.getElementById('green-box');

const reArrange = (name) => {
  switch (name) {
    case 'pink':
      pinkResizableBox.div.style.zIndex = 1;
      amberResizableBox.div.style.zIndex = 2;
      greenResizableBox.div.style.zIndex = 3;
      break;
    case 'amber':
      amberResizableBox.div.style.zIndex = 1;
      pinkResizableBox.div.style.zIndex = 2;
      greenResizableBox.div.style.zIndex = 3;
      break;
    case 'green':
      greenResizableBox.div.style.zIndex = 1;
      amberResizableBox.div.style.zIndex = 2;
      pinkResizableBox.div.style.zIndex = 3;
  }
};

let pinkResizableBox = new Resizer(
  50,
  100,
  'rgb(255, 103, 129)',
  function () {
    const {
      div: { offsetWidth: width },
      div: { offsetHeight: height },
      div,
    } = this;
    const { top, bottom, left, right } = div.getBoundingClientRect();

    const innerText = `
  <pre class="dim">Width  : ${width}</pre>
  <pre class="dim">Height : ${height}</pre>
  <pre class="dim">Top    : ${top}</pre>
  <pre class="dim">Bottom : ${bottom}</pre>
  <pre class="dim">Left   : ${left}</pre>
  <pre class="dim">Right  : ${right}</pre>
  `;
    pinkBox.innerHTML = innerText;
  },
  'violet',
  () => {
    reArrange('pink');
  }
);

let amberResizableBox = new Resizer(
  50,
  200,
  '#ffe600',
  function () {
    const {
      div: { offsetWidth: width },
      div: { offsetHeight: height },
      div,
    } = this;
    const { top, bottom, left, right } = div.getBoundingClientRect();

    const innerText = `
  <pre class="dim">Width  : ${width}</pre>
  <pre class="dim">Height : ${height}</pre>
  <pre class="dim">Top    : ${top}</pre>
  <pre class="dim">Bottom : ${bottom}</pre>
  <pre class="dim">Left   : ${left}</pre>
  <pre class="dim">Right  : ${right}</pre>
  `;
    amberBox.innerHTML = innerText;
  },
  '#ffe600',
  () => {
    reArrange('amber');
  }
);

let greenResizableBox = new Resizer(
  50,
  300,
  'rgb(0, 173, 0)',
  function () {
    const {
      div: { offsetWidth: width },
      div: { offsetHeight: height },
      div,
    } = this;
    const { top, bottom, left, right } = div.getBoundingClientRect();

    const innerText = `
  <pre class="dim">Width  : ${width}</pre>
  <pre class="dim">Height : ${height}</pre>
  <pre class="dim">Top    : ${top}</pre>
  <pre class="dim">Bottom : ${bottom}</pre>
  <pre class="dim">Left   : ${left}</pre>
  <pre class="dim">Right  : ${right}</pre>
  `;
    greenBox.innerHTML = innerText;
  },
  'rgb(0, 173, 0)',
  () => {
    reArrange('green');
  }
);

pinkResizableBox.render();
amberResizableBox.render();
greenResizableBox.render();
