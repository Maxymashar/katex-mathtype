import { Resizer } from './resizer';
import './katex';

const pinkBox = document.getElementById('pink-box');
const amberBox = document.getElementById('amber-box');

const pinkResizableBox = new Resizer(
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
  <span class="dim">Width : ${width}</span>
  <span class="dim">Height : ${height}</span>
  <span class="dim">Top : ${top}</span>
  <span class="dim">Bottom : ${bottom}</span>
  <span class="dim">Left : ${left}</span>
  <span class="dim">Right : ${right}</span>
  `;
    pinkBox.innerHTML = innerText;
  },
  'violet'
);

const amberResizableBox = new Resizer(
  50,
  300,
  '#ffe600',
  function () {
    const {
      div: { offsetWidth: width },
      div: { offsetHeight: height },
      div,
    } = this;
    const { top, bottom, left, right } = div.getBoundingClientRect();

    const innerText = `
  <span class="dim">Width : ${width}</span>
  <span class="dim">Height : ${height}</span>
  <span class="dim">Top : ${top}</span>
  <span class="dim">Bottom : ${bottom}</span>
  <span class="dim">Left : ${left}</span>
  <span class="dim">Right : ${right}</span>
  `;
    amberBox.innerHTML = innerText;
  },
  '#ffe600'
);

pinkResizableBox.render();
amberResizableBox.render();
