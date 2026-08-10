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
// peste colț (butonul e "relative", badge-ul e "absolute" față de el).
// className-urile alternative (activ vs. inactiv) se compun ca array +
// filter(Boolean).join(" ") — nu există un echivalent Jinja "class={% if %}"
// aici, deci JS-ul concatenează el însuși stringul final de clase.
export function DemoTab({ label, step, active, disabled, onClick }: DemoTabProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "relative cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-opacity",
        "disabled:cursor-not-allowed disabled:opacity-45 not-disabled:hover:opacity-85",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground"
      ].join(" ")}
    >
      {label}
      <span
        className={[
          "absolute -top-2 -right-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-background px-1 text-xs font-bold",
          active ? "bg-primary-foreground text-primary" : "bg-accent text-accent-foreground"
        ].join(" ")}
      >
        {step}
      </span>
    </button>
  );
}
