class Resizer {
  constructor(initialTranslateX, initialTranslateY, color) {
    // The global translations
    this.globalTranslateX = initialTranslateX;
    this.globalTranslateY = initialTranslateY;
    // The originalLeft,originalBottom Positions
    this.originalRight = null;
    this.originalBottom = null;
    this.backgroundColor = color;
  }
  addMotion(resizer, resizableDiv, position) {
    switch (position) {
      case 'right':
        resizer.addEventListener('mousedown', () => {
          const resize = ({ clientX }) => {
            const { left } = resizableDiv.getBoundingClientRect();
            const newWidth = clientX - left;
            resizableDiv.style.width = `${newWidth}px`;

            // Set the translations
            resizableDiv.style.transform = `translateX(${this.globalTranslateX}px) translateY(${this.globalTranslateY}px)`;
          };
          const stopResize = () => {
            window.removeEventListener('mousemove', resize);
          };
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', stopResize);
        });
        break;
      case 'left':
        resizer.addEventListener('mousedown', () => {
          // reset the originalRight
          // this.originalRight = null;
          const resize = ({ clientX }) => {
            const { right, left } = resizer.getBoundingClientRect();
            if (!this.originalRight) {
              this.originalRight = right;
            } else {
              // Get the difference
              const difference = left - clientX;

              resizableDiv.style.width = `${
                difference + resizableDiv.offsetWidth
              }px`;
              // Set the translations
              this.globalTranslateX -= difference;
              resizableDiv.style.transform = `translateX(${this.globalTranslateX}px) translateY(${this.globalTranslateY}px)`;
              console.log(this.globalTranslateX);
            }
          };
          const stopResize = () => {
            window.removeEventListener('mousemove', resize);
          };
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', stopResize);
        });
        break;
      case 'bottom':
        resizer.addEventListener('mousedown', () => {
          const resize = ({ clientY }) => {
            const { top } = resizableDiv.getBoundingClientRect();
            const newHeight = clientY - top;
            resizableDiv.style.height = `${newHeight}px`;
          };
          const stopResize = () => {
            window.removeEventListener('mousemove', resize);
          };
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', stopResize);
        });
        break;
      case 'top':
        resizer.addEventListener('mousedown', () => {
          const resize = ({ clientY }) => {
            const { top } = resizableDiv.getBoundingClientRect();
            const difference = top - clientY;

            resizableDiv.style.height = `${
              difference + resizableDiv.offsetHeight
            }px`;

            this.globalTranslateY -= difference;
            resizableDiv.style.transform = `translateX(${this.globalTranslateX}px) translateY(${this.globalTranslateY}px)`;
          };
          const stopResize = () => {
            window.removeEventListener('mousemove', resize);
          };
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', stopResize);
        });
        break;
    }
  }
  addResizers(resizableDiv) {
    const topResizer = document.createElement('div');
    topResizer.classList.add('res-top');
    topResizer.classList.add('res');
    topResizer.style.backgroundColor = this.backgroundColor;
    this.addMotion(topResizer, resizableDiv, 'top');

    const bottomResizer = document.createElement('div');
    bottomResizer.classList.add('res-bottom');
    bottomResizer.classList.add('res');
    this.addMotion(bottomResizer, resizableDiv, 'bottom');

    bottomResizer.style.backgroundColor = this.backgroundColor;
    const leftResizer = document.createElement('div');
    leftResizer.classList.add('res-left');
    leftResizer.classList.add('res');
    leftResizer.style.backgroundColor = this.backgroundColor;
    this.addMotion(leftResizer, resizableDiv, 'left');

    const rightResizer = document.createElement('div');
    rightResizer.classList.add('res-right');
    rightResizer.classList.add('res');
    rightResizer.style.backgroundColor = this.backgroundColor;
    this.addMotion(rightResizer, resizableDiv, 'right');

    // Append the resizers
    resizableDiv.appendChild(topResizer);
    resizableDiv.appendChild(bottomResizer);
    resizableDiv.appendChild(leftResizer);
    resizableDiv.appendChild(rightResizer);
  }
  render() {
    const body = document.querySelector('body');
    const resizableDiv = document.createElement('div');
    // Add the styles
    resizableDiv.classList.add('resizable-div');
    // Set the translations
    resizableDiv.style.transform = `translateX(${this.globalTranslateX}px) translateY(${this.globalTranslateY}px)`;
    body.appendChild(resizableDiv);
    // Add the resizers
    this.addResizers(resizableDiv);
  }
}

export { Resizer };
