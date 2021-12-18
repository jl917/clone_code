import React, { useEffect, useRef, useState } from 'react';
import Context from './Context';

const nodes = new Map()
const subNodes = new Map()

const Root = ({ children }) => {
  const notifyUpdate = useRef();

  const setNotify = (x) => {
    notifyUpdate.current = x;
  }

  const replaceState = (key) => {
    notifyUpdate.current();
    storeState.current.updateAtomKey = key;
  }

  const storeState = useRef({
    atomValues: NodeList,
    replaceState,
    nodeToComponentSubscriptions: subNodes,
  })

  const Batcher = ({ setNotify }) => {
    const [_, setState] = useState([]);
    setNotify(() => setState([]))

    useEffect(() => {
      storeState.current.nodeToComponentSubscriptions.forEach((cb) => {
        cb()
      })
    }, [])
    return null;
  }

  return (
    <Context.Provider value={storeState}>
      <Batcher setNotify={setNotify} />
      {children}
    </Context.Provider>
  )
}

export default Root;
