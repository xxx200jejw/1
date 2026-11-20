# UI-testimise praktikum: programmeeritud UI-testid Playwrightiga

**Õppeaine:** Tarkvarasüsteemide testimine  
**Teema:** 4. UI-testid  
**Töövahendid:** GitHub, GitHub Codespaces, Node.js, Playwright  
**Testitav veebirakendus:** [TodoMVC demo](https://demo.playwright.dev/todomvc/)

---

## 1. Töö eesmärk

Selle praktilise töö käigus õpid looma automaatseid kasutajaliidese teste. Sa ei kontrolli ainult seda, kas veebileht avaneb, vaid simuleerid kasutaja tegevusi ja kontrollid, kas rakendus käitub ootuspäraselt.

Töö lõpuks oskad:
- selgitada, mida tähendab UI-testimine;
- avada GitHubi projekti Codespaces'i töökeskkonnas;
- kasutada Playwrighti veebirakenduse avamiseks ja juhtimiseks;
- leida veebilehe elemente lokaatorite abil;
- teha kasutaja tegevusi, näiteks sisestada teksti, vajutada klahvi ja märkida märkeruutu;
- kontrollida tegelikku tulemust `expect()` abil;
- käivitada teste ja analüüsida testitulemusi.

### Mis on UI-testimine?

UI (User Interface) tähendab kasutajaliidest – seda veebirakenduse osa, mida kasutaja näeb ja millega ta suhtleb.

UI-test kontrollib näiteks:
- kas kasutaja saab vormi täita;
- kas nupule vajutamine käivitab õige tegevuse;
- kas uus ülesanne ilmub nimekirja;
- kas ülesande kustutamine töötab;
- kas kasutajale kuvatakse õige tulemus või veateade.

**Automaatse UI-testi mõte:** programm teeb veebilehel kasutaja eest tegevused ja kontrollib, kas tulemus vastab ootusele.

---

## 2. GitHubi repositooriumi loomine

1. Ava [GitHub](https://github.com/) ja logi sisse.
2. Vajuta **New repository**.
3. Pane repositooriumi nimeks näiteks `ui-testimise-praktikum`.
4. Vali repositooriumile sobiv nähtavus vastavalt õpetaja juhisele.
5. Vajuta **Create repository**.
6. Ava loodud repositoorium.
7. Vali **Add file → Upload files**.
8. Paki õpetajalt saadud ZIP-fail oma arvutis lahti.
9. Laadi lahtipakitud projekti failid ja kaustad GitHubi üles. Laadi üles failid ja kaustad, mitte ZIP-fail ise.
10. Vajuta **Commit changes**.

Pärast üleslaadimist peaks repositooriumi põhikaustas olema vähemalt järgmine struktuur:

```text
ui-testimise-praktikum/
├── tests/
│   └── todo.spec.js
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

---

## 3. GitHub Codespaces'i avamine

Codespaces võimaldab töötada projektiga veebibrauseris, ilma et peaksid oma arvutisse kogu arenduskeskkonda paigaldama.

1. Ava oma GitHubi repositoorium.
2. Vajuta rohelist **Code** nuppu.
3. Ava vahekaart **Codespaces**.
4. Vali **Create codespace on main**.
5. Oota, kuni töökeskkond avaneb.

Codespaces'is näed:
- vasakul projektifaile;
- keskel koodiredaktorit;
- all terminali.

Kui terminal ei ole nähtav, vali menüüst **Terminal → New Terminal**.

---

## 4. Projekti ettevalmistamine

### Mis on Node.js?

Node.js võimaldab käivitada JavaScripti koodi väljaspool veebibrauserit. Playwrighti testid käivitatakse Node.js-i abil.

### Mis on npm?

npm on Node.js-iga kaasas olev paketihaldur. Selle abil paigaldatakse projekti vajalikud teegid.

### Mis on Playwright?

Playwright on tööriist, millega saab automatiseerida veebibrauseri tegevusi ja testida veebirakendusi.

### Paigalda projekti sõltuvused

Ava terminal ja käivita:

```bash
npm install
```

See käsk paigaldab `package.json` failis kirjeldatud sõltuvused ning loob `node_modules` kausta ja `package-lock.json` faili.

Seejärel paigalda Chromiumi brauser:

```bash
npx playwright install chromium
```

Kui paigaldamine õnnestub, oled valmis teste käivitama.

---

## 5. Tutvu projekti failidega

| Fail või kaust | Milleks seda kasutatakse? |
|---|---|
| `tests/` | Siin asuvad automaatsed testid. |
| `todo.spec.js` | Testid TodoMVC veebirakenduse jaoks. |
| `package.json` | Projekti nimi, sõltuvused ja käivituskäsud. |
| `package-lock.json` | npm-i loodud täpne sõltuvuste loend. |
| `playwright.config.js` | Playwrighti testide üldised seaded. |
| `.gitignore` | Määrab failid ja kaustad, mida GitHubi ei lisata. |
| `node_modules/` | Paigaldatud teegid; seda kausta ei lisata GitHubi. |

---

## 6. Playwrighti põhimõisted

Ava fail `tests/todo.spec.js`. Enne testide kirjutamist tutvu järgmiste mõistetega.

### `test()`

`test()` määrab ühe testjuhtumi. Testi nimi kirjeldab, mida kontrollitakse.

```javascript
test('kasutaja saab lisada ülesande', async ({ page }) => {
  // Testi sammud kirjutatakse siia.
});
```

### `page`

`page` tähistab brauseri lehte, millega test suhtleb.

Veebilehe avamine:

```javascript
await page.goto('https://demo.playwright.dev/todomvc/');
```

### Lokaatorid ehk `locator`

Lokaator aitab leida veebilehe elemendi, näiteks tekstivälja, nupu või märkeruudu.

Näited:

```javascript
page.getByPlaceholder('What needs to be done?');
page.getByText('Minu ülesanne');
page.getByRole('button');
page.getByRole('checkbox');
```

### Kasutaja tegevuste simuleerimine

```javascript
await input.fill('Minu ülesanne'); // sisestab teksti
await input.press('Enter');        // vajutab Enter-klahvi
await checkbox.check();            // märgib märkeruudu
await button.click();              // vajutab nuppu
await element.hover();              // viib hiire elemendi kohale
```

### `expect()`

`expect()` abil kontrollitakse, kas tegelik tulemus vastab oodatud tulemusele.

```javascript
await expect(page.getByText('Minu ülesanne')).toBeVisible();
```

Levinud kontrollid:

```javascript
await expect(element).toBeVisible();    // element on nähtav
await expect(element).toBeHidden();     // element ei ole nähtav
await expect(checkbox).toBeChecked();   // märkeruut on märgitud
await expect(element).toHaveCount(1);   // leitakse üks element
```

### Miks kasutatakse `await`?

Playwrighti tegevused võtavad aega: brauser avab lehe, leiab elemendi või teeb klõpsu. `await` ütleb JavaScriptile, et järgmise sammuga tuleb oodata, kuni eelmine tegevus on lõpetatud.

---

## 7. Test 1 – ülesande lisamine (valmis näidis)

Esimene test on failis `tests/todo.spec.js` juba valmis. Sinu ülesanne on see läbi lugeda, käivitada ja mõista, mida iga rida teeb.

```javascript
const { test, expect } = require('@playwright/test');

test('kasutaja saab lisada ülesande', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Õpi UI testimist');
  await input.press('Enter');

  await expect(page.getByText('Õpi UI testimist')).toBeVisible();
});
```

### Koodi selgitus

1. `require('@playwright/test')` impordib Playwrighti testimisfunktsioonid.
2. `test()` alustab uue testjuhtumi.
3. `page.goto()` avab testitava veebilehe.
4. `getByPlaceholder()` leiab tekstivälja selle vihjeteksti järgi.
5. `fill()` sisestab tekstiväljale ülesande nime.
6. `press('Enter')` vajutab Enter-klahvi.
7. `expect(...).toBeVisible()` kontrollib, kas lisatud ülesanne on veebilehel nähtav.

**Mõtle:** milline oleks selle testi oodatud tulemus? Mis juhtuks, kui rakendus ei lisaks ülesannet nimekirja?

---

## 8. Test 2 – ülesande lõpetatuks märkimine

**Eesmärk:** kontrollida, kas kasutaja saab ülesande märkida lõpetatuks.

### Testjuhtum

| Samm | Tegevus | Oodatud tulemus |
|---|---|---|
| 1 | Ava TodoMVC | Veebileht avaneb. |
| 2 | Lisa ülesanne „Esimene test” | Ülesanne ilmub nimekirja. |
| 3 | Leia ülesande märkeruut | Märkeruut leitakse. |
| 4 | Märgi märkeruut | Ülesanne märgitakse lõpetatuks. |
| 5 | Kontrolli märkeruudu olekut | Märkeruut on märgitud. |

### Sinu ülesanne

Ava `tests/todo.spec.js` ja täienda teist testi.

Kasulikud koodinäited:

Leia ülesande sisestusväli:

```javascript
const input = page.getByPlaceholder('What needs to be done?');
```

Leia ülesande rida teksti järgi:

```javascript
const task = page.getByRole('listitem').filter({
  hasText: 'Esimene test'
});
```

Leia selle rea sees märkeruut:

```javascript
const checkbox = task.getByRole('checkbox');
```

Märgi märkeruut:

```javascript
await checkbox.check();
```

Kontrolli tulemust:

```javascript
await expect(checkbox).toBeChecked();
```

**Sinu ülesanne on need sammud õigesse järjekorda panna ja kirjutada terviklik test.**

---

## 9. Test 3 – ülesande kustutamine

**Eesmärk:** kontrollida, kas kasutaja saab ülesande nimekirjast kustutada.

### Testjuhtum

| Samm | Tegevus | Oodatud tulemus |
|---|---|---|
| 1 | Ava TodoMVC | Veebileht avaneb. |
| 2 | Lisa ülesanne „Kustutatav ülesanne” | Ülesanne ilmub nimekirja. |
| 3 | Leia ülesande rida | Õige ülesande rida leitakse. |
| 4 | Liigu hiirega ülesande reale | Kustutamisnupp muutub nähtavaks. |
| 5 | Vajuta kustutamisnuppu | Ülesanne kustutatakse. |
| 6 | Kontrolli tulemust | Ülesannet enam nimekirjas ei ole. |

### Sinu ülesanne

Kasuta eelmise ülesande lahendust ja täienda kolmandat testi.

Kasulikud koodinäited:

Hiire liigutamine ülesande reale:

```javascript
await task.hover();
```

Kustutamisnupu leidmine ja vajutamine:

```javascript
await task.locator('button.destroy').click();
```

Kontrolli, et ülesanne on kustutatud:

```javascript
await expect(page.getByText('Kustutatav ülesanne')).toHaveCount(0);
```

**Sinu ülesanne on kirjutada terviklik test, mis kontrollib kogu kustutamise protsessi.**

---

## 10. Testide käivitamine

Kõikide testide käivitamine:

```bash
npx playwright test
```

Testide käivitamine brauseriaknaga:

```bash
npx playwright test --headed
```

Ühe konkreetse testi käivitamine nime järgi:

```bash
npx playwright test -g "kasutaja saab lisada ülesande"
```

Testitulemuste vaatamine HTML-raportis:

```bash
npx playwright show-report
```

### Kuidas tulemusi lugeda?

- `passed` – test läbis edukalt.
- `failed` – test ebaõnnestus.
- `skipped` – test jäeti vahele.

Kui test ebaõnnestub, loe terminalis kuvatud veateadet. Kontrolli, kas:
- veebileht avanes;
- lokaator leidis õige elemendi;
- tegevus tehti õiges järjekorras;
- oodatud tulemus on õigesti määratud.

**Oluline:** ebaõnnestunud test ei tähenda automaatselt, et veebirakenduses on viga. Probleem võib olla ka testikoodis või vales testieelduses.

---

## 11. Levinud probleemid ja lahendused

### `npm: command not found`

Node.js või npm ei ole töökeskkonnas kättesaadav. Kontrolli, et kasutad GitHub Codespaces'i ja ava terminal uuesti.

### `Cannot find module '@playwright/test'`

Sõltuvused pole paigaldatud. Käivita:

```bash
npm install
```

### Playwright ei leia brauserit

Paigalda Chromium:

```bash
npx playwright install chromium
```

### Test ei leia elementi

Kontrolli:
- kas kasutad õiget teksti või placeholder'it;
- kas element asub lehel;
- kas kasutad õiget lokaatorit;
- kas eelmine tegevus on lõpetatud.

### Test ebaõnnestub, aga veebileht näib töötavat

Kontrolli testi samm-sammult. Võrdle oodatud tulemust tegeliku tulemusega. Vajadusel käivita test uuesti ja uuri veateadet.

---

## 12. Täiendavad ülesanded kiirematele õppijatele

Kui kolm põh testi on valmis, vali vähemalt üks lisategevus:

1. Lisa kaks ülesannet ja kontrolli, et nimekirjas on kaks ülesannet.
2. Kontrolli, et aktiivsete ülesannete filter näitab ainult lõpetamata ülesandeid.
3. Kontrolli, et lõpetatud ülesannete filter näitab ainult lõpetatud ülesandeid.
4. Lisa ülesanne, märgi see lõpetatuks ja seejärel kustuta.
5. Mõtle välja üks negatiivne testjuhtum ning selgita, mida sellega kontrollid.

---

## 13. Töö esitamine

Esita õpetajale oma GitHubi repositooriumi link.

Enne esitamist kontrolli:
- [ ] Test 1 töötab.
- [ ] Test 2 on valmis ja töötab.
- [ ] Test 3 on valmis ja töötab.
- [ ] Kõik testid on käivitatud.
- [ ] README lõpus on vastused küsimustele.

### Vasta README lõpus järgmistele küsimustele

1. Mis vahe on manuaalsel ja automaatsel UI-testimisel?
2. Mida kontrollib sinu esimene test?
3. Miks kasutatakse Playwrighti testides `expect()`?
4. Mida tähendab `passed` ja mida tähendab `failed`?
5. Kas ebaõnnestunud test tähendab alati, et veebirakenduses on viga? Selgita.

### Esitamise tulemus

Sinu GitHubi repositoorium peab sisaldama:
- täiendatud faili `tests/todo.spec.js`;
- projekti seadistusfaile;
- README-d koos vastustega.

---

## 14. Kasulikud materjalid

- [Playwright – ametlik dokumentatsioon](https://playwright.dev/docs/intro)
- [Playwright – testide kirjutamine](https://playwright.dev/docs/writing-tests)
- [Playwright – lokaatorid](https://playwright.dev/docs/locators)
- [Playwright – kontrollid ehk assertions](https://playwright.dev/docs/test-assertions)
- [TodoMVC testkeskkond](https://demo.playwright.dev/todomvc/)

**Edu testimisel!**
