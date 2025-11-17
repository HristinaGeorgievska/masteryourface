# TODO - Upgrades a opravy

## 🔴 Kritické / Vysoká priorita

### Performance
- [ ] **Lazy loading obrázků** - Přidat `loading="lazy"` na všechny img elementy pro lepší performance
- [ ] **Optimalizace obrázků** - Zvážit WebP formát a responsive images

### Kód - Bugfixy
- [ ] **Memory leak v ScrollReveal** - Opravit cleanup funkci v useEffect (unobserve může být volán na null)

### Placeholder odkazy
- [ ] **BookingCTA** - Nahradit `calendly.com` placeholder skutečným tidycal odkazem
- [ ] **Footer** - Aktualizovat nebo odstranit placeholder odkazy (`instagram.com`, `facebook.com`, `portfolio.example.com`)
- [ ] **VideoSection** - Nahradit placeholder YouTube video (`dQw4w9WgXcQ`) skutečným videem

## 🟡 Střední priorita

### UX vylepšení
- [ ] **Testimonials** - Přidat manuální ovládání (tlačítka pro přepínání mezi testimonialy)
- [ ] **Loading states** - Přidat loading stavy pro obrázky (skeleton nebo spinner)
- [ ] **Error handling pro obrázky** - Přidat fallback obrázky pro neúspěšné načtení

### SEO
- [ ] **Structured data (JSON-LD)** - Přidat schema.org markup pro lepší SEO
- [ ] **Sitemap.xml** - Vytvořit sitemap pro lepší indexování
- [ ] **Meta tagy** - Zkontrolovat a vylepšit meta tagy (Open Graph, Twitter Cards)

### Accessibility
- [ ] **Alt texty** - Vylepšit alt texty u obrázků (konkrétnější popisy místo generických)
- [ ] **Skip-to-content link** - Přidat pro lepší keyboard navigation
- [ ] **Focus management** - Zkontrolovat focus states u interaktivních prvků

## 🟢 Nízká priorita / Nice to have

### Error handling
- [ ] **Error Boundaries** - Přidat React Error Boundaries pro lepší error handling
- [ ] **Error fallbacks** - Přidat fallback UI pro chybové stavy

### Analytics & Tracking
- [ ] **Google Analytics** - Přidat tracking (pokud je potřeba)
- [ ] **Cookie consent** - Přidat GDPR cookie consent banner (pokud je potřeba)

### Další vylepšení
- [ ] **TypeScript** - Zkontrolovat a zpřísnit TypeScript typy
- [ ] **Favicon** - Ověřit, že favicon je správně nastaven
- [ ] **Progress indicator** - Zvážit přidání scroll progress indicatoru

---

## ✅ Hotovo / Záměrně ponecháno

- ✅ **Navbar** - Záměrně není kvůli clean looku
- ✅ **Kontaktní formulář** - Záměrně není, používá se externí tidycal

---

## Poznámky

- Navbar a kontaktní formulář jsou záměrně vynechány podle designových rozhodnutí
- Všechny booking odkazy vedou na tidycal (externí služba)
- Footer obsahuje placeholder odkazy, které je potřeba aktualizovat nebo odstranit

