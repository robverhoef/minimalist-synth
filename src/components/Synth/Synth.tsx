import React, { useRef, useState } from "react"
import * as Tone from "tone"
import { RefreshCcw } from "react-feather"
import Keyboard from "./Keyboard"
import { KeyboardKey } from "./types"
import Button from "../Button"
import Knob from "../Knob"

export default function Synth() {
  const [synthType, setSynthType] = useState("FM Synth")
  const [octave, setOctave] = useState(4)
  const [started, setStarted] = useState(false)
  const kbRef = useRef()
  const synths = {
    "FM Synth": {
      synth: Tone.FMSynth,
      type: "long",
      poly: true,
      usesNote: true,
    },
    "AM Synth": {
      synth: Tone.AMSynth,
      type: "long",
      poly: true,
      usesNote: true,
    },
    "Mono Synth": {
      synth: Tone.MonoSynth,
      type: "long",
      poly: true,
      usesNote: true,
    },
    "Duo Synth": {
      synth: Tone.DuoSynth,
      type: "long",
      poly: true,
      usesNote: true,
    },
    "Metal Synth": {
      synth: Tone.MetalSynth,
      type: "short",
      poly: true,
      usesNote: true,
    },
    "Membrane Synth": {
      synth: Tone.MembraneSynth,
      type: "short",
      poly: true,
      usesNote: true,
    },
    "Noise Synth": {
      synth: Tone.NoiseSynth,
      type: "short",
      poly: false,
      usesNote: false,
    },
    "Pluck Synth": {
      synth: Tone.PluckSynth,
      type: "short",
      poly: true,
      usesNote: true,
    },
  }
  var currentSynth = synths[synthType].poly
    ? new Tone.PolySynth(synths[synthType].synth).toDestination()
    : new synths[synthType].synth().toDestination()

  const onSynthChange = (e) => {
    currentSynth.disconnect()
    setSynthType(e)
    if (synths[e].poly) {
      currentSynth = new Tone.PolySynth(synths[e].synth).toDestination()
    } else {
      currentSynth = new Tone[synths[e]].synth().toDestination()
    }
    if (kbRef && kbRef.current) {
      const kb: HTMLDivElement = kbRef.current as HTMLDivElement
      kb.focus()
    }
  }
  const onOctaveChanged = (o) => {
    setOctave(o)
  }
  const now = Tone.now()

  const playNote = (note: string, octave: number) => {
    if (synths[synthType].type === "short") {
      if (!synths[synthType].usesNote) {
        currentSynth.triggerAttackRelease("8n", 0.05)
        return
      }
      nudgeNote(note, octave)
      return
    }
    currentSynth.triggerAttack(note + octave.toString(), now)
  }
  const stopNote = (note: string, octave: number) => {
    if (synths[synthType].type === "short") {
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

  const resetSounds = () => {
    currentSynth.disconnect()
    currentSynth.toDestination()
  }
  return (
    <div
      className="synth"
      tabIndex={0}
    >
      <div className="controls">
        <div className="controls__control">
          <label htmlFor="synth-type">Type</label>
          <select
            id="synth-type"
            value={synthType}
            onChange={(evt) => onSynthChange(evt.target.value)}
          >
            {Object.keys(synths).map((s, index) => (
              <option key={`s_${index}`}>{s}</option>
            ))}
          </select>
        </div>
        <div className="controls__control">
          <label htmlFor="octave-slider">Octave</label>
          <input
            id="octave-slider"
            type="number"
            min={2}
            max={7}
            value={octave}
            step={1}
            onChange={(e) => onOctaveChanged(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="controls__control">
          <label>Reverb</label>
          <Knob />
        </div>
        <Button
          round
          onClick={(_e) => resetSounds()}
          title="Reset sounds"
        >
          <RefreshCcw size={18} />
        </Button>
      </div>
      <Keyboard
        octave={octave}
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
