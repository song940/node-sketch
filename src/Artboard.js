const Base = require('./Base');
const Style = require('./Style');
const Color = require('./Color');
const Shape = require('./Shape');

class Artboard extends Base {
  get style() {
    return new Style(this._style);
  }
  get backgroundColor() {
    return new Color(this._backgroundColor);
  }
  get layers() {
    return this._layers.map(Shape.create);
  }
}

module.exports = Artboard;