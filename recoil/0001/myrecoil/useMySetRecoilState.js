import { useState, useContext } from 'react';
import Context from './Context';

export default function useMySetRecoilState (atom) {
  const { key, defaultValue } = atom;
  let node;
  const store = useStoreRef().current;

  const hasNode = store.atomValues.has(key)
  if (hasNode) {
    node = store.atomValues.get(key)
  } else {
    const newNode = new Node(key, defaultValue)
    store.atomValues.set(key, newNode)
    node = store.atomValues.get(key)
  }

  const setState = (newValueOrUpdater) => {
    let newValue
    if (typeof newValueOrUpdater === 'function') {
      newValue = newValueOrUpdater(node.getValue())
    }
    node.setValue(newValue)
    store.atomValues.set(key, node)
    store.replaceState()
  }
  return setState;
}