# Hassan Ahmed — Portfolio Website

A modern, professional portfolio for Data Scientists and Analysts. Features live GitHub API integration, dark/light mode, animated skill bars, working contact form, and full SEO support.

**Live Demo:** [https://hassan-portfolio.vercel.app](https://hassan-portfolio.vercel.app)

---

## Features

- **Live GitHub Projects** — Fetches your repos automatically via GitHub API (stars, forks, languages, descriptions)
- **Dark / Light Mode** — Remembers user preference in localStorage
- **Typewriter Animation** — Cycles through your roles on the hero section
- **Animated Skill Bars** — Triggered on scroll with smooth fill animation
- **Scroll Counter** — Stats animate up when they enter the viewport
- **Skills Filter** — Filter by Data, ML, Tools, Cloud
- **Project Filter** — Filter live GitHub projects by language
- **Working Contact Form** — Powered by Formspree (free, no backend needed)
- **SEO Optimized** — Meta tags, Open Graph, Twitter Card, Schema.org JSON-LD
- **Responsive** — Works on mobile, tablet, and desktop
- **Performance** — Cached assets, lazy loading, minimal dependencies

---

## Project Structure

```
hassan-portfolio/
├── index.html          # Main HTML file (all sections)
├── css/
│   └── style.css       # All styles (dark/light theme, responsive)
├── js/
│   └── main.js         # All JavaScript (GitHub API, animations, form)
├── images/
│   ├── about-me.jpg    # Your profile photo (replace this!)
│   └── og-image.png    # Social share image (1200×630px)
├── vercel.json         # Vercel deployment config
├── .gitignore
└── README.md
```

---

## Quick Start

### 1. Clone / Download

```bash
git clone https://github.com/Hassan141998/portfolio.git
cd portfolio
```

Or just extract the ZIP file you downloaded.

### 2. Personalize Your Info

Open `js/main.js` and update the config at the top:

```js
const CONFIG = {
  githubUsername: 'Hassan141998',     // ← Your GitHub username
  formspreeId: 'YOUR_FORMSPREE_ID',   // ← Get from formspree.io (free)
  typingTexts: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'BI Developer'],
};
```

Open `index.html` and update these sections:

| Section | What to update |
|---|---|
| `<title>` | Your name |
| `og:image` URL | Your deployed domain |
| About section | Name, address, role |
| Contact section | Email, phone, social links |
| CV download links | Replace `YOUR_CV_LINK_HERE` with your Google Drive PDF link |
| Certifications | Add your real cert names and links |
| Social links | Twitter handle, YouTube channel |

### 3. Add Your Photo

Replace `images/about-me.jpg` with your own photo.
- Recommended size: **400×500px** or larger portrait
- Name it exactly `about-me.jpg` (or update the `src` in index.html)

### 4. Add Your CV

1. Upload your CV PDF to Google Drive
2. Right-click → Share → Anyone with the link → Viewer
3. Copy the link, change the URL to direct download:
   - From: `https://drive.google.com/file/d/FILE_ID/view`
   - To: `https://drive.google.com/uc?export=download&id=FILE_ID`
4. Replace `YOUR_CV_LINK_HERE` in `index.html` (appears twice)

### 5. Set Up Contact Form (Free)

1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Click **New Form** → Name it (e.g. "Portfolio Contact")
3. Copy your Form ID (looks like `xyzabcde`)
4. Paste it in `js/main.js`:
   ```js
   formspreeId: 'xyzabcde',
   ```
5. Verify your email when Formspree sends a confirmation

### 6. Test Locally

No build tools needed — just open `index.html` in a browser, or use VS Code Live Server:
```bash
# If you have VS Code Live Server extension:
# Right-click index.html → Open with Live Server
```

---

## Deploy on Vercel (Free)

Vercel gives you a fast global CDN, free SSL, and automatic redeploys on every `git push`.

### Method A: Deploy from GitHub (Recommended)

**Step 1 — Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/Hassan141998/portfolio.git
git push -u origin main
```

**Step 2 — Connect Vercel:**
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New → Project**
3. Import your `portfolio` repository
4. Settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave default)
   - **Build Command:** _(leave empty)_
   - **Output Directory:** `./` (leave as is)
5. Click **Deploy**

Done! Vercel gives you a URL like `https://portfolio-hassan.vercel.app`

**Step 3 — Add Custom Domain (Optional):**
1. In Vercel dashboard → Your project → Settings → Domains
2. Add your domain (e.g. `hassanahmed.dev`)
3. Update your DNS with the provided records

### Method B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### Auto-Deploy on Push

After setup, every `git push` to `main` auto-deploys. No manual steps needed.

---

## Push Updates to GitHub

After making any changes:

```bash
git add .
git commit -m "Update: describe what you changed"
git push
```

Vercel auto-detects the push and redeploys within ~30 seconds.

---

## Update OG Image URL

Once you have your Vercel domain, update these two lines in `index.html`:

```html
<meta property="og:image" content="https://YOUR-DOMAIN.vercel.app/images/og-image.png">
<meta property="og:url" content="https://YOUR-DOMAIN.vercel.app">
```

Create an OG image (1200×630px PNG) and put it in the `images/` folder named `og-image.png`. Use [Canva](https://canva.com) or [og-image.vercel.app](https://og-image.vercel.app) to generate one.

---

## Add Google Analytics (Optional)

1. Go to [analytics.google.com](https://analytics.google.com) → Create property
2. Get your Measurement ID (e.g. `G-XXXXXXXXXX`)
3. Paste before `</head>` in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Add/Remove Certifications

Find the `#certifications` section in `index.html` and copy/modify the `.cert-card` blocks:

```html
<div class="cert-card reveal">
  <div class="cert-logo google">
    <i class="fa-brands fa-google"></i>
  </div>
  <div class="cert-info">
    <h4>Certification Name</h4>
    <p>Issuing Organization</p>
    <span class="cert-year">2024</span>
  </div>
  <a href="YOUR_CERT_URL" target="_blank" class="cert-link">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </a>
</div>
```

Available logo classes: `google`, `microsoft`, `coursera`, `aws`, `ibm`, `meta`

---

## Troubleshooting

| Problem | Fix |
|---|---|
| GitHub projects not loading | Check your `githubUsername` in `main.js`. GitHub API has rate limits (60 req/hour unauthenticated). |
| Profile photo not showing | Make sure `images/about-me.jpg` exists and filename matches exactly. |
| Contact form not working | Set up Formspree and replace `YOUR_FORMSPREE_ID` in `main.js`. |
| CV download not working | Replace both `YOUR_CV_LINK_HERE` in `index.html` with your actual link. |
| Dark mode not saving | Make sure JavaScript is enabled in browser. |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure & SEO |
| CSS3 (custom) | Styling, dark/light theme, animations |
| Vanilla JavaScript | GitHub API, interactions, animations |
| Font Awesome 6 | Icons |
| Google Fonts (Syne + DM Sans) | Typography |
| GitHub REST API | Live project data |
| Formspree | Contact form backend |
| Vercel | Hosting & CDN |

No frameworks, no build tools, no npm. Just open and go.

---

## License

MIT — free to use and modify for personal portfolios.

---

*Built with data and intention.*
