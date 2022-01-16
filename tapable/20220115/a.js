class Tap {
  constructor() {
    this.meta = {
      parser: {},
      observer: {},
    }
  }
  enhancer(name, type, fn){
    this.meta[type][name] = fn;
  }
  applyEnhancer(name, type, ...args){
    this.meta[type][name](...args);
  }
}


const a = new Tap();

// register 
a.enhancer('fileObserver', 'observer', (...args) => {
  console.log('args', args);
})

// apply
a.applyEnhancer('fileObserver', 'observer', 'a', 'b', 'c');

a.applyEnhancer('fileObserver', 'observer', 'dd');

module.exports = a;