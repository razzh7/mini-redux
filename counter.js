import { createStore } from './src/mini-redux'

const decreaseBtn = document.getElementById('decrease')
const increaseBtn = document.getElementById('increase')
const counter = document.getElementById('counter')

function render() {
  counter.innerHTML = store.getState()
}

function rooterReducer(state = 0, action) {
  switch (action.type) {
    case 'counter/increase': {
      return state + 1
    }
    case 'counter/decrease': {
      return state - 1
    }
    default:
      return state
  }
}

const store = createStore(rooterReducer)

render()

const unsubscribe = store.subscribe(render)

decreaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/decrease' })
})

increaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/increase' })
})
