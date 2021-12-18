import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import Provider from '../react-redux/Provider';
import store from './rdx';
import Mid from './Mid';

// console.log(store.getState())

const Index = () => {
  return (
    <Provider store={store}>
      <Mid />
    </Provider>
  )
}

render(
  <Index />,
  document.getElementById('app'),
);
