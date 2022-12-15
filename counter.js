import { createStore } from './src/mini-redux'
import rooterReducer from './src/feature/counter'

const decreaseBtn = document.getElementById('decrease')
const increaseBtn = document.getElementById('increase')
const counter = document.getElementById('counter')

function render() {
  counter.innerHTML = store.getState()
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
