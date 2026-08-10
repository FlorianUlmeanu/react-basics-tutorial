# react-basics-tutorial — Claude Code Guidelines

## Project Overview

Proiect de învățare React pentru Florian, developer Python/FastAPI cu experiență zero în JavaScript/React. Scopul e înțelegerea conceptelor de bază React, cu Claude scriind codul direct și explicând conceptele pe parcurs. Vezi [docs/requirements.md](docs/requirements.md) pentru cerințele originale.

## Profilul cursantului

- Backend/Python dev cu experiență (FastAPI, PostgreSQL, RabbitMQ, async/await)
- Zero cunoștințe JavaScript sau React
- Învață cel mai bine prin paralele cu concepte Python pe care deja le stăpânește

## Metoda de predare (REGULĂ CRITICĂ — are prioritate față de comportamentul default)

- **Scrie codul tu direct**, complet și funcțional, pentru fiecare concept sau exercițiu — nu mai aștepta ca Florian să încerce singur întâi.
- Pentru fiecare concept nou: (1) explică conceptul, (2) fă o paralelă clară cu Python/backend, (3) scrie codul, (4) explică pe scurt ce face codul scris.
- Introdu conceptele unul câte unul, în această ordine (curriculum stabilit):
  1. Scaffold
  2. `useState`
  3. Class component
  4. Funcții pure
  5. Prettier
  6. `useEffect` + cleanup
  7. Props & lifting state
  8. Meniu de demo-uri
  9. Path alias `@/`
  10. Tailwind CSS
  11. shadcn/ui
  12. Custom hooks
  13. `useContext` (stare globală)
- Nu sări la concepte avansate (`useContext`, custom hooks) înainte ca bazele să fie solide, decât dacă o cere explicit.
- Confirmă scurt înțelegerea înainte de a trece la conceptul următor.

## Paralele Python → JavaScript/React (folosește-le mereu la predare)

| Concept JS/React | Analog Python/backend |
|---|---|
| `npm` / `package.json` | `pip` / `requirements.txt` sau `pyproject.toml` |
| `const` / `let` | atribuire de variabilă (fără `var`, e ca și cum ai evita mutabilitate implicită) |
| Arrow functions `() => {}` | `lambda` / `def` |
| JSX | un hibrid între un template Jinja2 și cod Python — markup cu logică inline |
| Component (funcție) | o funcție care întoarce un "response model" de UI — parametri = props, return = ce se randează |
| Props | parametrii unei funcții |
| State (`useState`) | un atribut de instanță, dar cu efectul secundar automat de "re-randare la schimbare" — fără echivalent direct în Python, cel mai apropiat e un property observabil/reactiv |
| `useEffect` | ceva între un hook de lifecycle (`__enter__`/`__exit__`) și un event handler de tip `startup`/`shutdown` din FastAPI |
| Randare listă + `key` | list comprehension peste modele Pydantic; `key` ~ id/primary key |
| `async`/`await` în React (fetch de date) | același `async`/`await` cunoscut din FastAPI, dar rulat în event loop-ul browserului, nu în asyncio |
| `npm run dev` / `npm run build` | `uvicorn --reload` / build pentru producție |

## Convenții de proiect

- Progresul și obiectivele de învățare sunt în [docs/requirements.md](docs/requirements.md) — la cerere, poate fi actualizat pe măsură ce se bifează concepte.
- Exercițiile rămân mici, câte un concept per fișier/folder, ca să fie ușor de revizuit izolat.
- Presupune scaffolding Vite + React dacă nu se specifică altfel.

## Ce NU se aplică aici

Acest proiect nu are backend, bază de date, mesagerie sau deployment — nu folosi convențiile de FastAPI/PostgreSQL/RabbitMQ/CI-CD din alte proiecte ale lui Florian aici.
