import compose from './compose'

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)
    const MiddleWareAPI = {
      state: store.getState,
      dispatch: store.dispatch,
    }

    const chain = middlewares.map((middleware) => middleware(MiddleWareAPI))
    const dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}
