import { expect, test } from 'vitest'
import { createStore } from '../src/mini-redux'
import rooterReducer from '../src/feature/counter'

let a = 1
const changeVariable = () => (a = 2)

test('getState should be 0', () => {
  const store = createStore(rooterReducer)

  expect(store.getState()).toBe(0)
})

test('subscribe func should be called', () => {
  const store = createStore(rooterReducer)
  store.subscribe(changeVariable)
  store.dispatch({ type: 'counter/increase' })

  expect(a).toBe(2)
})

test('unsubscribe func called before dispatch', () => {
  const store = createStore(rooterReducer)
  const unsubscribe = store.subscribe(changeVariable)
  unsubscribe()
  store.dispatch({ type: 'counter/increase ' })

  expect(store.getState()).toBe(0)
})

test('dispatch action verify result', () => {
  const store = createStore(rooterReducer)
  store.dispatch({ type: 'counter/increase' })
  store.dispatch({ type: 'counter/increase' })

  expect(store.getState()).toBe(2)

  store.dispatch({ type: 'counter/decrease' })

  expect(store.getState()).toBe(1)
})
