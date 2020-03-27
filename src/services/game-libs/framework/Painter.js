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

  _drawSimpleDot(x, y, color) {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x * this.dotSize, y * this.dotSize, this.dotSize, this.dotSize);
  }

  _drawRoundDot(x, y, color) {
    const ctx = this.canvas.getContext('2d');
    const centerX = x * this.dotSize + (this.dotSize / 2);
    const centerY = y * this.dotSize + (this.dotSize / 2);
    const radius = this.dotSize / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawDot(dot) {
    requestAnimationFrame(() => {
      const {x, y, color, isRound} = dot;
      if (isRound) {
        this._drawRoundDot(x, y, color)
      } else {
        this._drawSimpleDot(x, y, color);
      }
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
