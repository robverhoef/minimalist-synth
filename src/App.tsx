import React from "react"
import Synth from "./components/Synth/Synth"
import ErrorBoundary from "./components/ErrorBoundary"
import "./App.css"

export function App() {
  return (
    <main>
      <ErrorBoundary>
        <Synth />
      </ErrorBoundary>
    </main>
  )
}
