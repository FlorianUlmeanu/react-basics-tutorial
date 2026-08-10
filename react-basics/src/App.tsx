import { useState } from "react";
import { steps } from "./steps";
import "./App.css";

// Ultimul pas care are o demo scrisă = pasul curent al lecției.
const lastAvailableStep = [...steps].reverse().find(s => s.component)!.id;

function App() {
  const [activeId, setActiveId] = useState(lastAvailableStep);
  const active = steps.find(s => s.id === activeId)!;

  return (
    <>
      <header id="course-header">
        <h1>React Basics</h1>
        <p className="muted">Playground care crește pas cu pas — fiecare buton e un concept.</p>
      </header>

      <nav id="step-nav">
        {steps.map(step => (
          <button
            key={step.id}
            type="button"
            className={`step-pill${step.id === activeId ? " active" : ""}`}
            disabled={!step.component}
            onClick={() => setActiveId(step.id)}
          >
            {step.label}
            <span className="step-badge">{step.id}</span>
          </button>
        ))}
      </nav>

      <section id="center">
        {active.component ? active.component() : <p className="muted">Pasul „{active.label}" nu are încă o demo scrisă.</p>}
      </section>
    </>
  );
}

export default App;
