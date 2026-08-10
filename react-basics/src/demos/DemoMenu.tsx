import { useState } from "react";

type MiniDemo = {
  id: string;
  label: string;
  content: string;
};

// Exact tiparul din App.tsx / steps.tsx, în miniatură: un REGISTRU (array)
// de intrări + un id ACTIV în state. Restul UI-ului (butoanele, conținutul
// afișat) se DERIVĂ din aceste două lucruri — nu ținem separat "care buton
// e apăsat" și "ce conținut se vede", ca să nu poată desincroniza.
const miniDemos: MiniDemo[] = [
  { id: "alfa", label: "Alfa", content: `Conținutul demo-ului „Alfa".` },
  { id: "beta", label: "Beta", content: `Conținutul demo-ului „Beta".` },
  { id: "gama", label: "Gama", content: `Conținutul demo-ului „Gama".` }
];

function MiniMenu() {
  const [activeId, setActiveId] = useState(miniDemos[0].id);
  const active = miniDemos.find(d => d.id === activeId) ?? miniDemos[0];

  return (
    <div className="mini-menu">
      <div className="mini-menu-tabs">
        {miniDemos.map(demo => (
          <button
            key={demo.id}
            type="button"
            className={["mini-menu-tab", demo.id === activeId && "active"].filter(Boolean).join(" ")}
            onClick={() => setActiveId(demo.id)}
          >
            {demo.label}
          </button>
        ))}
      </div>
      <div className="mini-menu-content">{active.content}</div>
    </div>
  );
}

export function DemoMenu() {
  return (
    <div className="demo-menu">
      <h1>Pas 8 — Meniu de demo-uri</h1>
      <p className="muted">
        Tiparul: un <strong>array de demo-uri</strong> (datele) + un <strong>id activ</strong> (starea). UI-ul se derivă
        din ele — nu ținem în state și lista, și elementul selectat.
      </p>

      <MiniMenu />

      <div className="demo-menu-explain">
        <div className="demo-menu-card">
          <h3>Ce e local (state)</h3>
          <p className="muted">
            În demo-ul ăsta, <code>activeId</code> trăiește într-un <code>useState</code> → la refresh se pierde.
          </p>
        </div>
        <div className="demo-menu-card">
          <h3>Ce e global (context)</h3>
          <p className="muted">
            În aplicația reală, pasul activ și tema stau în context și se salvează în <code>localStorage</code> (
            <code>react-basics:active-step</code>, <code>react-basics:theme</code>) → la refresh rămân. Cum se
            construiește un context: <strong>Pas 13</strong>.
          </p>
        </div>
      </div>

      <p className="muted">
        Butoanele de sus au numărul pasului într-un „badge" — un <code>{"<span>"}</code> poziționat absolut peste buton.
        Detaliu de UI, dar util: numele conceptului rămâne lizibil, numărul stă în colț.
      </p>

      <details className="code-box">
        <summary>💻 Cod de reținut — registru + id activ</summary>
        <pre>
          {`const demos = [{ id: "counter", step: 2, title: "useState", element: <Counter /> }, ...];

const [activeId, setActiveId] = useState(demos[0].id);
const active = demos.find(d => d.id === activeId) ?? demos[0];

{demos.map(demo => <DemoTab key={demo.id} demo={demo} active={demo.id === activeId} ... />)}
<main>{active.element}</main>`}
        </pre>
      </details>
    </div>
  );
}
