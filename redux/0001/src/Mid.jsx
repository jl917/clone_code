import React from 'react';
import App from './App';

const Mid = () => {
  console.log('mid rerender')
  return (
    <App />
  )
}

export default React.memo(Mid);
