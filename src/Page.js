const Base = require('./Base');
const Style = require('./style');
const Artboard = require('./Artboard');

class Page extends Base {
  get style() {
    return new Style(this._style);
  }
  get layers() {
    return this._layers.map(layer => new Artboard(layer));
  }

}

module.exports = Page;