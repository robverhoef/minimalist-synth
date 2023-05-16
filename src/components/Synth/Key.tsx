import React from "react"
import cc from "classcat"
import { KeyboardKey } from "./types"

interface KeyProps {
  keyId: string
  keyboardKey: KeyboardKey
  playing?: boolean
  onKeyClick?: Function
}
export default function Key(props: KeyProps) {
  const { keyboardKey, keyId, playing, onKeyClick } = props
  let clss = cc([
    "key",
    keyId,
    { flat: keyboardKey.flat },
    { playing: playing },
  ])
  return (
    <div
      className={clss}
      onClick={() => onKeyClick && onKeyClick(keyboardKey)}
    >
      <span className="hint">{keyboardKey.hint}</span>
    </div>
  )
}
