import { useState } from "react";

// Counter e o FUNCȚIE, nu un obiect cu stare persistentă.
// React o re-EXECUTĂ de fiecare dată când setCount schimbă starea,
// iar `count` returnat de useState e mereu valoarea curentă din acea randare.
export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="timer-demo">
      <h1>Pas 2 — useState</h1>
      <p className="muted">Apasă butonul — starea se schimbă și componenta se re-randează.</p>

      <p className="timer-display">{count}</p>

      <div className="timer-buttons">
        <button type="button" className="btn-primary" onClick={() => setCount(c => c + 1)}>
          +1
        </button>

        <button type="button" className="btn-muted" onClick={() => setCount(c => c - 1)}>
          -1
        </button>

        {/* Forma funcțională e sigură și aici, deși nu depinde de count:
            React garantează că folosește starea reală din coadă, nu o
            "poză" veche capturată de closure la randarea anterioară. */}
        <button type="button" className="btn-secondary" onClick={() => setCount(() => 0)}>
          Reset
        </button>
      </div>

      <details className="code-box">
        <summary>💻 Cod de reținut</summary>
        <pre>
          {`const [count, setCount] = useState(0);

<Button onClick={() => setCount(c => c + 1)}>{count} +1</Button>`}
        </pre>
      </details>
    </div>
  );
}
