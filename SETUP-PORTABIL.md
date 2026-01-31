# Setup Portabil - XEH.ro

> **Acest fișier conține instrucțiunile pentru a continua lucrul la proiect de pe orice calculator.**
> **Ultima actualizare:** 2026-01-31

---

## Informații Proiect

| Element | Valoare |
|---------|---------|
| **Nume Proiect** | XEH.ro (eXpert Echipamente Horeca) |
| **Locație pe SSD** | `/Volumes/SSD1TB800/SITEURI Warp/HEXro` |
| **Site Live** | https://www.xeh.ro |
| **Repository** | github.com/liviudrinceanu-cpu/xeh-ro.git |
| **Tech Stack** | Next.js 14, TypeScript, Tailwind, Supabase |

---

## Cerințe Calculator Nou

Asigură-te că ai instalat:

1. **Node.js** (v18 sau mai nou)
   ```bash
   node --version  # verifică versiunea
   ```

2. **Git**
   ```bash
   git --version
   ```

3. **Claude Code** (CLI Anthropic)
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

4. **Vercel CLI** (pentru deploy)
   ```bash
   npm install -g vercel
   ```

---

## Pași Setup (Prima Dată pe Calculator Nou)

### Pas 1: Conectează SSD-ul extern
Conectează SSD-ul USB și așteaptă să fie montat.

### Pas 2: Deschide Terminal și navighează la proiect
```bash
cd "/Volumes/SSD1TB800/SITEURI Warp/HEXro"
```

### Pas 3: Instalează dependencies
```bash
npm install
```
> Durează ~2-5 minute. Ignoră warning-urile despre deprecated packages.

### Pas 4: Configurează Git (important!)
```bash
git config core.fileMode false
```
> Previne false positives de la diferențele de permisiuni între filesystems.

### Pas 5: Curăță fișierele macOS metadata (dacă apar)
```bash
find . -name "._*" -type f -delete
find . -name ".DS_Store" -delete
```

### Pas 6: (Opțional) Creează symlink pentru acces rapid
```bash
ln -s "/Volumes/SSD1TB800/SITEURI Warp/HEXro" ~/HEXro
```
> Permite accesul prin `cd ~/HEXro`

### Pas 7: Autentifică-te la Vercel (dacă e necesar)
```bash
vercel login
```

---

## Pornire Sesiune de Lucru (De Fiecare Dată)

### Varianta Rapidă (copy-paste)
```bash
cd "/Volumes/SSD1TB800/SITEURI Warp/HEXro" && claude
```

### Varianta Detaliată
```bash
# 1. Navighează la proiect
cd "/Volumes/SSD1TB800/SITEURI Warp/HEXro"

# 2. Verifică starea git (opțional)
git status

# 3. Pornește Claude Code
claude
```

---

## Comenzi Frecvente

| Comandă | Descriere |
|---------|-----------|
| `npm run dev` | Pornește serverul local (http://localhost:3000) |
| `npm run build` | Verifică build-ul pentru erori |
| `vercel --prod --yes` | Deploy pe producție |
| `git status` | Vezi modificările |
| `git pull` | Actualizează codul de pe GitHub |
| `git add . && git commit -m "mesaj"` | Commit modificări |
| `git push` | Push pe GitHub |

---

## Structura Fișierelor Importante

```
HEXro/
├── CLAUDE.md              # Context complet proiect (Claude citește automat)
├── SETUP-PORTABIL.md      # Acest fișier
├── .env.local             # Credențiale (Supabase, Resend, etc.)
├── .env.vercel            # Credențiale Vercel
├── package.json           # Dependencies
├── app/                   # Pagini Next.js
├── components/            # Componente React
├── lib/                   # Utilities, queries, email
└── docs/                  # Documentație și SQL migrations
```

---

## Credențiale și Acces

### Admin Panel
- **URL:** https://www.xeh.ro/admin
- **Email:** liviu.drinceanu@infinitrade-romania.ro
- **Parola:** XehAdmin2026!

### Supabase
- Credențialele sunt în `.env.local`
- Dashboard: https://supabase.com/dashboard

### Vercel
- Proiect: xeh-ro (team: xpertlivius-projects)
- Dashboard: https://vercel.com/xpertlivius-projects/xeh-ro

### Email Contact
- secretariat@infinitrade-romania.ro

---

## Troubleshooting

### Problema: Multe fișiere apar ca "modified" în git status
```bash
git config core.fileMode false
git checkout -- .
```

### Problema: Fișiere ._* sau .DS_Store apar
```bash
find . -name "._*" -type f -delete
find . -name ".DS_Store" -delete
```

### Problema: npm install eșuează
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: Build eșuează
```bash
rm -rf .next
npm run build
```

### Problema: Vercel nu recunoaște proiectul
```bash
vercel link
# Selectează: xpertlivius-projects / xeh-ro
```

---

## Context pentru Claude

> **IMPORTANT:** Claude Code citește automat `CLAUDE.md` din rădăcina proiectului.
> Acest fișier conține tot contextul: features implementate, decizii tehnice,
> fișiere cheie, și status-ul curent al proiectului.

Când pornești Claude Code în acest folder, el va ști automat:
- Ce tehnologii folosim
- Ce features sunt implementate
- Unde sunt fișierele importante
- Care e statusul curent
- Cum să facă deploy

**Nu trebuie să-i explici contextul de fiecare dată!**

---

## Checklist Verificare După Setup

- [ ] `npm run dev` pornește fără erori
- [ ] http://localhost:3000 se încarcă
- [ ] `git status` arată "working tree clean" (sau doar modificări reale)
- [ ] `claude` pornește și citește CLAUDE.md
- [ ] `vercel --prod --yes` funcționează (deploy test)

---

## Contact & Support

- **Telefon:** 0724 256 250
- **Email:** secretariat@infinitrade-romania.ro
- **Site:** https://www.xeh.ro

---

*Creat: 2026-01-31 | Proiect mutat pe SSD extern pentru portabilitate*
