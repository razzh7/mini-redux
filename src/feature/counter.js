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

export default rooterReducer
