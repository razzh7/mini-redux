import { createStore, compose, applyMiddleware } from './src/mini-redux'
import { sayHiEnhancer, sayHelloEnhancer } from './src/feature/enhancer'
import { print1Middleware, print2Middleware } from './src/feature/middleware'
import counterReducer from './src/feature/counter'

const decreaseBtn = document.getElementById('decrease')
const increaseBtn = document.getElementById('increase')
const counter = document.getElementById('counter')

// 可以在这里打个 debuuger 来看 compose 执行过程<从右到左依次排列函数，返回组合函数>
// const composeEnhancer = compose(sayHiEnhancer, sayHelloEnhancer)
// const store = createStore(counterReducer, undefined, composeEnhancer)
const middleware = applyMiddleware(print1Middleware, print2Middleware)
const store = createStore(counterReducer, 
  compose(sayHiEnhancer, sayHelloEnhancer, middleware))

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
