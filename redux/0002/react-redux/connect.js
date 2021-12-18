import React, { useContext, useState } from 'react';
import Context from './Context';

// connect(mstp, mdtp)(App);
const connect = (mapStateToProps, mapDispatchToProps) => {
  const connectHOC = (Component) => {
    const WrapComponent = (props) => {
      const [key, forceUpdate] = useState(0)
      const { store } = useContext(Context);
      const newProps = {
        ...props,
        ...mapStateToProps(store.getState()),
        ...mapDispatchToProps(store.dispatch),
      }

      store.subscribe(() => {
        forceUpdate(key + 1);
      })
      return <Component {...newProps} />
    }
    return WrapComponent;
  }
  return connectHOC;
}

export default connect;
