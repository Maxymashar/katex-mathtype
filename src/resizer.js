class Resizer {
  constructor(
    initialTranslateX,
    initialTranslateY,
    color,
    onDimensionChange,
    outlineColor,
    onClick
  ) {
    this.globalTranslateX = initialTranslateX;
    this.globalTranslateY = initialTranslateY;
    this.originalRight = null;
    this.originalBottom = null;
    this.backgroundColor = color;

    this.originalX = null;
    this.originalY = null;
    this.div = null;
    this.onDimensionChange = onDimensionChange;
    this.outlineColor = outlineColor;
    this.onClick = onClick;
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
            // Call onDimensionChange
            this.onDimensionChange(
              resizableDiv.offsetWidth,
              resizableDiv.offsetHeight
            );
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
            const { left } = resizer.getBoundingClientRect();
            // Get the difference
            const difference = left - clientX;

            resizableDiv.style.width = `${
              difference + resizableDiv.offsetWidth
            }px`;
            // Set the translations
            this.globalTranslateX -= difference;
            resizableDiv.style.transform = `translateX(${this.globalTranslateX}px) translateY(${this.globalTranslateY}px)`;
            // Call onDimensionChange
            this.onDimensionChange(
              resizableDiv.offsetWidth,
              resizableDiv.offsetHeight
            );
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
            // Call onDimensionChange
            this.onDimensionChange(
              resizableDiv.offsetWidth,
              resizableDiv.offsetHeight
            );
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
            // Call onDimensionChange
            this.onDimensionChange(
              resizableDiv.offsetWidth,
              resizableDiv.offsetHeight
            );
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
    // topResizer.addEventListener('click', () =>
    //   topResizer.classList.toggle('not-visible')
    // );
    this.addMotion(topResizer, resizableDiv, 'top');
    topResizer.style.backgroundColor = this.backgroundColor;

    const bottomResizer = document.createElement('div');
    bottomResizer.classList.add('res-bottom');
    bottomResizer.classList.add('res');
    // bottomResizer.addEventListener('click', () =>
    //   bottomResizer.classList.toggle('not-visible')
    // );
    this.addMotion(bottomResizer, resizableDiv, 'bottom');
    bottomResizer.style.backgroundColor = this.backgroundColor;

    const leftResizer = document.createElement('div');
    leftResizer.classList.add('res-left');
    leftResizer.classList.add('res');
    // leftResizer.addEventListener('click', () =>
    //   leftResizer.classList.toggle('not-visible')
    // );
    this.addMotion(leftResizer, resizableDiv, 'left');
    leftResizer.style.backgroundColor = this.backgroundColor;

    const rightResizer = document.createElement('div');
    rightResizer.classList.add('res-right');
    rightResizer.classList.add('res');
    // rightResizer.addEventListener('click', () =>
    //   rightResizer.classList.toggle('not-visible')
    // );
    this.addMotion(rightResizer, resizableDiv, 'right');
    rightResizer.style.backgroundColor = this.backgroundColor;

    // Append the resizers
    resizableDiv.appendChild(topResizer);
    resizableDiv.appendChild(bottomResizer);
    resizableDiv.appendChild(leftResizer);
    resizableDiv.appendChild(rightResizer);
  }
  render() {
    const body = document.querySelector('body');
    const resizableDiv = document.createElement('div');
    resizableDiv.style.outlineColor = this.outlineColor;
    this.div = resizableDiv;
    const onMouseDown = ({
      clientX: mouseDownX,
      clientY: mouseDownY,
      shiftKey,
    }) => {
      if (shiftKey) {
        const move = ({ clientX, clientY }) => {
          if (!this.originalX && !this.originalY) {
            this.originalX = mouseDownX;
            this.originalY = mouseDownY;
          } else {
            // Get the differences
            const dx = clientX - this.originalX;
            const dy = clientY - this.originalY;
            // Set the transforms
            this.globalTranslateX += dx;
            this.globalTranslateY += dy;
            resizableDiv.style.transform = `translateX(${this.globalTranslateX}px) translateY(${this.globalTranslateY}px)`;
            // Reset the original Values
            this.originalX = clientX;
            this.originalY = clientY;

            // call onDimensionChange
            this.onDimensionChange(
              resizableDiv.offsetWidth,
              resizableDiv.offsetHeight
            );
          }
        };

        const stopMove = () => {
          window.removeEventListener('mousemove', move);
          this.originalX = null;
          this.originalY = null;
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', stopMove);
      }
    };

    resizableDiv.addEventListener('click', () => {
      this.onClick();
    });
    resizableDiv.addEventListener('mousedown', onMouseDown);
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
