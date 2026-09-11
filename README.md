# Atlas — the public website

Everything in this folder is the website. Static files, no build step, no
dependencies, nothing to install. Drop it on GitHub Pages and it is live.

```
index.html        the whole app (map, lessons, quizzes) in one file
manifest.json     makes it installable on a phone
sw.js             service worker — caches everything for offline use
privacy.html      privacy policy      <- App Store needs this URL
support.html      support page        <- App Store needs this URL
shared.css        styling for those two pages
404.html          styled not-found page
robots.txt        lets search engines index it
sitemap.xml       replace SITE_URL once you know your address
icon-*.png        app icons, home-screen icons, link previews
.nojekyll         tells GitHub to serve the files as-is
```

---

## Putting it live — no command line needed

**1. Get a GitHub account.** github.com/signup, free.

**2. Make a new repository.** github.com/new
   - Name it **`atlas`**
   - Set it to **Public** — GitHub Pages only works on public repos with a free
     account; private repos need a paid plan
   - Do **not** tick "Add a README file"
   - Create repository

**3. Upload the files.** On the empty repo page click
   **uploading an existing file**, then drag in the **contents** of this
   folder — all the files, not the folder itself.

   > macOS hides dotfiles, so `.nojekyll` will not be draggable until you press
   > **⌘ + Shift + .** in Finder to reveal it. The site still works without it,
   > but include it if you can.

   Then click **Commit changes**.

**4. Turn Pages on.** In the repo: **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Save

**5. Wait about a minute.** Your site is at:

   ```
   https://YOUR-USERNAME.github.io/atlas/
   ```

   That address is public. Anyone with the link can use it, on any device, and
   their progress saves in their own browser.

> Want the shorter `https://YOUR-USERNAME.github.io/` with no `/atlas` on the
> end? Name the repository `YOUR-USERNAME.github.io` instead, exactly matching
> your username. Everything else is identical.

---

## If you'd rather use the command line

```bash
cd "path/to/atlas-site"
git init -b main
git add -A
git commit -m "Atlas"
git remote add origin https://github.com/YOUR-USERNAME/atlas.git
git push -u origin main
```

Then do step 4 above.

---

## Three things to do once it's live

**1. Point the App Store at your own URLs.** In
`store/APP_STORE_CONNECT.md`, replace the claude.ai links with:

```
Privacy Policy URL   https://YOUR-USERNAME.github.io/atlas/privacy.html
Support URL          https://YOUR-USERNAME.github.io/atlas/support.html
Marketing URL        https://YOUR-USERNAME.github.io/atlas/
```

Apple's reviewer must be able to open the privacy and support pages without
signing in. A GitHub Pages site on a public repo satisfies that; the claude.ai
versions do not unless you share them.

**2. Fix two placeholders.** In `sitemap.xml`, replace `SITE_URL` with your
address. In `index.html`, find `<meta property="og:image" content="icon-1024.png">`
and make it the full URL — link previews in iMessage and Slack need an absolute
one.

**3. Try installing it.** Open the site on your phone → Share → Add to Home
Screen. It runs full screen with no browser bars and works with no signal.

---

## Updating it later

Replace `index.html` with the new build, then **open `sw.js` and change the
version string**:

```js
const VERSION = 'atlas-v1.0.0';   // -> 'atlas-v1.0.1'
```

Skip that and browsers keep serving the cached old copy. Commit both files and
the change is live in about a minute.

---

## A custom domain, if you ever want one

Buy a domain (~$10–12/year — Cloudflare Registrar sells at cost). Then in
**Settings → Pages → Custom domain**, enter it, and at your registrar add:

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `YOUR-USERNAME.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Tick **Enforce HTTPS** once the certificate is issued. Nothing in these files
has to change — every path in the site is relative.
