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
    <div className="demo-menu">
      <h1>Pas 9 — Path alias @/</h1>
      <p className="muted">
        Îl punem acum pentru că <strong>shadcn/ui îl cere</strong> (Pas 11) — dar e util oricum: mutarea unui fișier nu
        mai rupe importurile.
      </p>

      <div className="mini-menu">
        <div className="mini-menu-tabs">
          <button
            type="button"
            className={["mini-menu-tab", !useAlias && "active"].filter(Boolean).join(" ")}
            onClick={() => setUseAlias(false)}
          >
            Fără alias (relativ)
          </button>
          <button
            type="button"
            className={["mini-menu-tab", useAlias && "active"].filter(Boolean).join(" ")}
            onClick={() => setUseAlias(true)}
          >
            Cu alias @/
          </button>
        </div>
        <pre className="mini-menu-content">{useAlias ? aliasImports : relativeImports}</pre>
      </div>

      <div className="demo-menu-explain">
        <div className="demo-menu-card">
          <h3>tsconfig.app.json</h3>
          <p className="muted">
            Pentru TypeScript și IDE: type-check, „go to definition", autocomplete. Fără el, editorul subliniază roșu.
          </p>
        </div>
        <div className="demo-menu-card">
          <h3>vite.config.ts</h3>
          <p className="muted">
            Pentru bundler: rezolvarea reală a fișierului la dev și la build. Fără el, aplicația nu pornește.
          </p>
        </div>
      </div>

      <details className="code-box">
        <summary>💻 Cod de reținut — aliasul, în ambele configuri</summary>
        <pre>
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
