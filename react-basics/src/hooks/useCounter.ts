import { useCallback, useState } from "react";

// Singura regulă ca o funcție să fie "hook custom": numele începe cu "use".
// În rest e o funcție obișnuită care poate chema alte hooks (aici: useState +
// useCallback) — echivalentul unei clase mici de service în backend, doar că
// "instanța" ei trăiește legată de componenta care o apelează, nu într-un
// container DI global.
export function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);

  // useCallback memorează funcția între randări: fără el, la fiecare
  // re-randare a componentei ar lua naștere o funcție NOUĂ (aceeași
  // problemă ca o closure re-creată la fiecare cerere într-un handler
  // FastAPI) — nu grav aici, dar contează când funcția e trecută mai
  // departe ca prop și declanșează re-randări inutile în copii.
  const increment = useCallback(() => setCount(c => c + step), [step]);
  const decrement = useCallback(() => setCount(c => Math.max(0, c - step)), [step]);
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, increment, decrement, reset };
}
