import { useState } from "react";

type PriceCardProps = {
  label: string;
  amount: number;
  currency: string;
  step?: number;
  onChange: (next: number) => void;
};

// PriceCard e "controlat": nu are useState propriu. Nu CITEȘTE starea, o
// PRIMEȘTE prin props, și nu o SCRIE, doar CERE schimbarea prin onChange.
// E ca o funcție Python fără variabile globale: primește totul ca parametru,
// întoarce totul prin return (aici: prin apelul lui onChange) — ușor de
// testat izolat, pentru că nu depinde de nimic din afara props-urilor.
function PriceCard({ label, amount, currency, step = 1, onChange }: PriceCardProps) {
  return (
    <div className="flex min-w-[200px] flex-col items-center gap-2.5 rounded-xl border border-border px-5 py-5">
      <p className="max-w-[480px] text-[15px] text-muted-foreground">{label}</p>
      <p className="m-0 text-[28px] font-bold text-foreground [font-variant-numeric:tabular-nums]">
        {amount} {currency}
      </p>
      <div className="mb-1 flex gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-lg border-2 border-border bg-background px-6 py-2.5 text-[15px] font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          onClick={() => onChange(amount - step)}
        >
          -{step}
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border-2 border-border bg-background px-6 py-2.5 text-[15px] font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          onClick={() => onChange(amount + step)}
        >
          +{step}
        </button>
      </div>
    </div>
  );
}

export function LiftingState() {
  // Singura sursă de adevăr trăiește AICI, în părinte — nu în cele două
  // carduri. E exact problema din backend a "aceleiași date ținute în două
  // locuri": dacă fiecare card și-ar ține propriul useState, ar trebui
  // sincronizate manual la fiecare schimbare și ar putea desincroniza. Cu o
  // singură sursă, cele două carduri sunt doar DOUĂ FORME de afișare ale
  // aceleiași valori — imposibil să se contrazică.
  const [amount, setAmount] = useState(10);
  const rate = 5; // curs fictiv: 1 RON = 5 puncte

  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-6 py-12 text-center">
      <h1>Pas 7 — Props & lifting state</h1>
      <p className="max-w-[480px] text-[15px] text-muted-foreground">
        O singură stare în părinte, două carduri sincronizate. Fiecare card e „controlat": primește valoarea și cere
        schimbarea prin onChange. Rate: 1 RON = 5 pts.
      </p>

      {/* Afișează direct valoarea din părinte — dovadă vizuală că e o
          singură sursă, nu o valoare separată calculată pe fiecare card. */}
      <p className="rounded-full border border-border px-5 py-2 text-lg font-semibold text-foreground [font-variant-numeric:tabular-nums]">
        <span aria-hidden="true">↙</span> {amount} <span aria-hidden="true">↘</span>
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Cardul RON citește și scrie direct starea din părinte. */}
        <PriceCard label="RON" amount={amount} currency="RON" onChange={setAmount} />

        {/* Cardul de puncte citește ACEEAȘI stare, doar convertită la afișare
            (amount * rate), și la schimbare face conversia inversă înainte
            de a scrie înapoi în sursa unică — punctele nu au propria copie. */}
        <PriceCard
          label="Puncte (×5)"
          amount={amount * rate}
          currency="pts"
          step={rate}
          onChange={next => setAmount(Math.round(next / rate))}
        />
      </div>
    </div>
  );
}
