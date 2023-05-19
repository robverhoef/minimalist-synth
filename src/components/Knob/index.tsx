import React, { useRef, useState, useEffect } from 'react'
import { angleToValue, valueToAngle } from './helpers'
import './styles.css'

interface KnobProps {
  id?: string
  size: number
  minValue: number
  maxValue: number
  value: number
  precision: number | null
  defaultValue: number
  step?: number
  onChange?: (e: { value: number }) => void
}
export default function Knob(props: KnobProps) {
  let x0, y0, x1, y1: number
  let currentAngle = 0
  const knobRef = useRef(null)
  const { minValue, maxValue, defaultValue, step, precision, onChange } = props
  const [angle, setAngle] = useState(0)
  const value = useRef(defaultValue)

  const calculateAngle = (x: number, y: number): number => {
    const ax = x1 - x0
    const ay = y1 - y0
    const bx = x - x0
    const by = y - y0
    x1 = x
    y1 = y
    const crossProduct = ax * by - ay * bx
    const z = Math.sqrt((ax * ax + ay * ay) * (bx * bx + by * by))
    return (180 * Math.asin(crossProduct / z)) / Math.PI
  }

  const handleMouseMove = (event: MouseEvent) => {
    const { pageX, pageY } = event
    const angleDelta = calculateAngle(pageX, pageY)
    currentAngle += angleDelta
    currentAngle =
      currentAngle < 0
        ? 360 - currentAngle
        : currentAngle > 360
        ? currentAngle - 360
        : currentAngle
    let v = angleToValue(currentAngle, minValue, maxValue)
    v = step ? Math.round(v / step) * step : v
    if (v != value.current) {
      value.current = v
      setAngle(valueToAngle(v, minValue, maxValue))
      if (onChange) {
        onChange({ value: value.current })
      }
    }
  }

  const handleMouseUp = (_event: MouseEvent) => {
    // console.debug('mouseUp')
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    // console.debug('mouseDown')
    const { pageX, pageY } = event
    if (!knobRef.current) {
      return
    }
    const rect = (knobRef.current as HTMLElement).getBoundingClientRect()
    x0 = rect.left + 0.5 * rect.width
    y0 = rect.top + 0.5 * rect.height
    x1 = x0

    x1 = pageX
    y1 = pageY

    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
  }

  useEffect(() => {
    // initialize starting angle
    setAngle(valueToAngle(defaultValue, minValue, maxValue))
  }, [defaultValue, maxValue, minValue])

  useEffect(() => {
    const val: number = angleToValue(angle, minValue, maxValue)
    value.current = val
  }, [angle, minValue, maxValue])

  return (
    <div className="knob__container">
      <div
        tabIndex={0}
        className="knob"
        ref={knobRef}
        onMouseDown={(e) => handleMouseDown(e)}
        style={{ transform: `rotate(${angle}deg)` }}
        role="button"
      ></div>
      <span
        className="lcd knob__knob-value"
        draggable={false}
      >
        {precision ? value.current.toFixed(precision) : value.current}
      </span>
    </div>
  )
}

Knob.defaultProps = {
  size: 30,
  minValue: 0,
  maxValue: 360,
  defaultValue: 0,
  precision: null,
  step: 1,
}
