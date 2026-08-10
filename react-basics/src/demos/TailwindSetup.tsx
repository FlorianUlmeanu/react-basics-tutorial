import { useState, type CSSProperties } from "react";

// Culori HARDCODATE, ca acum câteva luni de zile de dezvoltare "de mână":
// #fafafa/#171717 sunt inventate pe loc, nu vin dintr-un set fix. Merg în
// light mode, dar habar n-au de tema întunecată — nu există niciun mecanism
// prin care să se schimbe când <html> primește clasa .dark.
const handWrittenLight: CSSProperties = {
  background: "#fafafa",
  color: "#171717",
  border: "1px solid #e5e5e5",
  borderRadius: 12,
  padding: "18px 20px"
};

const handWrittenButton: CSSProperties = {
  background: "#0d66ff",
  color: "#ffffff",
  border: "none",
  borderRadius: 8,
  padding: "10px 20px",
  fontWeight: 600,
  cursor: "pointer"
};

export function TailwindSetup() {
  const [showTailwind, setShowTailwind] = useState(true);

  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-6 py-12 text-center">
      <h1>Pas 10 — Tailwind CSS</h1>
      <p className="text-muted-foreground max-w-[480px] text-[15px]">
        Același card, două abordări. Comută și uită-te la <strong>dark mode</strong> (butonul din header): varianta cu
        CSS scris de mână rămâne albă, pentru că are culorile hardcodate.
      </p>

      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setShowTailwind(false)}
          className={[
            "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85",
            !showTailwind
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground"
          ].join(" ")}
        >
          CSS scris de mână
        </button>
        <button
          type="button"
          onClick={() => setShowTailwind(true)}
          className={[
            "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85",
            showTailwind
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground"
          ].join(" ")}
        >
          Tailwind
        </button>
      </div>

      {showTailwind ? (
        // Varianta Tailwind: NICIUN hex hardcodat — bg-card / text-foreground
        // / border-border citesc din tokenii definiți în src/index.css
        // (@theme inline), care se schimbă odată cu clasa .dark de pe
        // <html>. Aceleași clase, altă valoare în spate, în funcție de temă.
        <div className="border-border bg-card w-full max-w-[420px] rounded-xl border p-5 text-left">
          <h3 className="text-foreground mt-0 mb-1.5 text-[15px] font-semibold">Card cu Tailwind</h3>
          <p className="text-muted-foreground text-[15px]">
            Tokeni de temă: <code>bg-card</code>, <code>text-muted-foreground</code>, <code>border-border</code>. La
            dark mode se adaptează singur — nicio schimbare de cod.
          </p>
          <button
            type="button"
            className="bg-primary text-primary-foreground mt-3 cursor-pointer rounded-lg border-none px-5 py-2.5 font-semibold"
          >
            Acțiune
          </button>
        </div>
      ) : (
        // Varianta "de mână": CSSProperties cu valori hex inventate pe loc.
        // Compilează, arată bine în light — și atât. Aici e poanta: comută
        // dark mode din header și acest card RĂMÂNE deschis la culoare.
        <div style={handWrittenLight} className="w-full max-w-[420px] text-left">
          <h3 className="mt-0 mb-1.5 text-[15px] font-semibold">Card cu CSS scris de mână</h3>
          <p className="text-[15px]">
            Culori hardcodate: la dark mode rămâne alb. Fiecare valoare e „inventată" pe loc.
          </p>
          <button type="button" style={handWrittenButton} className="mt-3">
            Acțiune
          </button>
        </div>
      )}

      <p className="text-muted-foreground max-w-[480px] text-[15px]">
        Obiecția clasică: „clasele lungi urâțesc markup-ul". Contra-argumentul practic: stilul stă lângă element (nu
        cauți prin fișiere), iar Prettier le sortează canonic, deci nu ajung dezordonate.
      </p>

      <details className="group border-border w-full overflow-hidden rounded-[10px] border text-left">
        <summary className="text-foreground flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span className="text-muted-foreground inline-block transition-transform group-open:rotate-90">▸</span>
          💻 Cod de reținut — setup Tailwind v4
        </summary>
        <pre className="border-border bg-muted overflow-x-auto border-t p-4 font-mono text-[13px] leading-[150%]">
          {`npm i tailwindcss @tailwindcss/vite

// vite.config.ts
plugins: [react(), tailwindcss()]

/* src/index.css */
@import "tailwindcss";`}
        </pre>
      </details>
    </div>
  );
}
