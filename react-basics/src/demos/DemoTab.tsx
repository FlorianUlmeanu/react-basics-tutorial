import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DemoTabProps = {
  label: string;
  step: number;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
};

// Butonul de navigare al meniului de demo-uri: numele conceptului rămâne
// lizibil în buton, iar numărul pasului stă într-un badge poziționat
// ABSOLUT în colțul dreapta-sus — nu împinge textul, doar se suprapune
// peste colț. <Button> e deja "relative" prin propriile clase interne, dar
// suprascrie "overflow: visible" — altfel badge-ul ar fi tăiat la margine.
// Starea disabled (hover, focus ring, cursor) vine gratis din componentă —
// nu mai scriem noi disabled:opacity-45 etc.
export function DemoTab({ label, step, active, disabled, onClick }: DemoTabProps) {
  return (
    <Button
      variant={active ? "default" : "secondary"}
      size="sm"
      disabled={disabled}
      onClick={onClick}
      className="relative overflow-visible"
    >
      {label}
      <span
        className={cn(
          "border-background absolute -top-2 -right-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 px-1 text-xs font-bold",
          active ? "bg-primary-foreground text-primary" : "bg-accent text-accent-foreground"
        )}
      >
        {step}
      </span>
    </Button>
  );
}
