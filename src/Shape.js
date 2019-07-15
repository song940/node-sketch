const Base = require('./Base');
const Rect = require('./Rect');
const shapes = require('./shapes');

class Shape extends Base {
  static create(what) {
    const A = require(shapes[what._class]);
    return new A(what);
  }
  get frame() {
    return new Rect(this._frame);
  }
}

module.exports = Shape;