import React, { useContext } from 'react';
import { next, prev, last } from './rdx';
// import { connect } from 'react-redux';
import connect from '../react-redux/connect';
import store from './rdx';

const App = (props) => {
  const { count, next, prev, last } = props;

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <button onClick={last}>last</button>
      <button onClick={() => console.log(props)}>get props</button>
      <hr />
    </div>
  )
}

const mapStateToProps = (state) => ({
  count: state?.count
})

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(next()),
  prev: () => dispatch(prev()),
  last: () => dispatch(last()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;

