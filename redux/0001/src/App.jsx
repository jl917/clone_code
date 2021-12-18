import React from 'react';
import { next, prev } from './rdx';
// import { connect } from 'react-redux';
import connect from '../react-redux/connect';

import store from './rdx';

const App = (props) => {
  const { count, next, prev } = props;

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <button onClick={() => console.log(props)}>get props</button>
      <button onClick={() => console.log(store.getState())}>get storeState</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  count: state?.count
})

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(next()),
  prev: () => dispatch(prev()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
