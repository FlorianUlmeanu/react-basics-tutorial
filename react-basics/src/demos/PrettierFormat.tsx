// Acest "slide" e doar text: Prettier e un pas de configurare, nu un concept
// de React, deci nu are stare, butoane sau exemple interactive.
export function PrettierFormat() {
  return (
    <div>
      <h2>Prettier — formatare automată</h2>
      <p>
        Prettier e echivalentul lui <code>black</code> din Python: un formatter fără opțiuni de gust — rulează peste cod
        și-l rescrie mereu în același stil, ca formatarea să nu mai fie subiect de code review.
      </p>

      <h3>Ce am configurat</h3>
      <ul>
        <li>
          <code>prettier</code> + <code>prettier-plugin-tailwindcss</code> ca dev dependencies (plugin-ul sortează
          claselor Tailwind automat — încă nu contează, dar e pus de pe acum).
        </li>
        <li>
          <code>.prettierrc</code> — configurația fixă, comisă în proiect:
          <ul>
            <li>
              <code>semi: true</code> — pune <code>;</code> la finalul instrucțiunilor.
            </li>
            <li>
              <code>singleQuote: false</code> — folosește ghilimele duble <code>"</code>, nu simple <code>'</code>.
            </li>
            <li>
              <code>printWidth: 120</code> — rupe linia pe mai multe rânduri după 120 de caractere.
            </li>
            <li>
              <code>arrowParens: "avoid"</code> — pentru arrow functions cu un singur parametru, fără paranteze:{" "}
              <code>x =&gt; x + 1</code> în loc de <code>(x) =&gt; x + 1</code>.
            </li>
            <li>
              <code>trailingComma: "none"</code> — fără virgulă după ultimul element dintr-o listă/obiect.
            </li>
          </ul>
        </li>
        <li>
          <code>.prettierignore</code> — exclude <code>node_modules</code> și <code>dist</code> din formatare.
        </li>
        <li>
          Scripturi în <code>package.json</code>: <code>npm run format</code> (rescrie fișierele) și{" "}
          <code>npm run format:check</code> (doar verifică, nu modifică — util într-un pipeline de CI).
        </li>
        <li>
          <code>.vscode/settings.json</code>, comis în proiect: <code>editor.formatOnSave: true</code> +{" "}
          <code>editor.defaultFormatter: "esbenp.prettier-vscode"</code>. Toată lumea care deschide proiectul în VS Code
          are automat aceeași configurație — nu depinde de setările locale ale fiecăruia.
        </li>
      </ul>

      <h3>Când vreau ca Prettier să lase un bloc în pace</h3>
      <p>
        Uneori formatarea automată strică lizibilitatea unui bloc scris intenționat pe coloane — de exemplu o matrice.
        Comentariul <code>// prettier-ignore</code>, pus imediat înaintea declarației, spune lui Prettier să lase acel
        nod exact cum e scris:
      </p>
      {/* prettier-ignore */}
      <pre>
{`// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];`}
      </pre>
      <p>
        În JSX forma e <code>{"{/* prettier-ignore */}"}</code> și se aplică elementului următor (exact ca mai sus, pus
        deasupra blocului <code>{"<pre>"}</code>).
      </p>
      <p>
        Important: în JS/TS directiva afectează <strong>doar nodul imediat următor</strong> — nu există o variantă
        „ignoră de aici până aici". (<code>prettier-ignore-start</code> / <code>prettier-ignore-end</code> există în
        Markdown, YAML și HTML, dar nu în JS/TS.)
      </p>
      <p>
        Se folosește rar și motivat — pentru matrice sau tabele de valori aliniate manual — nu ca să ocolim convenția de
        formatare a echipei.
      </p>
    </div>
  );
}
