# Frontend Environment Variables Configuration

## Required Environment Variables

### API Backend URL
Variable name: `NEXT_PUBLIC_API_BASE_URL`

**Local development:**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

**Production (after deploying to Vercel):**
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-name.onrender.com/api/v1
```

Replace `your-backend-name` with your actual Render backend URL.

---

## How to set up:

### Local Development
1. Create a `.env.local` file in the root directory
2. Add the above variables

### Vercel Production
Set environment variables in:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `NEXT_PUBLIC_API_BASE_URL` with your Render backend URL
