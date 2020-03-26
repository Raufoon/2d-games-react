class Painter {
  constructor(canvas, width, height, dotSize) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.dotSize = dotSize;
  }

  static defaultTextProps = {size:20, font:'Arial', color:'white'};

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

  drawText(text, x, y, textProps) {
    requestAnimationFrame(() => {
      const {size, color, font} = {...Painter.defaultTextProps, ...textProps};
      var ctx = this.canvas.getContext("2d");

      ctx.font = `${size}px ${font}`;
      ctx.fillStyle = color;
      ctx.fillText(text, x * this.dotSize, (y * this.dotSize) + size);
    });
  }
}

export default Painter
