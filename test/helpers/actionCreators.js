export function plusNums() {
  return { type: 'counter/increase' }
}

export function subtractNums() {
  return { type: 'counter/decrease' }
}

export function unknowAction() {
  return { type: 'UNKNOW_ACTION' }
}
