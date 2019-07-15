const Sketch = require('..');
const createRender = require('../render');

(async () => {

  const sketch = await Sketch.load('/Users/Lsong/Desktop/demo.sketch');
  const { pages, symbolsPage, foreignSymbols, gradientAssets } = sketch;

  const render = createRender({
    output: './dist'
  });

  pages.forEach(page => render(page));

})();
