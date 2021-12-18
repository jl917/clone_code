import { useState, useContext } from 'react';
import {useStoreRef} from './Context';
let subID = 0

class Node{
  constructor(k, v){
    this.key = k
    this.value = v
  }
  getValue(){
    return this.value 
  }
  setValue(newV) {
    this.value = newV
  }
}

function subRecoilState(store, atomkey, subid, cb) {
  if(!store.nodeToComponentSubscriptions.has(`${subid}-${atomkey}`)){
    store.nodeToComponentSubscriptions.set(`${subid}-${atomkey}`, cb)
  }
}

export default function useMyRecoilValue (atom) {
  const [_, forceUpdate] = useState([])
  const { key, defaultValue } = atom
  const storeRef = useStoreRef();
  const store = storeRef.current
  let hasNode = store.atomValues.has(key)
  let node

  if (!hasNode) {
    node = new Node(key, defaultValue)
    store.atomValues.set(key, node)
  }
  node = store.atomValues.get(key)

  useEffect(() => {
    subRecoilState(store, key, subID++, () => {
      forceUpdate([])
    })
  }, [key, node, store, storeRef])

  return node.getValue()
}