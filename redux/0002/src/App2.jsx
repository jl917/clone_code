import React, { useContext } from 'react';
import { next, prev, last } from './rdx';
// import { connect } from 'react-redux';
import connect from '../react-redux/connect';
import store from './rdx';
import useDispatch from '../react-redux/useDispatch';
import useSelector from '../react-redux/useSelector';

const App = (props) => {
  const dispatch = useDispatch();
  const Eprev = () => dispatch(prev());
  const Enext = () => dispatch(next());
  const Elast = () => dispatch(last());

  const {count} = useSelector(state => state);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={Eprev}>prev</button>
      <button onClick={Enext}>next</button>
      <button onClick={Elast}>last</button>
      <button onClick={() => console.log(props)}>get props</button>
      <button onClick={() => console.log(store.getState())}>get store</button>

    </div>
  )
}

export default App;

// export default App;

