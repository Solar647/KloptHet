# Functional Spec — Klopt Het

> Wat doet het product? Voor productbeslissingen tijdens het bouwen: kijk hier.
> Dit document beschrijft het *gedrag* — niet de *implementatie* (zie technical-spec.md daarvoor).

---

## 1. Sitemap (publiek + ingelogd)

### Publiek (niet ingelogd)
```
/                       Homepage
/scanner                Demo-scanner (3 gratis scans/maand, met IP-rate-limit)
/hoe-het-werkt          Uitleg in 3 stappen
/voor-wie               Doelgroep-paginas (ouderen, mantelzorgers)
/prijzen                Prijsoverzicht + abonnementen
/voorbeelden            Gevangen oplichtingsberichten (educatief)
/blog                   Blog-overzicht
/blog/[slug]            Individueel blog-artikel
/over-ons               Wie zit erachter
/contact                Contactformulier
/inloggen               Inlogpagina
/registreren            Registratiepagina
/wachtwoord-vergeten    Reset flow
/privacy                Privacyverklaring (verplicht AVG)
/cookies                Cookieverklaring (verplicht AVG)
/voorwaarden            Algemene Voorwaarden
/impressum              KvK, BTW, adres
/404, /500              Foutpaginas
```

### Ingelogd
```
/dashboard              Overzicht: laatste scans, statistieken
/dashboard/scan         Scannerpagina (onbeperkt voor abonnees)
/dashboard/geschiedenis Volledige scangeschiedenis
/dashboard/familie      [Fase 2] Familieleden uitnodigen + mantelzorger-modus
/dashboard/leren        Educatieve module: lessen, quizzes, badges
/dashboard/instellingen Profiel, wachtwoord, notificaties, abonnement
/dashboard/abonnement   Beheren: opzeggen, upgraden, factuur, betaalmethode
```

### Talen
Alle URLs prefixed met `/nl/...` of `/en/...`. Automatische detectie via browser-taal, met handmatige switcher in footer.

---

## 2. User personas — concrete voorbeelden

### Persona A — Truus (74)
- Weduwe, woont alleen, kleinkinderen op afstand
- Heeft een Samsung-telefoon, gebruikt WhatsApp om met kinderen te bellen en foto's te krijgen
- Krijgt regelmatig "rare" appjes — wist niet dat haar zoon zijn nummer was kwijtgeraakt (was niet zo)
- **Wat ze wil:** snel even checken voordat ze geld stuurt
- **Wat ze niet wil:** uitleg, accounts, abonnementen, eng

### Persona B — Marieke (42)
- Werkende moeder van twee, ouders 70+ wonen in dorp
- Bezorgd na een artikel in De Volkskrant over WhatsApp-fraude
- Goed in digitaal, gebruikt Tikkie, Bunq, etc.
- **Wat ze wil:** iets cadeau geven aan ouders zodat ze weet dat ze beschermd zijn
- **Wat ze niet wil:** ouders lastigvallen met installaties

### Persona C — Jan (62)
- Net gepensioneerd, technisch redelijk vaardig
- Helpt soms broer en zus en oude buren met digitale dingen
- Sceptisch over abonnementen
- **Wat hij wil:** zelf controleren, soms voor anderen
- **Wat hij niet wil:** afhankelijkheid van Amerikaanse Big Tech

---

## 3. Kernfunctie: De Scanner

### 3.1 Input-modaliteiten

**Primair: Screenshot/foto-upload**
- Drag & drop op desktop
- "Foto kiezen" knop op mobiel → bestandskiezer of camera
- Bestandstypen: PNG, JPG, JPEG, HEIC (iPhone), WebP
- Max grootte: 10 MB per upload
- Max 1 afbeelding per scan (in MVP — meerdere later)

**Secundair: Tekst plakken**
- Voor wie geen screenshot kan/wil maken
- Tekstveld, max 2.000 tekens
- Knop "Plak tekst in plaats van foto"

**EXIF-data wordt automatisch gestript** voor privacy (GPS-locatie, apparaat-info).

### 3.2 Verwerkingsstappen (gebruiker ziet alleen de loader)

1. **Upload** → naar Supabase Storage (tijdelijk, in EU-Frankfurt)
2. **Pre-check** → bestandsformaat valide, niet leeg, niet te groot
3. **Privacy-scrub** → EXIF-data weggehaald, bestandsnaam geanonimiseerd
4. **AI-analyse** → Mistral Pixtral Large bekijkt screenshot
5. **Verdict-formattering** → score (0-10), kleurcategorie, uitleg, leerlink
6. **Opslag in user-history** (alleen voor ingelogde gebruikers — geen ruwe foto, alleen samenvatting)
7. **Verwijdering** ruwe foto uit Storage (max 5 minuten na upload)
8. **Toon resultaat** aan gebruiker

Gehele flow: streefdoel onder 5 seconden.

### 3.3 Output (resultaat-scherm)

**Verdict-categorie** (groot, kleurgecodeerd):
- 🟢 **Veilig** (score 0-3) — Geen alarmsignalen
- 🟡 **Twijfelachtig** (score 4-6) — Wees voorzichtig
- 🔴 **Phishing/oplichting** (score 7-10) — Niet vertrouwen

**Veiligheidsscore** — gesegmenteerde meter, 0-10

**Uitleg in gewone taal** — max 3 zinnen:
> *Dit ziet eruit als de bekende "kleinkind-truc". De afzender doet zich voor als familielid via een nieuw nummer. Echte familieleden vragen zelden om geld via een nieuw nummer.*

**Gevonden waarschuwingssignalen** — bulletlist:
- ✗ Onbekend telefoonnummer
- ✗ Vraag om geld zonder voorafgaand contact
- ✗ Druktactiek (haast)

**Leeractie** (educatief component):
- Link: *"Leer meer over de kleinkind-truc →"* (naar relevant blog-artikel)
- "Heb je dit zelf herkend? 🎉" — beloningsknop voor gratification

**Vervolgactie**:
- "Blokkeer dit nummer" — instructies hoe (per platform: WhatsApp, sms)
- "Meld bij Fraudehelpdesk" — link naar fraudehelpdesk.nl
- "Scan nog een bericht" — herhaal de flow

### 3.4 Rate limiting & abonnementsregels

| User | Aantal scans/maand | Geschiedenis bewaard |
|---|---|---|
| Anoniem | 3 (op IP-basis) | Nee |
| Gratis-account | 5 | 30 dagen |
| Standaard | Onbeperkt | 1 jaar |
| Familie (Fase 2) | Onbeperkt per familielid | 1 jaar |

---

## 4. Authentication

### Registreren
- E-mail + wachtwoord (min 8 tekens)
- Of: Google login (snelste voor mantelzorgers)
- *Niet*: Facebook login (doelgroep onbetrouwbaar, Meta-privacy issues)
- Bevestigingse-mail via Brevo
- AVG: expliciet "Ik ga akkoord met AV en Privacyverklaring"-checkbox

### Inloggen
- E-mail + wachtwoord
- "Wachtwoord vergeten" → reset-link via Brevo
- Optioneel: magic link inlog (voor ouderen makkelijker — Fase 2)

### 2FA
- Niet in MVP. In Fase 2 voor familie-accounts (mantelzorger beveiligt account voor ouder).

### Wachtwoord-eisen
- Min 8 tekens
- Geen complexe eisen (gevaarlijk voor ouderen die het niet onthouden)
- Communicatie: *"Schrijf je wachtwoord ergens op. Dat is veiliger dan een te makkelijk wachtwoord."*

---

## 5. Dashboard (ingelogd)

### 5.1 Overzicht (`/dashboard`)
- Laatste 5 scans + verdict
- Statistiek: *"Je hebt deze maand X verdachte berichten herkend. Goed bezig!"*
- Snelle scan-knop
- Tip van de week (educatief)
- Familie-status (Fase 2): *"Moeder heeft 2 keer gescand deze week"*

### 5.2 Geschiedenis (`/dashboard/geschiedenis`)
- Lijst van alle eerdere scans
- Per scan: thumbnail (geblurred), datum, verdict, score
- Filter op verdict (alleen phishing, alleen veilig)
- Zoeken op datum
- Geen ruwe screenshot meer — alleen verdict + samenvatting

### 5.3 Leren (`/dashboard/leren`)
- Korte modules: *"Herken de kleinkind-truc"*, *"Bezorg-fraude"*, *"Bank-imitatie"*
- Per module: 3-5 lessen, 1 quiz, 1 badge
- Voortgang-tracking
- Sluit aan op blog-artikelen

### 5.4 Familie (`/dashboard/familie` — Fase 2)
- Familieleden uitnodigen via e-mail
- Mantelzorger-modus: meekijken in geschiedenis (met toestemming!)
- Notificatie-instellingen: *"Mij waarschuwen als familielid een phishing-bericht scant"*

### 5.5 Instellingen
- Profiel: naam, e-mail, taal
- Wachtwoord wijzigen
- Notificaties: e-mail aan/uit per type
- Account verwijderen (AVG-recht!)

### 5.6 Abonnement
- Huidig plan
- Volgende factuurdatum + bedrag
- Betaalmethode wijzigen (Mollie portal)
- Upgrade/downgrade
- Opzeggen (geen retentietruc — direct en eerlijk)

---

## 6. Marketing-pagina's

### 6.1 Homepage
- **Hero:** korte belofte + scanner-CTA. *"Verdacht WhatsAppje? Stuur ons een screenshot. We kijken even mee."*
- **Hoe het werkt:** 3 stappen (upload → analyse → uitleg)
- **Voor wie:** ouderen, mantelzorgers, families
- **Sociale proof:** echte reviews (geen verzonnen sterren-aantallen!)
- **Differentiatie:** vs zelf googelen, vs URL-scanners, vs niet weten
- **Educatief:** preview van veelvoorkomende oplichtingsberichten
- **Prijs-teaser:** *"Vanaf €4,99/maand"*
- **CTA-bottom:** *"Begin gratis, geen creditcard"*

### 6.2 Hoe het werkt
- Diepere uitleg met screenshots
- FAQ over privacy: *"Wat doen jullie met mijn berichten?"*
- Video (optioneel, Fase 2)

### 6.3 Voor wie
- Aparte sectie voor ouderen
- Aparte sectie voor mantelzorgers
- Use cases met concrete voorbeelden

### 6.4 Prijzen
- 3 kolommen: Gratis / Standaard / Familie
- Maandelijks/jaarlijks toggle (2 maanden korting op jaarlijks)
- Veelgestelde vragen onder pricing
- Geld-terug-garantie: 30 dagen
- *"Geen verbintenis. Opzeggen met één klik."*

### 6.5 Voorbeelden
- Galerij van veelgevangen oplichtingsberichten (anoniem!)
- Per voorbeeld: type fraude, waarom verdacht, hoe te herkennen
- Educatief en SEO-relevant
- **Belangrijk:** alleen geanonimiseerde voorbeelden gebruiken, met expliciete toestemming of zelf-bedacht

### 6.6 Blog
- Markdown-bestanden in repo
- Categorieën: WhatsApp-fraude, sms-fraude, e-mail-fraude, oplichtingstrucs uitgelegd
- Tags voor cross-linking
- RSS-feed, sitemap.xml
- Auteursvermelding + datum
- Comments: niet in MVP
- Share-knoppen: WhatsApp, e-mail, copy link

### 6.7 Contact
- Formulier: naam, e-mail, vraag, evt. screenshot toevoegen
- Belofte: *"We reageren binnen 1 werkdag."*
- E-mailadres `hulp@klopthet.nl` zichtbaar
- Verzending via Brevo, bevestigingsmail automatisch
- **Geen telefoonnummer in MVP**

---

## 7. Notificaties & e-mail

### Transactional (via Brevo)
- Welkom (na registratie)
- E-mailverificatie
- Wachtwoord reset
- Betalingsbevestiging
- Abonnement verlopen / verlengen
- Account verwijderd (AVG-bevestiging)

### Marketing (via Brevo, opt-in)
- Wekelijkse nieuwsbrief: nieuw gevangen fraude, tip van de week
- Maandelijkse rapportage voor abonnees: *"Jij hebt deze maand X scans gedaan, Y waarschuwingen ontvangen"*
- Speciale alerts: *"Nieuwe oplichtingsgolf actief, hier herken je 'm"*

---

## 8. Educatieve component (USP!)

Dit is het hoofdonderscheid met Checkjelinkje en moet door alle interactie verweven zijn.

### Bij elke scan
- Korte uitleg waaróm dit verdacht/veilig is
- Link naar uitgebreidere uitleg op blog of in leermodule

### In het dashboard
- Aparte leermodule met progressieve lessen
- Badges bij voltooiing: *"Phishing-detective", "Familie-beschermer"*
- Quizzes om kennis te testen

### In nieuwsbrief
- *"Wist je dat…"* secties met fraude-feiten
- *"Test jezelf"* mini-quizzes
- Zelf gevangen voorbeelden uit gemeenschap

### Op blog
- Diepe artikelen per oplichtingstype
- Casestudies van echte slachtoffers (geanonimiseerd, met toestemming)
- "Wat te doen na oplichting" — herstel-gids

---

## 9. Pricing-tiers (detail)

| Feature | Gratis | Standaard | Familie (F2) |
|---|---|---|---|
| Scans per maand | 5 | Onbeperkt | Onbeperkt per persoon |
| Geschiedenis | 30 dagen | 1 jaar | 1 jaar |
| Educatieve module | Beperkt | Volledig | Volledig |
| Familieleden | 1 | 1 | 5 |
| Mantelzorger-toegang | — | — | ✓ |
| Notificaties (e-mail) | ✓ | ✓ | ✓ |
| Notificaties (WhatsApp) | — | ✓ | ✓ |
| Prioriteit-support | — | — | ✓ |
| **Prijs/maand** | **€0** | **€4,99** | **€9,99** |
| **Prijs/jaar** | — | **€49** (2 mnd korting) | **€99** (2 mnd korting) |

### Cadeau-modus (Fase 2)
- Mantelzorger koopt abonnement voor ouder
- Activatie via cadeau-code (per post of e-mail)
- Eerste 30 dagen door koper betaald, daarna eigen verantwoordelijkheid

---

## 10. Wat NIET in MVP zit

Belangrijk om scope-creep te voorkomen:

- ❌ Familie-account / mantelzorger-dashboard (Fase 2)
- ❌ Mobile app (alleen PWA-website)
- ❌ Voice scanning of telefoongesprek-analyse
- ❌ Browser extensie
- ❌ Live chat support
- ❌ B2B portal
- ❌ Slack/Teams integratie
- ❌ API voor derden
- ❌ Affiliate-programma
- ❌ Comments op blog
- ❌ Forum/community
- ❌ Echte beoordelingen door menselijke experts
- ❌ Notificaties via WhatsApp/SMS (komt in Standaard later, niet in MVP)

---

## 11. Design-richtlijnen (samenvatting — zie technical-spec voor detail)

### Toon
- **"Jij"** consistent overal
- Warm, helder, geen jargon
- "Wij kijken mee" (samen, niet alleen)
- Erken twijfel als normaal: *"Twijfelen is slim."*

### Visueel (op basis van huidige Claude Design + aanpassingen)
- **Groen-cream paletten** behouden — herkenbare merkkleur
- **Maar:** lichter alternatief overwegen voor leesbaarheid 70+ (donker thema standaard is mogelijk te zwaar voor doelgroep)
- **Italic-gebruik beperken** (slecht leesbaar voor doelgroep)
- **Min fontgrootte body: 16px**, voorkeur 17-18px
- **Contrast minimaal WCAG AA**, voorkeur AAA voor primaire content
- **Maximaal 2 lettertype-families** (nu 5 — schrappen)
- **Geen hover-only interacties** (touch + ouderen)
- **`prefers-reduced-motion` respecteren** — geen automatische animaties als systeem dat aangeeft
- **Tweak-panel verwijderen** voor productie

### Accessibility
- Skip-links bovenaan
- Aria-labels op alle iconen
- Focus states overal zichtbaar
- Keyboard-navigatie volledig werkend
- Screen reader getest (NVDA, VoiceOver)
- **Doel: WCAG 2.1 AA voor alles, AAA voor scanner-flow**
