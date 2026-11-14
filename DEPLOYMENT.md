# Deploying MUSE DIGITAL

The site runs on **Firebase App Hosting** (server-rendered Next.js), stores form
submissions in **Firestore**, takes editorial content from **Sanity**, and sends
email through **Resend**. Every push to the `main` branch on GitHub rebuilds and
redeploys the site automatically.

Work through the sections in order. Nothing here can be done without your own
accounts, so each step says what you need to create.

**Already set up**

| What | Value |
|---|---|
| Firebase project ID | `aw---muse-digital` (linked in `.firebaserc`) |
| GitHub repository | `ceeinbeta/aw-musedigital` (currently public) |

> **Important:** this site needs Firebase **App Hosting**, not the classic
> **Hosting** product. In the Firebase console they are separate menu items
> under **Build**. Classic Hosting serves static files only and cannot run this
> site's server features (forms, the CMS, the sitemap).

---

## 1. Check the build on your computer

The build could not be run inside Claude's sandbox, so run it once yourself,
from inside the `muse-digital` folder:

```bash
npm install
npm run build
```

It should finish with a list of routes and no errors. If it fails, send the
error output back to Claude.

## 2. Put the code on GitHub

App Hosting deploys from GitHub. An earlier, interrupted setup step left a
broken `.git` folder in the project, so start fresh. Run these one at a time
from your own terminal:

```bash
cd "/Users/cileneveloria/Documents/Affiliate Website/muse-digital"
```

```bash
rm -rf .git
```

```bash
git init -b main
```

```bash
git add .
```

```bash
git commit -m "MUSE DIGITAL website"
```

```bash
git remote add origin https://github.com/ceeinbeta/aw-musedigital.git
```

```bash
git push --force -u origin main
```

`--force` is needed because the repository already contains a starter commit
with only a `README.md`, created by GitHub. It replaces that single file with
the full project, whose own README is more complete. Use `--force` only for
this first push.

`.env.local` and the `.data` folder are excluded by `.gitignore`, so no secrets
or test submissions are uploaded.

The repository is currently **public**, so anyone can read the code. It
contains no passwords or keys, so this is safe, but you can make it private
under **Settings → General → Danger Zone** on GitHub; App Hosting works with
either.

## 3. Firebase project

1. The project `aw---muse-digital` already exists.
2. Upgrade it to the **Blaze (pay as you go)** plan. App Hosting requires it.
   Set a budget alert in Google Cloud Billing so costs can never surprise you.
3. Create a **Firestore** database in **production mode**, in a European
   location (for example `eur3` or `europe-southwest1`, Madrid), so personal
   data stays in the EU.
4. Deploy the security rules, which block all direct browser access to the
   database. The Firebase command-line tool is already installed on this Mac,
   and the project is already linked:

```bash
firebase login
```

```bash
firebase deploy --only firestore:rules
```

## 4. Sanity (editorial content)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) and note
   its **project ID**.
2. Under **API → CORS origins**, add your live domain and
   `http://localhost:3000`, both with **Allow credentials** ticked.
3. Under **API → Webhooks**, create a webhook:
   - URL: `https://your-domain/api/revalidate`
   - Trigger on: create, update, delete
   - Secret: a long random string. Keep it; it is `SANITY_REVALIDATE_SECRET` below.

Editors sign in at `https://your-domain/studio`.

## 5. Resend (email)

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your sending domain (it gives you DNS records to add).
3. Create an API key. It is `RESEND_API_KEY` below. Never paste it into chat or
   commit it to GitHub.

## 6. Create the App Hosting backend

1. In the Firebase console, open **App Hosting → Get started**.
2. Connect your GitHub account and choose `ceeinbeta/aw-musedigital` and the
   `main` branch.
3. Choose a European region.
4. Set the app's root directory to the repository root.

Then store the two secrets in Google Cloud Secret Manager:

```bash
firebase apphosting:secrets:set RESEND_API_KEY
```

```bash
firebase apphosting:secrets:set SANITY_REVALIDATE_SECRET
```

Open `apphosting.yaml`, uncomment the `env:` block, fill in the real values
and commit the change. Pushing it triggers a new build.

## 7. Your domain

In **App Hosting → your backend → Settings → Domains**, add your domain and
create the DNS records Firebase shows you. HTTPS is set up automatically.

Make sure `NEXT_PUBLIC_SITE_URL` in `apphosting.yaml` matches this domain
exactly: sitemap, canonical links and share images are all built from it.

---

## Launch checklist

Before telling anyone about the site:

- [ ] Legal details filled in under `legal` in `src/lib/site.ts`
- [ ] All four legal pages reviewed by a lawyer, and the "draft template" notice
      removed from `src/components/legal/legal-page.tsx`
- [ ] No highlighted `[… to be supplied]` placeholders left on any legal page
- [ ] Brand tagline, homepage copy and About story replaced with your own words
- [ ] Placeholder articles, products and collections replaced through `/studio`
- [ ] Real photographs uploaded (your own or properly licensed; never copied from Amazon)
- [ ] Amazon Associates tag set, and the live site URL added to your Associates account
- [ ] Contact email and social profile links added in `src/lib/site.ts`
- [ ] Test enquiry sent from each service page and received in your inbox
- [ ] Test newsletter sign-up confirmed by email, then unsubscribed
- [ ] Sitemap submitted in [Google Search Console](https://search.google.com/search-console):
      `https://your-domain/sitemap.xml`

## After launch

- Amazon requires at least three qualifying sales within 180 days of joining the
  Associates programme, or the account is closed. Plan your first content
  accordingly.
- Enquiries and newsletter subscribers can be viewed and exported in the
  Firebase console under **Firestore**.
- To add analytics, set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. The cookie banner
  appears automatically, and the Cookie Policy lists the new cookies.
