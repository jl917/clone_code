const combineReducers = (reducerMap) => {
  // 先把参数里面所有的键值拿出来
  const reducerKeys = Object.keys(reducerMap);

  // 返回值是一个普通结构的reducer函数
  const reducer = (state = {}, action) => {
    const newState = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      // reducerMap里面每个键的值都是一个reducer，我们把它拿出来运行下就可以得到对应键新的state值
      // 然后将所有reducer返回的state按照参数里面的key组装好
      // 最后再返回组装好的newState就行
      const key = reducerKeys[i];
      const currentReducer = reducerMap[key];
      newState[key] = currentReducer(state[key], action);
    }
    return newState;
  }

  return reducer;
}

export default combineReducers;
