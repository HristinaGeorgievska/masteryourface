---
name: prod-commit-push
description: >-
  Best practice workflow for staging, committing, and safely pushing changes to the main branch for production release.
  Use this skill whenever preparing, verifying, committing, or pushing code to main or deploying to production.
---

# Best Practice: Commit & Push do Main (Production)

Tento návod popisuje bezpečný a standardizovaný postup pro přípravu, ověření, commit a push změn přímo do větve `main`, která spouští produkční deployment (např. na Vercel).

---

## 1. Předletová kontrola (Pre-flight Verification)

Před jakýmkoliv přidáváním souborů do Gitu **vždy** ověřte, že kód bezchybně prochází kontrolami a sestavením. Zabrání se tím rozbití produkčního buildu na Vercelu.

### Krok 1.1: Typová kontrola (TypeScript)
```bash
npm run type-check
```
*Musí skončit bez chyb (Exit code 0).*

### Krok 1.2: Linter
```bash
npm run lint
```
*Zkontroluje syntaxi, nepoužité importy a React pravidla.*

### Krok 1.3: Lokální sestavení (Build test)
```bash
npm run build:dev
```
*Ověří, že Vite dokáže projekt bez problémů sestavit a zkontrolovat všechny assety.*

---

## 2. Kontrola stavu a čistoty repozitáře

Před commitem důkladně zkontrolujte, jaké soubory byly změněny a zda v repozitáři nezůstaly nechtěné soubory.

```bash
git status
```

### Zásady:
- **Žádné citlivé údaje:** Nikdy necommitovat `.env`, `.env.local`, API klíče, hesla ani tokeny.
- **Žádné dočasné soubory:** Necommitovat testovací screenshoty, debug logy, scratch skripty ani cache.
- **Revize změn:** Zkontrolujte diff, abyste se ujistili, že commitujete pouze zamýšlené úpravy:
  ```bash
  git diff
  ```

---

## 3. Selektivní staging (Atomické změny)

Vyhněte se slepému `git add .`, pokud jsou v projektu netrackované experimentální soubory. Přidávejte soubory cíleně:

```bash
# Přidání konkrétních upravených souborů
git add src/components/FAQ.tsx public/vouchers/ package.json package-lock.json

# Nebo revize staged souborů
git status
```

---

## 4. Konvenční commit message (Conventional Commits)

Používejte přehledné a popisné zprávy v imperativu. Tento repozitář používá standard **Conventional Commits**:

### Formát:
`<typ>: <krátký popis v přítomném čase>`

### Běžné typy:
- `feat:` nová funkce (např. `feat: add gift voucher FAQ with interactive preview modal`)
- `fix:` oprava chyby (např. `fix: modal backdrop z-index on mobile`)
- `ui:` nebo `style:` úpravy vzhledu, stylů nebo kontrastu (např. `ui: improve button hover contrast in FAQ`)
- `refactor:` refaktoring kódu beze změny chování
- `chore:` úprava závislostí, konfigurací (`package.json`, build skripty)
- `docs:` aktualizace dokumentace

### Příklad:
```bash
git commit -m "feat: add gift voucher FAQ with download modal and variant switcher"
```

---

## 5. Synchronizace s remote před pushem

Před odesláním do produkční větve vždy synchronizujte lokální stav s remote repozitářem:

```bash
git pull origin main --rebase
```
*Rebase zajistí čistou lineární historii bez zbytečných merge commitů.*

---

## 6. Bezpečný push do produkce

```bash
git push origin main
```

> [!CAUTION]
> **Nikdy nepoužívejte `git push --force` do větve `main`!** Přepsání produkční historie může poškodit práci týmu a způsobit selhání probíhajících deploymentů.

---

## 7. Produkční post-deploy kontrola (Smoke test)

1. **Stav deploymentu:** Zkontrolujte dashboard Vercelu (či Git commit status), zda produkční build proběhl úspěšně (`Ready`).
2. **Smoke test na živém webu:**
   - Otevřete produkční URL webu v anonymním okně.
   - Otestujte nově přidanou funkci (např. otevření modálu, stažení voucheru, navigace).
   - Otevřete konzoli prohlížeče (F12) a ujistěte se, že se nezobrazují žádné chyby (404/500).

---

## Rychlý checklist před pushem:

- [ ] `npm run type-check` prošel bez chyb
- [ ] `npm run lint` prošel bez chyb
- [ ] `npm run build:dev` úspěšně sestavil bundle
- [ ] `git status` obsahuje pouze chtěné změny (žádná tajemství / dočasné soubory)
- [ ] Smysluplná commit message (`feat: ...`, `fix: ...`)
- [ ] `git pull origin main --rebase` proveden
- [ ] `git push origin main`
- [ ] Ověřen Vercel build & funkčnost na produkční URL
