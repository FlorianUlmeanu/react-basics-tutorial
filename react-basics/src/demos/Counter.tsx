import { useState } from "react";

// Counter e o FUNCȚIE, nu un obiect cu stare persistentă.
// React o re-EXECUTĂ de fiecare dată când setCount schimbă starea,
// iar `count` returnat de useState e mereu valoarea curentă din acea randare.
export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-6 py-12 text-center">
      <h1>Pas 2 — useState</h1>
      <p className="max-w-[480px] text-[15px] text-muted-foreground">
        Apasă butonul — starea se schimbă și componenta se re-randează.
      </p>

      <p className="my-2 text-7xl font-bold text-foreground [font-variant-numeric:tabular-nums]">{count}</p>

      <div className="mb-1 flex gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-lg border-2 border-transparent bg-primary px-6 py-2.5 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          onClick={() => setCount(c => c + 1)}
        >
          +1
        </button>

        <button
          type="button"
          className="cursor-pointer rounded-lg border-2 border-transparent bg-muted px-6 py-2.5 text-[15px] font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          onClick={() => setCount(c => c - 1)}
        >
          -1
        </button>

        {/* Forma funcțională e sigură și aici, deși nu depinde de count:
            React garantează că folosește starea reală din coadă, nu o
            "poză" veche capturată de closure la randarea anterioară. */}
        <button
          type="button"
          className="cursor-pointer rounded-lg border-2 border-border bg-background px-6 py-2.5 text-[15px] font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          onClick={() => setCount(() => 0)}
        >
          Reset
        </button>
      </div>

      <details className="group w-full overflow-hidden rounded-[10px] border border-border text-left">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          <span className="inline-block text-muted-foreground transition-transform group-open:rotate-90">▸</span>
          💻 Cod de reținut
        </summary>
        <pre className="overflow-x-auto border-t border-border bg-muted p-4 font-mono text-[13px] leading-[150%]">
          {`const [count, setCount] = useState(0);

<Button onClick={() => setCount(c => c + 1)}>{count} +1</Button>`}
        </pre>
      </details>
    </div>
  );
}
