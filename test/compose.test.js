import { describe, test, expect, vi } from 'vitest'
import compose from '../src/mini-redux/compose'

describe('compose', () => {
  test('composes from right to left', () => {
    const double = (x) => x * 2
    const square = (x) => x * x

    expect(compose(square)(5)).toBe(25)
    expect(compose(square, double)(5)).toBe(100)
    expect(compose(double, square, double)(5)).toBe(200)
  })
})
