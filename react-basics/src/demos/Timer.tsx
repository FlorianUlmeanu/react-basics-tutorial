import { useEffect, useState } from "react";

// Contor de abonamente la nivel de MODUL (nu de componentă!) — există o
// singură dată, cât timp fila e deschisă, și e văzut de toate instanțele.
// E ok să trăiască aici pentru că e citit/scris DOAR dintr-un efect, nu din
// corpul componentei — regula de puritate se aplică randării, nu efectelor.
let subscriptionCount = 0;

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  // EFECTUL #1 — cronometrul.
  // useEffect rulează DUPĂ ce React a randat DOM-ul, nu în timpul randării —
  // e locul potrivit pentru "efecte secundare": timere, fetch, event
  // listeners, orice ține de lumea din afara funcției componentei (browser,
  // rețea). NU se scrie direct în corpul componentei: acolo codul rulează
  // SINCRON la fiecare randare, înainte ca ecranul să existe, deci un
  // setInterval pornit acolo ar porni din nou la fiecare re-randare, fără
  // nicio șansă de curățare a celui vechi.
  useEffect(() => {
    if (!running) {
      console.log("[timer] efect: running=false, nu pornesc interval");
      return;
    }

    console.log("[timer] efect pornit → setInterval");
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: React îl apelează ÎNAINTE de a rula din nou efectul (când
    // `running` se schimbă) și la unmount. Fără el, la fiecare toggle rapid
    // de Pauză/Pornește ar rămâne câte un setInterval activ în plus — un
    // timer "zombie" care tot incrementează seconds în fundal: memory leak.
    return () => {
      console.log("[timer] cleanup → clearInterval", id);
      clearInterval(id);
    };
  }, [running]);

  // EFECTUL #2 — tracker de click-uri, complet independent de cronometru.
  // Dependențe [] → rulează O SINGURĂ DATĂ, la montare (echivalentul unui
  // "on startup"), nu la fiecare randare.
  useEffect(() => {
    subscriptionCount += 1;
    const trackerId = subscriptionCount;
    console.log(`[tracker #${trackerId}] abonat la click-uri pe <body> (${subscriptionCount} abonamente active)`);

    function onBodyClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      const x = Math.round(event.pageX);
      const y = Math.round(event.pageY);

      // textContent ar întoarce textul TUTUROR descendenților — pe un click
      // în <body> ar veni practic tot textul paginii. Filtrăm childNodes
      // după nodeType === Node.TEXT_NODE ca să luăm DOAR textul propriu al
      // elementului apăsat, nu al copiilor lui.
      const ownText = Array.from(target.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent?.trim() ?? "")
        .join(" ")
        .trim();

      // Dacă n-are text propriu, arătăm clasele — dar din classList, nu
      // className: pe elementele SVG (ex. iconițele lucide) className NU e
      // string, e un SVGAnimatedString, deci nu are .slice/.split ca un
      // string obișnuit. classList funcționează la fel pe HTML și pe SVG.
      const label = ownText || Array.from(target.classList).slice(0, 3).join(".") || "(fără text/clase)";

      // Handler strict READ-ONLY față de React: doar citește evenimentul și
      // scrie în consolă — fără setState, fără atins DOM-ul, fără fetch.
      // Într-o aplicație reală, aici am face apelul către serviciul de
      // analytics.
      console.log(`[tracker #${trackerId}] click → <${tag}> "${label}" @ ${x}×${y}`);
    }

    document.body.addEventListener("click", onBodyClick);

    // Fără return aici — deocamdată. Nu ne dezabonăm încă, intenționat: îl
    // adăugăm împreună la curs, după ce vedem în consolă ce se întâmplă
    // fără el (vezi cutia de mai jos).
  }, []);

  return (
    <div className="timer-demo">
      <h1>Pas 6 — useEffect + cleanup</h1>
      <p className="muted">
        Timer pe <code>setInterval</code>, curățat corect la unmount.
      </p>

      <p className="timer-display">{seconds}s</p>

      <div className="timer-buttons">
        <button type="button" className="btn-primary" onClick={() => setRunning(r => !r)}>
          {running ? "Pauză" : "Pornește"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>

      <p className="muted">
        Deschide consola: fără cleanup, comutarea rapidă ar lăsa mai multe intervale active în paralel. Cu cleanup,
        mereu e exact unul.
      </p>

      <div className="exercise-box">
        <p>
          <strong>🧪 Exercițiu — tracker de click-uri.</strong> La intrarea în ecran ne abonăm la click-urile pe body
          și scriem în consolă ce s-a apăsat — tag, text (sau clase, dacă n-are text) și poziția în pagină. Telemetria
          pe care într-o aplicație reală am trimite-o la analytics. <strong>Dezabonarea o adăugăm împreună</strong>,
          la curs.
        </p>
        <p>
          Cu consola deschisă: dă click în pagină, treci pe alt tab, revino aici și dă din nou click →{" "}
          <strong>același click apare de mai multe ori</strong>, o dată pentru fiecare tracker rămas activ. Nimic nu
          crapă (handler-ul doar citește evenimentul), doar că același click ar ajunge de N ori în analytics. În dev,{" "}
          <code>StrictMode</code> montează componenta de două ori, deci pornim deja de la 2.
        </p>
      </div>
    </div>
  );
}
