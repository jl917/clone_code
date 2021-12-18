import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import Context from './Context';
import shallowEqual from './shallowEqual';

// connect(mapStateToProps, mapDispatchToProps)(App)
const connect = (mapStateToProps, mapDispatchToProps) => {

  const connectHOC = (WrappedComponent) => {
    const ConnectComponent = (props) => {
      const [count, forceComponentUpdateDispatch] = useState(0);

      const { ...wrapperProps } = props;
      const { store } = useContext(Context);
      const state = store.getState();

      const lastChildProps = useRef();
      useLayoutEffect(() => {
        lastChildProps.current = actualChildProps;
      }, []);

      const childPropsSelector = (store, wrapperProps) => {
        const stateProps = mapStateToProps(state);
        const dispatchProps = mapDispatchToProps(store.dispatch);
        return {
          ...stateProps,
          ...dispatchProps,
          ...wrapperProps,
        }
      }

      const actualChildProps = childPropsSelector(store, wrapperProps)

      store.subscribe(() => {
        // const newChildProps = childPropsSelector(store, wrapperProps);
        // if(!shallowEqual(newChildProps, lastChildProps.current)) {
        //   lastChildProps.current = newChildProps;
        //   forceComponentUpdateDispatch(count + 1);
        // }

        forceComponentUpdateDispatch(count + 1);
      });

      return <WrappedComponent {...actualChildProps} />
    }
    return ConnectComponent;
  }
  return connectHOC;
}

export default connect;
