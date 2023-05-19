import React, { useRef, useState, useCallback } from 'react'
import * as Tone from 'tone'
import './styles.css'
import Keyboard from '../Keyboard/index'
import { KeyboardKey } from '../Keyboard/types'
import Knob from '../Knob'

export default function Synth() {
  const [synthType, setSynthType] = useState('FM Synth')
  const [_octave, _setOctave] = useState(4)
  const [octave, setOctave] = useState(4)
  // const [started, setStarted] = useState(false)
  const kbRef = useRef()
  const [reverbValue, setReverbValue] = useState(0.001)

  const synths = {
    'FM Synth': {
      synth: Tone.FMSynth,
      type: 'long',
      poly: true,
      usesNote: true,
    },
    'AM Synth': {
      synth: Tone.AMSynth,
      type: 'long',
      poly: true,
      usesNote: true,
    },
    'Mono Synth': {
      synth: Tone.MonoSynth,
      type: 'long',
      poly: true,
      usesNote: true,
    },
    'Duo Synth': {
      synth: Tone.DuoSynth,
      type: 'long',
      poly: true,
      usesNote: true,
    },
    'Metal Synth': {
      synth: Tone.MetalSynth,
      type: 'short',
      poly: true,
      usesNote: true,
    },
    'Membrane Synth': {
      synth: Tone.MembraneSynth,
      type: 'short',
      poly: true,
      usesNote: true,
    },
    'Noise Synth': {
      synth: Tone.NoiseSynth,
      type: 'short',
      poly: false,
      usesNote: false,
    },
    'Pluck Synth': {
      synth: Tone.PluckSynth,
      type: 'short',
      poly: true,
      usesNote: true,
    },
  }

  const effectsChain = useCallback(() => {
    console.log('reverbValue', reverbValue)
    return new Tone.Reverb(reverbValue + 0.001).connect(Tone.getDestination())
  }, [reverbValue])

  console.log('effectsChain', effectsChain())
  let currentSynth = synths[synthType].poly
    ? new Tone.PolySynth(synths[synthType].synth)
    : new synths[synthType].synth()

  currentSynth.connect(effectsChain())
  currentSynth.connect(Tone.getDestination())

  const onSynthChange = (e) => {
    currentSynth.disconnect()
    currentSynth.dispose()
    setSynthType(e)

    console.log('Synth Change', e)

    if (synths[e].poly) {
      currentSynth = new Tone.PolySynth(synths[e].synth)
    } else {
      currentSynth = new synths[e]()
    }
    console.log('Synth Change', e, currentSynth)
    currentSynth.connect(effectsChain())

    if (kbRef && kbRef.current) {
      const kb: HTMLDivElement = kbRef.current as HTMLDivElement
      kb.focus()
    }
  }
  const onOctaveChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const o: number = parseInt(e.target.value, 10)
      setOctave(o)
      if (o > 0 && o < 8) {
        _setOctave(o)
      }
    } catch (_e) {
      return false
    }
  }
  const now = Tone.now()

  const playNote = (note: string, octave: number) => {
    if (synths[synthType].type === 'short') {
      if (!synths[synthType].usesNote) {
        currentSynth.triggerAttackRelease('8n', 0.05)
        return
      }
      nudgeNote(note, octave)
      return
    }
    currentSynth.triggerAttack(note + octave.toString(), now)
  }
  const stopNote = (note: string, octave: number) => {
    if (synths[synthType].type === 'short') {
      return
    }
    if (synths[synthType].poly) {
      ;(currentSynth as Tone.PolySynth).triggerRelease(
        note + octave.toString(),
        now
      )
      return
    }
    currentSynth.triggerRelease(now)
  }

  const nudgeNote = (note: string, octave: number) => {
    currentSynth.triggerAttackRelease(note + octave.toString(), 1)
  }
  const setReverb = (e) => {
    console.debug('setReverb', e)
    setReverbValue(e)
  }

  return (
    <div
      className="synth"
      tabIndex={-1}
    >
      <div className="controls">
        <div className="controls__control">
          <label htmlFor="synth-type">Type</label>
          <select
            id="synth-type"
            value={synthType}
            onChange={(evt) => onSynthChange(evt.target.value)}
            className="lcd"
          >
            {Object.keys(synths).map((s, index) => (
              <option key={`s_${index}`}>{s}</option>
            ))}
          </select>
        </div>
        <div className="controls__control">
          <label htmlFor="octave-input">Octave (1-7)</label>
          <input
            className="lcd"
            id="octave-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={7}
            value={octave}
            step={1}
            pattern="[1-7]{1,1}"
            onChange={(e) => onOctaveChanged(e)}
            required
          />
        </div>
        <div className="controls__control">
          <label htmlFor="reverb">Reverb</label>
          <Knob
            id="reverb"
            minValue={0}
            maxValue={5}
            step={0.1}
            value={0}
            precision={1}
            onChange={(e) => {
              setReverb(e.value)
            }}
          />
        </div>
      </div>
      <Keyboard
        octave={_octave}
        kbref={kbRef}
        keyPressed={(e: KeyboardKey) => playNote(e.note, e.octave)}
        keyReleased={(e: KeyboardKey) => {
          stopNote(e.note, e.octave)
        }}
        keyClicked={(e: KeyboardKey) => {
          nudgeNote(e.note, e.octave)
        }}
      />
    </div>
  )
}
