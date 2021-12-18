import { useContext, useEffect, useState } from 'react';
import Context from './Context';

const useSelector = (selector) => {
  const { store } = useContext(Context);
  const [key, forceUpdate] = useState(0);

  const newState = selector(store.getState());

  store.subscribe(() => {
    forceUpdate(key + 1);
  })
  return newState;
}

export default useSelector;