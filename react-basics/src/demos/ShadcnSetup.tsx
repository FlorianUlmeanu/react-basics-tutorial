import { useState } from "react";
import { Copy, Download, Loader2, Plus, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Variantele tipate cu "as const": TypeScript le tratează ca un tuple de
// literali, nu ca string[] generic — variants[i] e verificat de compiler
// împotriva props-ului "variant" al <Button>, la fel cum un Literal type în
// Pydantic ar respinge o valoare care nu e în listă.
const variants = ["default", "secondary", "outline", "ghost", "link"] as const;

export function ShadcnSetup() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-6 py-12 text-center">
      <h1>Pas 11 — shadcn/ui</h1>
      <p className="text-muted-foreground max-w-[520px] text-[15px]">
        La stânga, butonul „făcut de mână": arată bine, dar fiecare stare nouă (hover, focus, disabled, variante) o
        scrii tu. La dreapta, același buton din shadcn/ui — cod copiat în proiect, nu librărie.
      </p>

      <div className="grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="border-border flex flex-col gap-3 rounded-xl border p-5 text-left">
          <h3 className="text-foreground mt-0 mb-0 text-[15px] font-semibold">Manual</h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="bg-primary text-primary-foreground cursor-pointer rounded-lg border-none px-4 py-2 text-sm font-semibold"
            >
              Acțiune
            </button>
            {/* "disabled" doar PARE dezactivat: opacitate mai mică, dar cursorul
                rămâne pointer, click-ul tot funcționează, iar la Tab nu apare
                niciun focus ring — un cititor de tastatură nu-și dă seama unde e. */}
            <button
              type="button"
              className="bg-primary text-primary-foreground cursor-pointer rounded-lg border-none px-4 py-2 text-sm font-semibold opacity-50"
            >
              Dezactivat (doar pare)
            </button>
          </div>
          <p className="text-muted-foreground text-[13px]">
            Fără focus vizibil la Tab, fără <code>cursor-not-allowed</code>, fără variante — toate le adaugi manual.
          </p>
        </div>

        <div className="border-border flex flex-col gap-3 rounded-xl border p-5 text-left">
          <h3 className="text-foreground mt-0 mb-0 text-[15px] font-semibold">shadcn/ui</h3>
          <div className="flex flex-wrap gap-2">
            <Button>Acțiune</Button>
            <Button disabled>Dezactivat</Button>
          </div>
          <p className="text-muted-foreground text-[13px]">
            Focus ring, stări și variante incluse. Apasă <code>Tab</code> ca să vezi diferența la focus.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {variants.map(variant => (
          <Button key={variant} variant={variant} size="sm">
            {variant}
          </Button>
        ))}
      </div>

      <div className="border-border flex w-full flex-col gap-3 rounded-xl border p-5 text-left">
        <h3 className="text-foreground mt-0 mb-0 text-[15px] font-semibold">Butoane cu iconițe (lucide)</h3>
        <p className="text-muted-foreground text-[13px]">
          Iconiță + text — o pui pur și simplu înaintea textului, ca pe orice component React:
        </p>
        <div className="flex flex-wrap gap-2">
          <Button>
            <Plus /> Adaugă
          </Button>
          <Button variant="secondary">
            <Download /> Descarcă
          </Button>
          <Button variant="outline">
            <Send /> Trimite
          </Button>
          <Button variant="destructive">
            <Trash2 /> Șterge
          </Button>
        </div>

        <p className="text-muted-foreground text-[13px]">
          Doar iconiță — <code>size="icon"</code> face butonul pătrat. Aici textul lipsește, deci{" "}
          <code>aria-label</code> devine obligatoriu: e singurul lucru pe care îl aude un cititor de ecran.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="icon" aria-label="Copiază">
            <Copy />
          </Button>
          <Button size="icon" variant="secondary" aria-label="Descarcă">
            <Download />
          </Button>
          <Button size="icon" aria-label="Adaugă">
            <Plus />
          </Button>
          <Button size="icon" variant="destructive" aria-label="Șterge">
            <Trash2 />
          </Button>
        </div>

        <p className="text-muted-foreground text-[13px]">
          Stare de încărcare — aceeași iconiță, plus clasa Tailwind <code>animate-spin</code>. Butonul rămâne{" "}
          <code>disabled</code> cât durează.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }}
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Se trimite..." : "Trimite"}
          </Button>
          <Button size="icon" variant="secondary" disabled aria-label="Se încarcă">
            <Loader2 className="animate-spin" />
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground max-w-[520px] text-[15px]">
        Prerechizite bifate deja: alias <code>@/</code> și Tailwind. Configul ales stă în <code>components.json</code>{" "}
        (stil <code>new-york</code>, iconițe <code>lucide</code>).
      </p>

      <details className="group border-border w-full overflow-hidden rounded-[10px] border text-left">
        <summary className="text-foreground flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span className="text-muted-foreground inline-block transition-transform group-open:rotate-90">▸</span>
          💻 Cod de reținut — instalare & folosire
        </summary>
        <pre className="border-border bg-muted overflow-x-auto border-t p-4 font-mono text-[13px] leading-[150%]">
          {`npx shadcn@latest init      # scrie components.json + src/lib/utils.ts
npx shadcn@latest add button # COPIAZĂ src/components/ui/button.tsx în proiect

import { Button } from "@/components/ui/button";
<Button variant="secondary" size="sm">Acțiune</Button>

// iconițele sunt componente React (lucide-react), le dai ca children
import { Loader2, Trash2 } from "lucide-react";

<Button variant="destructive"><Trash2 />Șterge</Button>
<Button size="icon" aria-label="Șterge"><Trash2 /></Button>   // fără text ⇒ aria-label
<Button disabled><Loader2 className="animate-spin" />Se trimite...</Button>`}
        </pre>
      </details>

      <p className="text-muted-foreground max-w-[520px] text-[13px]">
        shadcn/ui NU e o dependență npm — comanda <code>add</code> COPIAZĂ codul sursă în proiect (
        <code>src/components/ui/</code>). E codul tău: îl citești, îl modifici, nu aștepți un release ca să schimbi un
        stil — exact modelul potrivit când lucrezi cu agenți AI, care pot edita direct fișierul. Variantele sunt tipate
        cu <code>cva</code> (class-variance-authority), accesibilitatea (focus ring, <code>disabled</code>) e inclusă
        din start, iar <code>cn()</code> rezolvă conflictele de clase Tailwind când suprascrii ceva din afară (ex.{" "}
        <code>className="relative overflow-visible"</code> în <code>DemoTab</code>).
      </p>
    </div>
  );
}
