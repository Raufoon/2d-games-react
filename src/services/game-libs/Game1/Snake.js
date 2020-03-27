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

  grow() {
    this.head = this._nextPosition(this.head);
  }

  isOnMyBody(point) {
    const X = point.x;
    const Y = point.y;

    let current = this.tail;

    for (let i = 0; i < this.corners.length; i++) {
      const {x, y} = this.corners[i];
      if (current.x === X && current.y === Y) break;

      if (current.x === x && x === X) {
        const y0 = Math.min(current.y, y);
        const y1 = Math.max(current.y, y);
        if (X === x && y0 < Y && Y < y1) {
          return true;
        }

      } else if (current.y === y && y === Y) {
        const x0 = Math.min(current.x, x);
        const x1 = Math.max(current.x, x);
        if (x0 < X && X < x1) {
          return true;
        }
      }

      current = this.corners[i];
    }

    return false;
  }

  hasEatenMyself() {
    return this.isOnMyBody(this.head);
  }

  moveForward() {
    this.head = this._nextPosition(this.head);

    while(this.corners.length > 0) {
      const {x, y} = this.corners[0];

      if (x === this.tail.x && y === this.tail.y) {
        this.tail = this.corners.shift();

      } else break;
    }

    this.tail = this._nextPosition(this.tail);
  }

  _isValidFace(face) {
    if ((face === UP || face === DOWN) && (this.head.face === UP || this.head.face === DOWN)) {
      return false;
    }
    if ((face === LEFT || face === RIGHT) && (this.head.face === LEFT || this.head.face === RIGHT)) {
      return false;
    }
    if (this.corners.length > 0) {
      const {x, y} = this.corners[this.corners.length - 1];
      if (x === this.head.x && y === this.head.y) return false;
    }
    return true;
  }

  changeFace(face) {
    if (!this._isValidFace(face)) return;
    this.corners.push({...this.head, face});
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
