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
// peste colț (butonul e position: relative, badge-ul e position: absolute
// față de el, în App.css).
export function DemoTab({ label, step, active, disabled, onClick }: DemoTabProps) {
  return (
    <button
      type="button"
      className={["step-pill", active && "active"].filter(Boolean).join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
      <span className="step-badge">{step}</span>
    </button>
  );
}
