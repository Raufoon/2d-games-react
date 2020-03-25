class Painter {
  constructor(canvas, width, height, dotSize) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.dotSize = dotSize;
  }

  fillCanvas(color) {
    requestAnimationFrame(() => {
      const ctx = this.canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, this.width, this.height);
    });
  }

  drawDot(x, y, color) {
    requestAnimationFrame(() => {
      const ctx = this.canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(x * this.dotSize, y * this.dotSize, this.dotSize, this.dotSize);
    });
  }
}

export default Painter
