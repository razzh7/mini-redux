export default function createStore(reducer, preloadedState, enhancer) {
  // 当省略了 preloadedState，直接传入 enhancer 时
  if (typeof preloadedState === 'function' && enhancer === undefined) {
    enhancer = preloadedState
    preloadedState = undefined
  }
  
  // 增强器 enhancer logic
  if (enhancer !== undefined && typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let state = preloadedState
  // 订阅器
  const listeners = []

  // 获取最新的 State 值
  function getState() {
    return state
  }

  // 订阅函数
  function subscribe(listener) {
    listeners.push(listener)

    // 解绑订阅函数
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  // 发布订阅
  function dispatch(action) {
    // 调用 reducer 将最新的值赋值给 state
    state = reducer(state, action)

    // 循环执行订阅器里面的函数
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  // 当一个 Store 创建时，自动初始化 state 的值
  dispatch({ type: '@@redux/INIT' })

  return {
    getState,
    subscribe,
    dispatch,
  }
}
