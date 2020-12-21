import katex from 'katex';
import 'katex/dist/katex.min.css';

const katexCanvas = document.getElementById('katex-canvas');
const katexInput = document.getElementById('katex-input');
const button = document.querySelector('.katex-form button');

const renderTex = () => {
  const tex = katexInput.value;
  if (tex.trim()) {
    katex.render(tex, katexCanvas, { displayMode: true });
  }
};

button.addEventListener('click', renderTex);
