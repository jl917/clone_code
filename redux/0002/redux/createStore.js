const createStore = (reducer) => {

  let state;
  let listners = [];

  const getState = () => state;

  const subscribe = (listner) => listners.push(listner)

  const dispatch = (action) => {
    state = reducer(state, action);
    for (let i = 0; i < listners.length; i++) {
      const listner = listners[i];
      listner()
    }
  }

  dispatch({type: ''})

  return {
    subscribe,
    getState,
    dispatch,
  };
}

export default createStore;
