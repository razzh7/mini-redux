import { describe, expect, test, vi } from 'vitest'
import { createStore } from '../src/mini-redux'
import { plusNums, subtractNums, unknowAction } from './helpers/actionCreators'
import counterReducer from '../src/feature/counter'

describe('counter reducer', () => {
  test('getState should be 0', () => {
    const store = createStore(counterReducer)
    expect(store.getState()).toBe(0)
  })

  test('subscribe func should be called', () => {
    const listener = vi.fn()
    const store = createStore(counterReducer)
    store.subscribe(listener)
    store.dispatch(plusNums())

    expect(listener.mock.calls.length).toBe(1)
  })

  test('unsubscribe func called before dispatch', () => {
    const store = createStore(counterReducer)
    const listenerA = vi.fn()
    const listenerB = vi.fn()

    const unsubscribeA = store.subscribe(listenerA)
    unsubscribeA()
    const unsubscribeB = store.subscribe(listenerB)

    store.dispatch(unknowAction())

    // listenerA 被解除订阅，所以在 dispatch 触发的时候不会被调用
    expect(listenerA.mock.calls.length).toBe(0)
    expect(listenerB.mock.calls.length).toBe(1)
  })

  test('dispatch action verify result', () => {
    const store = createStore(counterReducer)
    store.dispatch(plusNums())
    store.dispatch(plusNums())

    expect(store.getState()).toBe(2)

    store.dispatch(subtractNums())

    expect(store.getState()).toBe(1)
  })

  test('accpects enhancer as the createStore third arguments', () => {
    /**
     * @param args[0] reducer
     * @param args[1] preloadedState
     */
    const spyEnhancer =
      (createStore) =>
      (...args) => {
        expect(args[0]).toBe(counterReducer)
        expect(args[1]).toBe(undefined)
        expect(args.length).toBe(2)

        const store = createStore(...args)

        return {
          ...store,
          dispatch: vi.fn(store.dispatch),
        }
      }

    const store = createStore(counterReducer, undefined, spyEnhancer)
    const action = plusNums()
    store.dispatch(action)

    expect(store.dispatch).toBeCalledWith(action)
    expect(store.getState()).toBe(1)
  })
})
