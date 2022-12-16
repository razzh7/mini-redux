import compose from './compose'

/**
 *
 * @param  middlewares 所有中间件组成的数组
 * @returns 返回的函数是 createStore enhancer 执行想要的格式:
 * enhancer(createStore)(reducer, preloadedState)
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)
    const MiddleWareAPI = {
      state: store.getState,
      dispatch: store.dispatch,
    }

    // 返回一个中间件函数数组
    const chain = middlewares.map((middleware) => middleware(MiddleWareAPI))
    // 重写(劫持) dispatch 函数
    const dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}
