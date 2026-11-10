# Anshika Gupta — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy
```bash
npm run build      # static export → ./out
```
- **Vercel:** import the repo (zero config). Set `NEXT_PUBLIC_SITE_URL=https://your-domain` for canonical URL, sitemap and Open Graph.
- **Netlify / GitHub Pages / S3:** upload the `out/` folder.

## Editing content
All text lives in **`src/data/profile.ts`**.
- Add `github: "https://github.com/AnshikaGupta-ai/<repo>"` to a project to link its repo (otherwise it links to the GitHub profile).
- Add `live: "https://..."` (e.g. a Streamlit Cloud URL) to show a **Live demo** button.
- When you land an internship, edit the "Next" card in `src/components/Education.tsx` (or add an experience entry).
- Replace `public/Anshika_Gupta_Resume.pdf` to update the downloadable resume.
- Project visuals and the hero Text-to-SQL demo are code-drawn illustrations with sample data; swap in real screenshots when available.
