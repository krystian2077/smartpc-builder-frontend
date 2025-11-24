# 🚀 Jak uruchomić frontend

## Krok 1: Przejdź do katalogu frontendu
```bash
cd smartpc-builder-frontend
```

## Krok 2: Zainstaluj zależności
```bash
npm install
```

## Krok 3: Uruchom serwer deweloperski
```bash
npm run dev
```

## ✅ Gotowe!

Frontend będzie dostępny pod adresem:
- **Aplikacja:** http://localhost:3000

---

## 🔧 Opcjonalna konfiguracja (.env.local)

Możesz utworzyć plik `.env.local` w katalogu `smartpc-builder-frontend` jeśli backend działa na innym porcie:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

**Uwaga:** Domyślnie frontend łączy się z `http://localhost:8000/api/v1` (backend).

---

## 📋 Dostępne komendy

- `npm run dev` - Uruchom serwer deweloperski (hot reload)
- `npm run build` - Zbuduj aplikację do produkcji
- `npm run start` - Uruchom zbudowaną aplikację
- `npm run lint` - Sprawdź kod pod kątem błędów

---

## 🐛 Rozwiązywanie problemów

**Problem:** `npm: command not found`
**Rozwiązanie:** Zainstaluj Node.js z https://nodejs.org/ (wersja 18+)

**Problem:** Błędy podczas `npm install`
**Rozwiązanie:** 
```bash
# Wyczyść cache i zainstaluj ponownie
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Frontend nie łączy się z backendem
**Rozwiązanie:** 
1. Upewnij się, że backend działa na http://localhost:8000
2. Sprawdź czy endpoint `/api/v1/health` odpowiada
3. Sprawdź konfigurację CORS w backendzie

---

## ⚠️ Ważne

**Przed uruchomieniem frontendu upewnij się, że:**
1. ✅ Backend jest uruchomiony i działa na porcie 8000
2. ✅ Node.js i npm są zainstalowane
3. ✅ Wszystkie zależności są zainstalowane (`npm install`)

