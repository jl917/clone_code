### step1: createStore  
createStore：这个API接受reducer方法作为参数，返回一个store，主要功能都在这个store上。

- store.subscribe: 订阅state的变化，当state变化的时候执行回调，可以有多个subscribe，里面的回调会依次执行。
- store.dispatch: 发出action的方法，每次dispatch action都会执行reducer生成新的state，然后执行subscribe注册的回调。
- store.getState:一个简单的方法，返回当前的state。

```