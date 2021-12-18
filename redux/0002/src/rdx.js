// import { createStore } from 'redux'
import createStore from '../redux/createStore';

// count
const initState = {
  count: 0,
}
const NEXT = 'NEXT';
const PREV = 'PREV';
const LAST = 'LAST';
export const next = () => ({ type: NEXT })
export const prev = () => ({ type: PREV })
export const last = () => ({ type: LAST })
const reducer = (state = initState, action) => {
  switch (action.type) {
    case NEXT:
      return { ...state, count: state.count + 1 };
    case PREV:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
);

store.subscribe(() => console.log(store.getState()));

export default store;
