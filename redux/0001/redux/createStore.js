// type StoreEnhancer = (next: StoreCreator) => StoreCreator

const createStore = (reducer, enhancer) => {

  let state; // 记录所有状态
  let listeners = []; // 保存所有注册的回调

  if(enhancer && typeof enhancer === 'function'){
    const newCreateStore = enhancer(createStore);
    const newStore = newCreateStore(reducer);
    return newStore;
  }

  // subscribe就是将回调保存下来
  const subscribe = (cb) => listeners.push(cb);

  // dispatch就是将所有的回调拿出来依次执行就行
  const dispatch = (action) => {
    state = reducer(state, action) // 记录所有状态
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  dispatch({type: ''})

  // getState直接返回state
  const getState = () => state;

  return { subscribe, dispatch, getState }
}

export default createStore;
