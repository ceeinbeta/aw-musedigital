# MUSE DIGITAL

Lifestyle magazine, Amazon.es affiliate shopping edit and creative studio.

- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS
- **Hosting and backend:** Firebase (App Hosting, Firestore)
- **Content:** Sanity, edited at `/studio`
- **Deploying:** see [DEPLOYMENT.md](DEPLOYMENT.md)
- **Language:** English

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

| Path | Purpose |
|---|---|
| `src/lib/site.ts` | Brand name, navigation, contact and legal details, affiliate settings |
| `src/app/globals.css` | Colour palette and typography scale |
| `src/lib/affiliate/links.ts` | The single place Amazon links are built |
| `src/lib/consent/config.ts` | Cookie consent categories |
| `src/sanity/schemas/` | Content types editable in the Studio |
| `src/app/` | Pages and layouts |
| `apphosting.yaml` | Firebase App Hosting runtime settings |
| `.env.example` | Environment variables to copy into `.env.local` |
