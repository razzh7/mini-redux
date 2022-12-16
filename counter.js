import { createStore } from './src/mini-redux'
import { sayHiEnhancer, sayHelloEnhancer } from './src/feature/enhancer'
import { compose } from './src/mini-redux/compose'
import rooterReducer from './src/feature/counter'

const decreaseBtn = document.getElementById('decrease')
const increaseBtn = document.getElementById('increase')
const counter = document.getElementById('counter')

// 可以在这里打个 debuuger 来看 compose 执行过程<从右到左依次执行函数>
const composeEnhancer = compose(sayHiEnhancer, sayHelloEnhancer)
const store = createStore(rooterReducer, undefined, composeEnhancer)

function render() {
  counter.innerHTML = store.getState()
}

render()

const unsubscribe = store.subscribe(render)

decreaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/decrease' })
})

increaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/increase' })
})
