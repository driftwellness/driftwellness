# 🌐 Slik Setter Du Opp Eget Domene for Drift

## Steg 1: Kjøp Domene

### Anbefalte Domene-Registrarer (Norge)
1. **Domeneshop.no** (Norsk, enkel, god support)
   - Pris: ~150 kr/år for .no
   - Link: https://www.domeneshop.no
   
2. **Namecheap.com** (Billigere for .com)
   - Pris: ~$10/år for .com
   - Link: https://www.namecheap.com

3. **GoDaddy.com** (Populær, men litt dyrere)
   - Pris: ~$15/år
   - Link: https://www.godaddy.com

### Domene-Forslag for Drift
- ✅ **driftapp.no** (anbefalt!)
- ✅ **drift.no** (hvis ledig)
- ✅ **driftapp.com**
- ✅ **getdrift.no**
- ✅ **mydrift.no**

**Sjekk tilgjengelighet:**
- Gå til domeneshop.no
- Søk etter "driftapp.no"
- Hvis ledig, kjøp det!

---

## Steg 2: Koble Domene til Manus

### I Manus Dashboard:

1. **Åpne Management UI** (høyre side av skjermen)
2. Klikk på **"Settings"** (tannhjul-ikon)
3. Velg **"Domains"** i sidemenyen
4. Klikk **"Add Custom Domain"**
5. Skriv inn ditt domene (f.eks. `driftapp.no`)
6. Du får nå DNS-instruksjoner

### I Domeneshop (eller din registrar):

1. Logg inn på domeneshop.no
2. Gå til **"Mine domener"**
3. Velg **driftapp.no**
4. Klikk **"DNS-innstillinger"**
5. Legg til DNS-records fra Manus:

**Eksempel (verdiene får du fra Manus):**
```
Type: CNAME
Host: @
Verdi: [verdi fra Manus]
TTL: 3600
```

6. Klikk **"Lagre"**

### Vent på DNS-propagering
- Tar vanligvis 5-30 minutter
- Kan ta opptil 24 timer
- Sjekk status i Manus Dashboard

---

## Steg 3: Aktiver HTTPS (SSL)

Manus aktiverer automatisk gratis SSL-sertifikat fra Let's Encrypt når domenet er koblet til!

✅ **Din nettside vil være tilgjengelig på:**
- https://driftapp.no
- https://www.driftapp.no

---

## Steg 4: Oppdater App-Innstillinger

Når domenet er aktivt, oppdater:

1. **Google/Apple OAuth redirect URLs**
   - Legg til `https://driftapp.no/api/auth/callback`

2. **Stripe webhook URL**
   - Oppdater til `https://driftapp.no/api/webhooks/stripe`

3. **Social media links**
   - Oppdater alle lenker til nytt domene

---

## 💰 Kostnader

| Tjeneste | Pris | Frekvens |
|----------|------|----------|
| Domene (.no) | 150 kr | Per år |
| Domene (.com) | $10-15 | Per år |
| SSL-sertifikat | GRATIS | (via Manus) |
| Hosting | Inkludert | (via Manus) |

**Total årlig kostnad: ~150 kr** 🎉

---

## 🚀 Alternativ: Bruk Gratis Manus-Domene

Hvis du ikke vil kjøpe domene ennå, kan du bruke det gratis Manus-domenet:

**I Management UI → Settings → Domains:**
- Endre prefix fra `i34wcp9tt9eebujn5k3fg` til noe mer lesbart
- F.eks: `drift.manus.space` eller `driftapp.manus.space`

Dette er gratis og fungerer umiddelbart! ✨

---

## 📞 Trenger Hjelp?

- **Domeneshop support:** support@domeneshop.no
- **Manus support:** https://help.manus.im
- **Meg:** Spør meg hvis noe er uklart! 😊

---

## ✅ Sjekkliste

- [ ] Kjøp domene (driftapp.no)
- [ ] Koble domene i Manus Dashboard
- [ ] Legg til DNS-records hos registrar
- [ ] Vent på DNS-propagering (5-30 min)
- [ ] Verifiser at https://driftapp.no fungerer
- [ ] Oppdater OAuth og Stripe URLs
- [ ] Oppdater social media lenker
- [ ] Feire! 🎉

---

**Pro Tips:**
- Kjøp domenet for 5-10 år (ofte rabatt!)
- Aktiver "auto-renew" så du ikke mister domenet
- Kjøp også .com-versjonen for å beskytte merkevaren
- Sett opp e-post forwarding (f.eks. hello@driftapp.no → din Gmail)
