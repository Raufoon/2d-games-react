import {FACE} from './constants.js';

const {UP, DOWN, LEFT, RIGHT} = FACE;

class Snake {
  constructor(x, y) {
    this.color = 'yellow';
    this.head = {x, y, face: RIGHT};
    this.tail = {x: x-5, y, face: RIGHT};
    this.corners = [];
  }

  getAllDots() {
    const color = this.color;
    let current = this.tail;
    const morePoints = [...this.corners, this.head];

    let dots = [];

    for (let i = 0; i < morePoints.length; i++) {
      const x0 = Math.min(current.x, morePoints[i].x);
      const y0 = Math.min(current.y, morePoints[i].y);
      const x1 = Math.max(current.x, morePoints[i].x);
      const y1 = Math.max(current.y, morePoints[i].y);

      if (x0 === x1) {
        for (let j = y0; j <= y1; j++) {
          dots.push({x: x0, y: j, color});
        }

      } else if (y0 === y1) {
        for (let j = x0; j <= x1; j++) {
          dots.push({x: j, y: y0, color});
        }
      }

      current = morePoints[i];
    }
    return dots;
  }

  moveForward() {
    this.head = this._nextPosition(this.head);
    this.tail = this._nextPosition(this.tail);

    if (this.corners.length > 0){
      const {x, y} = this.corners[0];

      if (x === this.tail.x && y === this.tail.y) {
        this.tail = this.corners.shift();
      }
    }
  }

  changeFace(face) {
    this.corners = [...this.corners, {...this.head, face}];
    this.head = {...this.head, face};
  }

  _nextPosition(corner) {
    let {x, y, face} = corner;
    switch (face) {
      case UP:
        y--;
        break;

      case DOWN:
        y++;
        break;

      case RIGHT:
        x++;
        break;

      case LEFT:
        x--;
        break;

      default:
    }
    return {x, y, face};
  }
}

export default Snake;
