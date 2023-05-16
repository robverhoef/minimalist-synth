import React, { useRef, useState, useEffect } from 'react'
import { angleToValue, valueToAngle } from './helpers'
import './styles.css'

interface KnobProps {
  size: number
  minValue: number
  maxValue: number
  value: number
  precision: number | null
  step: number
}
export default function Knob(props) {
  var x0, y0, x1, y1: number
  var v = 0
  const knobRef = useRef(null)
  const { size, minValue, maxValue, defaultValue, step, precision } = props
  const [angle, setAngle] = useState(0)
  const [value, setValue] = useState(defaultValue)

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
    v += angleDelta
    v = v < 0 ? 360 - v : v > 360 ? v - 360 : v
    setAngle(v)
    setValue(angleToValue(v, minValue, maxValue))
  }
  const handleMouseUp = (_event: MouseEvent) => {
    console.log('handleMouseUp')
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }
  const handleMouseDown = (event: React.MouseEvent) => {
    const { pageX, pageY } = event
    initTurn()
    x1 = pageX
    y1 = pageY
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
  const initTurn = () => {
    if (!knobRef.current) {
      return
    }
    const rect = (knobRef.current as HTMLElement).getBoundingClientRect()
    x0 = rect.left + 0.5 * rect.width
    y0 = rect.top + 0.5 * rect.height
    x1 = x0
  }
  useEffect(() => {
    // initialize starting angle
    console.debug('init angle:', value, minValue, maxValue)
    setAngle(valueToAngle(value, minValue, maxValue))
  }, [value])

  useEffect(() => {
      initTurn()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [knobRef])

  useEffect(() => {
    let val: number = angleToValue(angle, minValue, maxValue)
    setValue(val)
  }, [angle])

  return (
    <div className="knob__container">
      <div
        className="knob"
        ref={knobRef}
        onMouseDown={(e) => handleMouseDown(e)}
        style={{ transform: `rotate(${angle}deg)` }}
      ></div>
      <span
        className="knob__knob-value"
        draggable={false}
      >
        {precision !== 0 && precision ? value.toFixed(precision) : value}
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
