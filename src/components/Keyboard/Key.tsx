import React from 'react'
import cc from 'classcat'
import { KeyboardKey } from './types'

interface KeyProps {
  keyId: string
  keyboardKey: KeyboardKey
  playing?: boolean
  onKeyClick?: (kbkey: KeyboardKey) => void
  onKeyPressed: (e: React.KeyboardEvent<HTMLElement>) => void
  onKeyReleased: (e: React.KeyboardEvent<HTMLElement>) => void
}
export default function Key(props: KeyProps) {
  const {
    keyboardKey,
    keyId,
    playing,
    onKeyClick,
    onKeyPressed,
    onKeyReleased,
  } = props
  const clss = cc([
    'key',
    keyId,
    { flat: keyboardKey.flat },
    { playing: playing },
  ])
  return (
    <div
      role="button"
      tabIndex={-1}
      className={clss}
      onClick={(_e) => onKeyClick && onKeyClick(keyboardKey)}
      onKeyDown={(e) => onKeyPressed && onKeyPressed(e)}
      onKeyUp={(e) => onKeyReleased && onKeyReleased(e)}
    >
      <span className="hint">{keyboardKey.hint}</span>
    </div>
  )
}
