import { createContext, useContext } from 'react';

const storeContext = createContext();

export const useStoreRef = () => useContext(storeContext)


export default storeContext;
