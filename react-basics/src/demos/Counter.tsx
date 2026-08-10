import { useState } from 'react'

// Counter e o FUNCȚIE, nu un obiect cu stare persistentă.
// React o re-EXECUTĂ de fiecare dată când setCount schimbă starea,
// iar `count` returnat de useState e mereu valoarea curentă din acea randare.
export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p style={{ fontSize: '4rem', margin: 0 }}>{count}</p>

      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>

      <button type="button" onClick={() => setCount((c) => c - 1)}>
        -1
      </button>

      {/* Forma funcțională e sigură și aici, deși nu depinde de count:
          React garantează că folosește starea reală din coadă, nu o
          "poză" veche capturată de closure la randarea anterioară. */}
      <button type="button" onClick={() => setCount(() => 0)}>
        Reset
      </button>
    </div>
  )
}
