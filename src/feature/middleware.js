export const print1 = (storeAPI) => (next) => (action) => {
  console.log('Middleware::print1')
  return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('Middleware::print2')
  return next(action)
}
