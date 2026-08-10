import { useEffect, useState } from "react";

// Alt hook custom, aceeași rețetă: state + effect ambalate într-o funcție
// "use...". Componenta care îl cheamă nu mai știe nimic de addEventListener
// / removeEventListener — doar primește { width, height } gata calculate,
// la fel cum un endpoint FastAPI nu știe cum un serviciu de config își
// citește variabilele de mediu, doar cheamă get_settings().
export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function onResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
