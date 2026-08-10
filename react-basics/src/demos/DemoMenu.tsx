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
    <div className="flex w-full max-w-[460px] flex-col gap-2.5">
      <div className="flex justify-center gap-2">
        {miniDemos.map(demo => (
          <button
            key={demo.id}
            type="button"
            onClick={() => setActiveId(demo.id)}
            className={[
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85",
              demo.id === activeId
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground"
            ].join(" ")}
          >
            {demo.label}
          </button>
        ))}
      </div>
      <div className="border-border text-foreground rounded-[10px] border px-[18px] py-3.5 text-left">
        {active.content}
      </div>
    </div>
  );
}

export function DemoMenu() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-6 py-12 text-center">
      <h1>Pas 8 — Meniu de demo-uri</h1>
      <p className="text-muted-foreground max-w-[480px] text-[15px]">
        Tiparul: un <strong>array de demo-uri</strong> (datele) + un <strong>id activ</strong> (starea). UI-ul se derivă
        din ele — nu ținem în state și lista, și elementul selectat.
      </p>

      <MiniMenu />

      <div className="grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="border-border rounded-xl border px-5 py-[18px] text-left">
          <h3 className="text-foreground mt-0 mb-1.5 text-[15px]">Ce e local (state)</h3>
          <p className="text-muted-foreground max-w-[480px] text-[15px]">
            În demo-ul ăsta, <code>activeId</code> trăiește într-un <code>useState</code> → la refresh se pierde.
          </p>
        </div>
        <div className="border-border rounded-xl border px-5 py-[18px] text-left">
          <h3 className="text-foreground mt-0 mb-1.5 text-[15px]">Ce e global (context)</h3>
          <p className="text-muted-foreground max-w-[480px] text-[15px]">
            În aplicația reală, pasul activ și tema stau în context și se salvează în <code>localStorage</code> (
            <code>react-basics:active-step</code>, <code>react-basics:theme</code>) → la refresh rămân. Cum se
            construiește un context: <strong>Pas 13</strong>.
          </p>
        </div>
      </div>

      <p className="text-muted-foreground max-w-[480px] text-[15px]">
        Butoanele de sus au numărul pasului într-un „badge" — un <code>{"<span>"}</code> poziționat absolut peste buton.
        Detaliu de UI, dar util: numele conceptului rămâne lizibil, numărul stă în colț.
      </p>

      <details className="group border-border w-full overflow-hidden rounded-[10px] border text-left">
        <summary className="text-foreground flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span className="text-muted-foreground inline-block transition-transform group-open:rotate-90">▸</span>
          💻 Cod de reținut — registru + id activ
        </summary>
        <pre className="border-border bg-muted overflow-x-auto border-t p-4 font-mono text-[13px] leading-[150%]">
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
