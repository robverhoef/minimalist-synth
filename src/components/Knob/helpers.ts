export const valueToAngle = (
  v: number,
  minValue: number,
  maxValue: number
): number => {
  let a = ((v - minValue) * 360) / (maxValue - minValue)
  return a
}
export const angleToValue = (
  a: number,
  minValue: number,
  maxValue: number
): number => {
  let v = minValue + (maxValue - minValue) * (a / 360)
  return v
}
