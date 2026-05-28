# Toria's Hub — CMS-driven website

This is the CMS version of the Toria's Hub site. Content lives in **Sanity** (a hosted headless CMS) and is rendered by **Astro** (a static site generator). Editors edit content through Sanity Studio; the site rebuilds automatically.

```
torias-hub/
├── studio/            ← Sanity Studio (the editor UI for non-technical staff)
├── web/               ← Astro frontend (the public website)
├── assets/            ← Original images (used by the seed script)
├── css/, js/          ← Original static-site source (no longer rendered — kept for reference)
├── *.html             ← Original static pages (no longer rendered — kept for reference)
└── README.md          ← You are here
```

> The old `*.html` files at the project root are kept as the design reference. The live site is now generated from `web/`.

---

## One-time setup

You need:
- **Node.js 20+** (check with `node --version` — if missing, install from https://nodejs.org)
- A free **Sanity account** at https://www.sanity.io/signup

### 1. Create your Sanity project

1. Go to https://www.sanity.io/manage and sign in.
2. Click **Create new project**. Give it a name (e.g. "Toria's Hub"), pick the free plan, and use the default dataset name `production`.
3. After it's created, copy the **Project ID** shown at the top of the project page (looks like `abc12345`).
4. Generate a write token: in the same project, go to **API → Tokens → Add API token**. Name it "Seed script", give it **Editor** permissions, and copy the token. Save it somewhere safe — you can't see it again.

### 2. Configure the Studio

```bash
cd studio
cp .env.example .env
# Open .env and paste your Project ID and the token.
npm install
```

### 3. Push the existing content into Sanity

```bash
# Still inside studio/
npm run seed
```

This uploads every image and creates content for every page. It only needs to run once.

### 4. Open the Studio to edit content

```bash
# Still inside studio/
npm run dev
```

Open http://localhost:3333 in your browser. You'll see every page listed in the sidebar. Click into "Home Page", change a heading, click **Publish**. That's the editor experience.

### 5. Configure the website

```bash
cd ../web
cp .env.example .env
# Open .env and paste the same Project ID (token NOT needed here).
npm install
```

### 6. Run the website locally

```bash
# Inside web/
npm run dev
```

Open http://localhost:4321. The site loads content from Sanity. Edit something in the Studio, refresh the website tab, and you'll see the change.

---

## Day-to-day editing

Once setup is done, the only thing editors need is the Studio.

**Local editing:**
```bash
cd studio && npm run dev
```

**Or — deploy the Studio so it's always online (recommended):**
```bash
cd studio && npx sanity deploy
```
Pick a hostname like `toriashub` and the Studio will live at `https://toriashub.sanity.studio`. Editors visit that URL, sign in with Google or email, and edit. No terminal required.

---

## Deploying the public website

The website is a normal static site. The easiest path is **Netlify**:

1. Push this repo to GitHub.
2. Sign up at https://app.netlify.com.
3. Click **Add new site → Import an existing project** and pick the repo.
4. Set **base directory** to `web`, **build command** to `npm run build`, and **publish directory** to `web/dist`.
5. Under **Site settings → Environment variables**, add:
   - `PUBLIC_SANITY_PROJECT_ID` = your project ID
   - `PUBLIC_SANITY_DATASET` = `production`
6. Deploy.

To make edits go live automatically when an editor publishes in Sanity, add a Sanity webhook pointing at Netlify's "Build hook" URL (Site settings → Build & deploy → Build hooks). Now: editor publishes → Netlify rebuilds → site updates in ~30 seconds.

---

## What's in Sanity Studio

Editors will see seven documents in the sidebar:

| Document | What lives there |
|---|---|
| Site Settings | Logo, nav, footer, social links, contact info |
| Home Page | Hero, stats, mission, programs cards, ecosystem, stories highlight, CTA, modal |
| About Page | Story, mission/vision/values, timeline, team, stats |
| Programs Page | Hero, overview pills, each program section, pathway diagram |
| Stories Page | Featured story, filters, story cards, newsletter |
| Contact Page | Methods, form fields, sidebar, FAQ |
| Get Involved Page | Ways to help, donate tiers, partner, mentor/volunteer, stats |

Within each, fields are grouped (Hero / Stats / Mission / etc.) so editors don't have to scroll endlessly.

---

## Common tasks

**Add a new team member** → Sanity Studio → About Page → Team → "+ Add item"

**Change the phone number everywhere** → Sanity Studio → Site Settings → Contact

**Swap a hero image** → Open the relevant page → Hero section → Click the image to upload a new one

**Add a story** → Stories Page → Story cards → "+ Add item"

**Change a button label** → Find the relevant section, edit the button field

---

## Troubleshooting

- **Site shows the old static content** → That's the inline fallback. Make sure `web/.env` has the right `PUBLIC_SANITY_PROJECT_ID` and that you've run the seed. Restart `npm run dev`.
- **Seed fails with "Insufficient permissions"** → Token doesn't have write access. Regenerate a token with **Editor** role.
- **Images look broken** → Re-run `npm run seed` in studio/. Check the `assets/` folder exists at the project root.
- **Studio won't start** → Run `npm install` again. If still broken, delete `node_modules` and `package-lock.json` and reinstall.

---

## Tech notes (for future devs)

- Astro 4 (`web/`) — static-site generator, fetches Sanity at build time.
- Sanity v3 (`studio/`) — content schemas in `studio/schemaTypes/`.
- All content is modeled as **singletons** (one document per page), with structured arrays for repeating items.
- The Astro pages fall back to inline defaults if Sanity is empty — the site never breaks just because content is missing.
- Original static HTML, CSS, and JS live untouched at the project root for reference.
