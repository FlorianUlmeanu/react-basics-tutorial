import { useState } from "react";

// De ce ACUM: shadcn/ui (Pas 11) generează componente care importă cu "@/..."
// din start, deci aliasul trebuie să existe înainte. Dar e util oricum, chiar
// și fără shadcn: un fișier mutat într-un alt folder nu mai rupe importurile
// — calea "@/demos/Counter" e aceeași indiferent din ce adâncime o scrii,
// spre deosebire de "../../demos/Counter" care depinde de unde stă fișierul
// care importă.

// Aceleași importuri, în două variante — string-uri de afișat, nu importuri
// reale (fișierele din exemplu, ex. Bubble.tsx, sunt ipotetice, ca să arate
// cazul urât dintr-un folder adânc).
const relativeImports = `// src/demos/Counter.tsx
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

// src/components/chat/message/Bubble.tsx (mai adânc → mai urât)
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";`;

const aliasImports = `// src/demos/Counter.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// src/components/chat/message/Bubble.tsx (aceeași adâncime, aceeași cale)
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";`;

export function PathAlias() {
  const [useAlias, setUseAlias] = useState(true);

  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-6 py-12 text-center">
      <h1>Pas 9 — Path alias @/</h1>
      <p className="text-muted-foreground max-w-[480px] text-[15px]">
        Îl punem acum pentru că <strong>shadcn/ui îl cere</strong> (Pas 11) — dar e util oricum: mutarea unui fișier nu
        mai rupe importurile.
      </p>

      <div className="flex w-full max-w-[460px] flex-col gap-2.5">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setUseAlias(false)}
            className={[
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85",
              !useAlias
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground"
            ].join(" ")}
          >
            Fără alias (relativ)
          </button>
          <button
            type="button"
            onClick={() => setUseAlias(true)}
            className={[
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85",
              useAlias
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground"
            ].join(" ")}
          >
            Cu alias @/
          </button>
        </div>
        <pre className="border-border text-foreground overflow-x-auto rounded-[10px] border px-[18px] py-3.5 text-left font-mono text-[13px] leading-[150%]">
          {useAlias ? aliasImports : relativeImports}
        </pre>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="border-border rounded-xl border px-5 py-[18px] text-left">
          <h3 className="text-foreground mt-0 mb-1.5 text-[15px]">tsconfig.app.json</h3>
          <p className="text-muted-foreground max-w-[480px] text-[15px]">
            Pentru TypeScript și IDE: type-check, „go to definition", autocomplete. Fără el, editorul subliniază roșu.
          </p>
        </div>
        <div className="border-border rounded-xl border px-5 py-[18px] text-left">
          <h3 className="text-foreground mt-0 mb-1.5 text-[15px]">vite.config.ts</h3>
          <p className="text-muted-foreground max-w-[480px] text-[15px]">
            Pentru bundler: rezolvarea reală a fișierului la dev și la build. Fără el, aplicația nu pornește.
          </p>
        </div>
      </div>

      <details className="group border-border w-full overflow-hidden rounded-[10px] border text-left">
        <summary className="text-foreground flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span className="text-muted-foreground inline-block transition-transform group-open:rotate-90">▸</span>
          💻 Cod de reținut — aliasul, în ambele configuri
        </summary>
        <pre className="border-border bg-muted overflow-x-auto border-t p-4 font-mono text-[13px] leading-[150%]">
          {`// tsconfig.app.json
"paths": { "@/*": ["./src/*"] }

// vite.config.ts
resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } }

// oriunde în src/ — aceeași cale, indiferent de adâncime
import { Button } from "@/components/ui/button";`}
        </pre>
      </details>
    </div>
  );
}
