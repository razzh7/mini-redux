/**
 * @description 组合函数，执行顺序为从右到左
 * @param  funcs 要组合的函数
 * @returns 要组合的函数
 */
export function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => {
    return (...args) => {
      return a(b(...args))
    }
  })
}

// example
// const num1 = (a) => a + 1
// const num2 = (a) => a + 1
// const num3 = (a) => a + 1
// console.log(compose(num1, num2, num3)(1))
