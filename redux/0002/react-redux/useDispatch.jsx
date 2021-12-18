import { useContext } from 'react'
import Context from './Context';

const useDispatch = () => {
  const { store } = useContext(Context)
  return store.dispatch;
}

export default useDispatch;