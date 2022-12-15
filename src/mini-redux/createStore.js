export default function createStore(reducer) {
  let state
  const listeners = []

  function getState() {
    return state
  }

  // 订阅
  function subscribe(listener) {
    listeners.push(listener)

    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  // 发布订阅
  function dispatch(action) {
    state = reducer(state, action)

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  dispatch({ type: '@@redux/INIT' })

  return {
    getState,
    subscribe,
    dispatch,
  }
}
