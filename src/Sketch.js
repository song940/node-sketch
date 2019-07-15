const fs = require('fs');
const JSZip = require('jszip');
const { promisify } = require('util');

const Base = require('./Base');
const Page = require('./Page');

const readFile = promisify(fs.readFile);
const readJSON = (repo, name) => repo
  .file(`${name}.json`)
  .async('string')
  .then(res => JSON.parse(res));

class Sketch extends Base {
  static async load(filename) {
    if (Array.isArray(filename))
      return Promise.all(filename.map(Sketch.load));
    const file = await readFile(filename);
    const repo = await JSZip.loadAsync(file);
    const [document, meta, user] = await Promise.all([
      'document', 'meta', 'user'
    ].map(readJSON.bind(null, repo)));
    var pages;
    pages = document.pages.map(page => readJSON(repo, page._ref));
    pages = await Promise.all(pages);
    pages = pages.map(page => new Page(page));
    return new Sketch({ repo, document, meta, user, pages });
  }
  constructor(options) {
    super();
    Object.assign(this, options);
  }
  get symbolsPage() {
    return this.pages.find(page => page.name === 'Symbols');
  }

  get symbols() {
    return this.pages
      .map(page => page.getAll('symbolMaster'))
      .reduce((symbols, currentPage) => symbols.concat(currentPage));
  }

  get foreignSymbols() {
    return this.document.foreignSymbols.map(symbol => symbol.symbolMaster);
  }

  get layerStyles() {
    return this.document.layerStyles.objects;
  }

  get foreignLayerStyles() {
    return this.document.foreignLayerStyles.map(style => style.localSharedStyle);
  }

  get textStyles() {
    return this.document.layerTextStyles.objects;
  }

  get foreignTextStyles() {
    return this.document.foreignTextStyles.map(style => style.localSharedStyle);
  }

  get colors() {
    return this.document.assets.colors;
  }

  get colorAssets() {
    return this.document.assets.colorAssets;
  }

  get gradients() {
    return this.document.assets.gradients;
  }

  get gradientAssets() {
    return this.document.assets.gradientAssets;
  }

  get previews() {
    const { repo } = this;
    return repo.folder('previews');
  }

}

module.exports = Sketch;