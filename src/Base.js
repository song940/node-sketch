
class Base {
  constructor(options) {
    for (const k in options) {
      if (k in this) {
        this['_' + k] = options[k];
      } else {
        this[k] = options[k];
      }
    }
  }
  get id() {
    return this.do_objectID;
  }
}

module.exports = Base;