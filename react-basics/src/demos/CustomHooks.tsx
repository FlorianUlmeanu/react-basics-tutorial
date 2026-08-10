import { Button } from "@/components/ui/button";
import { useCounter } from "@/hooks/useCounter";
import { useWindowSize } from "@/hooks/useWindowSize";

// Constante la nivel de modul, nu "hardcodate" prin JSX — ca niște
// settings importate dintr-un config.py, citite oriunde e nevoie de ele.
const PRET_COPIL = 2;
const PRET_ADULT = 5;

type GrupBoxProps = {
  titlu: string;
  pretUnitar: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
};

// GrupBox nu are useState propriu — e "controlat", primește totul prin
// props (la fel ca PriceCard din Pas 7). Nu ȘTIE că numărul lui vine dintr-un
// useCounter; primește doar count + trei funcții de apelat la click.
function GrupBox({ titlu, pretUnitar, count, onIncrement, onDecrement, onReset }: GrupBoxProps) {
  const subtotal = count * pretUnitar;

  return (
    <div className="border-border flex min-w-[200px] flex-col items-center gap-2 rounded-xl border px-5 py-5">
      <h3 className="text-foreground m-0 text-[15px] font-semibold">{titlu}</h3>
      <p className="text-muted-foreground m-0 text-[13px]">{pretUnitar} lei / persoană</p>
      <p className="text-foreground my-1 text-4xl font-bold [font-variant-numeric:tabular-nums]">{count}</p>
      <p className="text-muted-foreground m-0 text-[13px] [font-variant-numeric:tabular-nums]">{subtotal} lei</p>
      <div className="mt-1 flex gap-2">
        <Button variant="outline" size="sm" disabled={count === 0} onClick={onDecrement}>
          −1
        </Button>
        <Button size="sm" onClick={onIncrement}>
          +1
        </Button>
      </div>
      <Button variant="ghost" size="sm" disabled={count === 0} onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}

export function CustomHooks() {
  // Fiecare APEL de useCounter își creează PROPRIA stare — copii și adulti
  // sunt două closure-uri complet separate peste useState, la fel cum două
  // instanțe ale aceleiași clase Python au fiecare propriul self.count.
  // Apăsând +1 la copii NU atinge deloc adulti.
  const copii = useCounter(0, 1);
  const adulti = useCounter(0, 1);
  const { width, height } = useWindowSize();

  // Date DERIVATE, calculate la fiecare randare din cele două countere —
  // nu un al treilea useState. Dacă am ține totalul separat, ar trebui
  // sincronizat manual la fiecare +1/-1/Reset și ar putea ieși din sinc.
  const totalPersoane = copii.count + adulti.count;
  const totalPlata = copii.count * PRET_COPIL + adulti.count * PRET_ADULT;

  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-6 py-12 text-center">
      <h1>Pas 12 — Custom hooks</h1>
      <p className="text-muted-foreground max-w-[480px] text-[15px]">
        Logica reutilizabilă trăiește în <code>useCounter</code> / <code>useWindowSize</code>. Componenta doar le
        folosește: numără grupul și calculează cât plătește.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <GrupBox
          titlu="Copii"
          pretUnitar={PRET_COPIL}
          count={copii.count}
          onIncrement={copii.increment}
          onDecrement={copii.decrement}
          onReset={copii.reset}
        />
        <GrupBox
          titlu="Adulți"
          pretUnitar={PRET_ADULT}
          count={adulti.count}
          onIncrement={adulti.increment}
          onDecrement={adulti.decrement}
          onReset={adulti.reset}
        />
      </div>

      <div className="border-border rounded-xl border px-6 py-4">
        <p className="text-muted-foreground m-0 text-[13px]">Total grup</p>
        <p className="text-foreground m-0 text-xl font-bold [font-variant-numeric:tabular-nums]">
          {totalPersoane} persoane — {totalPlata} lei
        </p>
      </div>

      <p className="text-muted-foreground max-w-[480px] text-[13px]">
        Fereastra: {width} × {height}px (redimensionează — se actualizează singur)
      </p>

      <details className="group border-border w-full overflow-hidden rounded-[10px] border text-left">
        <summary className="text-foreground flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span className="text-muted-foreground inline-block transition-transform group-open:rotate-90">▸</span>
          💻 Cod de reținut
        </summary>
        <pre className="border-border bg-muted overflow-x-auto border-t p-4 font-mono text-[13px] leading-[150%]">
          {`function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => setCount(c => c + step), [step]);
  return { count, increment };
}

// două apeluri = două stări independente
const copii = useCounter(0, 1);
const adulti = useCounter(0, 1);

// preț = date DERIVATE, nu state
const total = copii.count * 2 + adulti.count * 5;`}
        </pre>
      </details>
    </div>
  );
}
