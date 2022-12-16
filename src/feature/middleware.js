/**
 * @param next print2 传过来的(action) => {...} 函数
 * @param action store.dispatch 传入的 action 对象
 */
export const print1Middleware = (storeAPI) => (next) => (action) => {
  console.log('Middleware::print1')
  return next(action)
}

/**
 * @description 中间件先从这边执行，打印是从 print1 开始打印
 * @param next store.dispatch 函数
 * @param action store.dispatch 传入的 action
 * @returns store.dispatch 函数
 */
export const print2Middleware = (storeAPI) => (next) => (action) => {
  console.log('Middleware::print2')
  return next(action)
}
