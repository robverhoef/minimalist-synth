import React, { useState } from 'react'
import { KeyboardKey } from './types'
import Key from './Key'
import './styles.css'

interface KeyboardProps {
  octave: number
  keyPressed: (e: KeyboardKey) => void
  keyReleased: (e: KeyboardKey) => void
  keyClicked: (e: KeyboardKey) => void
  kbref: any
}

export default function Keyboard(props: KeyboardProps) {
  const { octave, keyPressed, keyReleased, keyClicked, kbref } = props
  const [playing, setPlaying] = useState(new Set<string>())

  const keys: KeyboardKey[] = [
    { key: 'a', flat: false, note: 'C', hint: 'A', octave: octave },

    { key: 'w', flat: true, note: 'Db', hint: 'W', octave: octave },

    { key: 's', note: 'D', hint: 'S', octave: octave },

    { key: 'e', flat: true, note: 'Eb', hint: 'E', octave: octave },

    { key: 'd', note: 'E', hint: 'D', octave: octave },

    { key: 'f', note: 'F', hint: 'F', octave: octave },

    { key: 't', flat: true, note: 'Gb', hint: 'T', octave: octave },

    { key: 'g', note: 'G', hint: 'G', octave: octave },

    { key: 'y', flat: true, note: 'Ab', hint: 'Y', octave: octave },

    { key: 'h', note: 'A', hint: 'H', octave: octave },

    { key: 'u', flat: true, note: 'Bb', hint: 'U', octave: octave },

    { key: 'j', note: 'B', hint: 'J', octave: octave },

    { key: 'k', note: 'C', hint: 'K', octave: octave + 1 },

    { key: 'o', flat: true, note: 'Db', hint: 'O', octave: octave + 1 },

    { key: 'l', note: 'D', hint: 'L', octave: octave + 1 },

    { key: 'p', flat: true, note: 'Eb', hint: 'P', octave: octave + 1 },

    { key: ';', note: 'E', hint: ';', octave: octave + 1 },
  ]
  const pressedKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!e.repeat) {
      const tmpSet: Set<string> = new Set([...playing])
      tmpSet.add(e.key)
      setPlaying(tmpSet)
      const noteObj = keys.find((k) => k.key === e.key)
      if (noteObj) {
        keyPressed(noteObj)
      }
    }
  }
  const releasedKey = (e: React.KeyboardEvent<HTMLElement>) => {
    const tmpSet: Set<string> = new Set([...playing])
    if (tmpSet.has(e.key)) {
      tmpSet.delete(e.key)
      setPlaying(tmpSet)
    }
    const noteObj = keys.find((k) => k.key === e.key)
    if (noteObj) {
      keyReleased(noteObj)
    }
  }

  const onKeyClicked = (key: KeyboardKey) => {
    // console.log('clicked', key)
    keyClicked(key)
  }
  return (
    <div
      className="keys"
      ref={kbref}
      tabIndex={0}
      role="button"
    >
      {keys.map((kbkey, index) => {
        return (
          <Key
            keyboardKey={kbkey}
            key={`key_${index}`}
            keyId={`key_${index}`}
            playing={playing.has(kbkey.key)}
            onKeyClick={onKeyClicked}
            onKeyPressed={(e) => {
              pressedKey(e)
            }}
            onKeyReleased={(e) => {
              releasedKey(e)
            }}
          />
        )
      })}
    </div>
  )
}
