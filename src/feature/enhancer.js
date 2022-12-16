/**
 * @param createStore sayHelloEnhancer 的 return function
 */
export function sayHiEnhancer(createStore) {
  return (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)

    function newDispatch1(action) {
      store.dispatch(action)
      console.log('Enhancer::Hi')
    }

    return { ...store, dispatch: newDispatch1 }
  }
}

/**
 * @param createStore 来自 createStore.js 中传入的原生 createStore 函数
 */
export function sayHelloEnhancer(createStore) {
  return (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)

    function newDispatch2(action) {
      store.dispatch(action)
      console.log('Enhancer::Hello')
    }

    return { ...store, dispatch: newDispatch2 }
  }
}
