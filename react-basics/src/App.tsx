import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { steps } from "@/steps";
import { DemoTab } from "@/demos/DemoTab";
import { Button } from "@/components/ui/button";

// Ultimul pas care are o demo scrisă = pasul curent al lecției.
const lastAvailableStep = [...steps].reverse().find(s => s.component)!.id;

function App() {
  const [activeId, setActiveId] = useState(lastAvailableStep);
  const active = steps.find(s => s.id === activeId)!;

  // Tema trăiește aici (useState), la fel ca activeId — un candidat clar
  // pentru Pas 13 (useContext), ca să nu mai treacă prin props din App
  // în orice componentă adâncă ce vrea să știe tema curentă. Pornim din
  // preferința sistemului, la fel cum media query-ul o făcea înainte.
  const [isDark, setIsDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Efectul e punctul de contact cu "lumea din afara React": clasa .dark
  // pe <html> nu e un nod din arborele nostru de componente, deci nu poate
  // fi setată direct din JSX — se scrie manual în DOM, într-un efect.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <>
      <header id="course-header" className="relative px-6 pt-8 text-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDark(d => !d)}
          className="absolute top-8 right-6"
          aria-label={isDark ? "Comută la light mode" : "Comută la dark mode"}
        >
          {isDark ? <Moon /> : <Sun />}
        </Button>
        <h1>React Basics</h1>
        <p className="muted mx-auto">Playground care crește pas cu pas — fiecare buton e un concept.</p>
      </header>

      <nav id="step-nav" className="border-border flex flex-wrap justify-center gap-2 border-b px-6 py-5">
        {steps.map(step => (
          <DemoTab
            key={step.id}
            label={step.label}
            step={step.id}
            active={step.id === activeId}
            disabled={!step.component}
            onClick={() => setActiveId(step.id)}
          />
        ))}
      </nav>

      <section
        id="center"
        className="flex grow flex-col place-content-center place-items-center gap-6 max-lg:gap-4 max-lg:px-5 max-lg:py-8"
      >
        {active.component ? (
          active.component()
        ) : (
          <p className="muted">Pasul „{active.label}" nu are încă o demo scrisă.</p>
        )}
      </section>
    </>
  );
}

export default App;
