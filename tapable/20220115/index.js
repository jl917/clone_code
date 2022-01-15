class Tap {
  constructor() {
    this.plugins = {};
  }

  plugin(name, fn) {
    this.plugins[name] = fn;
  }
  
  applyPlugin(name, ...args) {
    this.plugins[name](...args);
  }
}


const a = new Tap();

// register 
a.plugin('pluginName', (...args) => {
  console.log('args', args);
})

// apply
a.applyPlugin('pluginName', 'a', 'b', 'c');

a.applyPlugin('pluginName', 'dd');
