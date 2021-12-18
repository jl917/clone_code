// import { createStore, combineReducers } from 'redux'
import createStore from '../redux/createStore';
import combineReducers from '../redux/combineReducers';
import applyMiddleware from '../redux/applyMiddleware'
// import { applyMiddleware } from 'redux';

// count
const initState = {
  count: 0,
}
const NEXT = 'NEXT';
const PREV = 'PREV';
export const next = () => ({ type: NEXT })
export const prev = () => ({ type: PREV })
const reducer = (state = initState, action) => {
  switch (action?.type) {
    case NEXT:
      return { ...state, count: state.count + 1 };
    case PREV:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// count2
const initState2 = {
  count2: 0,
}
const NEXT2 = 'NEXT2';
const PREV2 = 'PREV2';
export const next2 = () => ({ type: NEXT2 })
export const prev2 = () => ({ type: PREV2 })
const reducer2 = (state = initState2, action) => {
  switch (action.type) {
    case NEXT2:
      return { ...state, count2: state.count2 + 1 };
    case PREV2:
      return { ...state, count2: state.count2 - 1 };
    default:
      return state;
  }
}


const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action);
  console.log('next state', store.getState())
  console.groupEnd();
  return result;
}

const store = createStore(
  reducer,
  // combineReducers({r1: reducer, r2: reducer2}),
  applyMiddleware(logger)
);

console.log(store)

store.subscribe(() => console.log(store.getState()));

export default store;
