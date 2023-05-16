import { angleToValue, valueToAngle } from './helpers'
import { test, expect } from 'vitest'

test('angleToValue(180,0,100)', () => {
  expect(angleToValue(180, 0, 100)).toBe(50)
  expect(angleToValue(45, 0, 100)).toBe(12.5)
  expect(angleToValue(45, -100, 100)).toBe(-75)
})

test('valueToAngle(50,0,100)', () => {
  expect(valueToAngle(50, 0, 100)).toBe(180)
  expect(valueToAngle(12.5, 0, 100)).toBe(45)
  expect(valueToAngle(-75, -100, 100)).toBe(45)
})
