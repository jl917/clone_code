import React from 'react';
import Context from './Context';

const Provider = ({ store, children }) => {
  return (
    <Context.Provider value={{ store }}>
      {children}
    </Context.Provider>
  )
}

export default Provider;