// 一个中间件接收store作为参数，会返回一个函数
// 返回的这个函数接收老的dispatch函数作为参数，会返回一个新的函数
// 返回的新函数就是新的dispatch函数，这个函数里面可以拿到外面两层传进来的store和老dispatch函数
const applyMiddleware = (middleware) => {
  // applyMiddleware的返回值应该是一个enhancer, enhancer的参数是createStore
  const enhancer = (createStore) => {
    // enhancer应该返回一个新的createStore
    const newCreateStore = (reducer) => {
      const store = createStore(reducer);

      // 将middleware拿过来执行下，传入store
      const fn = middleware(store);

      // 解构出原始的dispatch
      const { dispatch } = store;

      // 将原始的dispatch函数传给func执行, 得到增强版的dispatch
      const newDispatch = fn(dispatch);

      // 返回的时候用增强版的newDispatch替换原始的dispatch
      return {...store, dispatch: newDispatch};
    }
    return newCreateStore;
  }
  return enhancer;
}

export default applyMiddleware;