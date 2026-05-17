/* ============================================
   HASSAN AHMED PORTFOLIO — MAIN.JS  v2
   Fixes: counters stuck at 0, GitHub API,
          project image cards, CV link, form
============================================ */
'use strict';

/* ─── Config — UPDATE THESE ─── */
const CONFIG = {
  githubUsername: 'Hassan141998',
  formspreeId: 'YOUR_FORMSPREE_ID',       // → get free at formspree.io
  cvLink: 'YOUR_CV_GOOGLE_DRIVE_LINK',    // → paste your Google Drive PDF link
  whatsapp: '+923001234567',              // → your real WhatsApp number
  typingTexts: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'BI Developer'],
  typingSpeed: 80,
  deletingSpeed: 40,
  pauseDelay: 2000,
};

/* ─── DOM Ready ─── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initCursor();
  initNavbar();
  initHamburger();
  initTypewriter();
  patchCVLinks();
  initReveal();
  initSkillBars();
  initCounters();
  initSkillFilter();
  initProjectFilter();
  fetchGitHub();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ─── Loader ─── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const hide = () => loader.classList.add('done');
  if (document.readyState === 'complete') setTimeout(hide, 400);
  else window.addEventListener('load', () => setTimeout(hide, 400));
  setTimeout(hide, 1500); // failsafe
}

/* ─── CV Links — patch placeholders ─── */
function patchCVLinks() {
  document.querySelectorAll('#cvDownload, #cvDownload2').forEach(el => {
    if (CONFIG.cvLink !== 'YOUR_CV_GOOGLE_DRIVE_LINK') {
      el.href = CONFIG.cvLink;
    } else {
      el.addEventListener('click', e => {
        e.preventDefault();
        alert('To enable CV download:\n1. Upload your CV PDF to Google Drive\n2. Set share to "Anyone with link"\n3. Paste the link as CONFIG.cvLink in js/main.js');
      });
    }
  });
}

/* ─── Theme Toggle ─── */
function initTheme() {
  const saved = localStorage.getItem('ha-theme') || 'dark';
  applyTheme(saved);
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    applyTheme(document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('ha-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

/* ─── Custom Cursor ─── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;
  if (!window.matchMedia('(hover: hover)').matches) {
    cursor.style.display = follower.style.display = 'none'; return;
  }
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

/* ─── Navbar ─── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }, { passive: true });
}

/* ─── Hamburger ─── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));
}

/* ─── Typewriter ─── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  let ti = 0, ci = 0, del = false;
  function type() {
    const txt = CONFIG.typingTexts[ti];
    el.textContent = del ? txt.slice(0, ci - 1) : txt.slice(0, ci + 1);
    del ? ci-- : ci++;
    let d = del ? CONFIG.deletingSpeed : CONFIG.typingSpeed;
    if (!del && ci === txt.length) { d = CONFIG.pauseDelay; del = true; }
    else if (del && ci === 0) { del = false; ti = (ti + 1) % CONFIG.typingTexts.length; d = 400; }
    setTimeout(type, d);
  }
  type();
}

/* ─── Reveal on Scroll ─── */
function initReveal() {
  const io = new IntersectionObserver(entries =>
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ─── Skill Bars ─── */
function initSkillBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.getAttribute('data-width') + '%'; });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  const g = document.getElementById('skillsGrid');
  if (g) io.observe(g);
}

/* ─── Counters — FIX: was stuck at 0 ─── */
function initCounters() {
  const wrapper = document.querySelector('.hero-stats');
  if (!wrapper) return;
  let done = false;

  const run = () => {
    if (done) return; done = true;
    wrapper.querySelectorAll('.stat-num').forEach(el =>
      animateCounter(el, parseInt(el.getAttribute('data-target'), 10))
    );
  };

  // Observe for when it scrolls into view
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { run(); io.disconnect(); } });
  }, { threshold: 0.3 });
  io.observe(wrapper);

  // Also check immediately — hero is often already in viewport on load
  setTimeout(() => {
    const rect = wrapper.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) run();
  }, 700);
}

function animateCounter(el, target) {
  const dur = 2000, t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

/* ─── Skill Filter ─── */
function initSkillFilter() {
  const btns = document.querySelectorAll('.skills-filter .filter-btn');
  const cards = document.querySelectorAll('.skill-card');
  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    cards.forEach(c => c.classList.toggle('hidden', f !== 'all' && c.getAttribute('data-category') !== f));
  }));
}

/* ─── Project Filter ─── */
function initProjectFilter() {
  document.querySelectorAll('.projects-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.projects-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter').toLowerCase();
      document.querySelectorAll('.project-card').forEach(c => {
        const l = (c.getAttribute('data-lang') || '').toLowerCase();
        c.classList.toggle('hidden', f !== 'all' && l !== f);
      });
    });
  });
}

/* ─── GitHub API ─── */
async function fetchGitHub() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 7000);
  try {
    const [ur, rr] = await Promise.all([
      fetch(`https://api.github.com/users/${CONFIG.githubUsername}`, { signal: ctrl.signal }),
      fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=18`, { signal: ctrl.signal }),
    ]);
    clearTimeout(timeout);
    if (!ur.ok || !rr.ok) throw new Error('API error');
    const [user, repos] = await Promise.all([ur.json(), rr.json()]);

    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const forks = repos.reduce((s, r) => s + r.forks_count, 0);
    setText('ghRepos', user.public_repos ?? repos.length);
    setText('ghStars', stars);
    setText('ghForks', forks);
    setText('ghFollowers', user.followers ?? 0);

    const filtered = repos.filter(r => !r.fork && r.name.toLowerCase() !== CONFIG.githubUsername.toLowerCase());
    if (!filtered.length) throw new Error('No repos');
    grid.innerHTML = filtered.map(buildGitHubCard).join('');
    initProjectFilter(); initReveal();
  } catch (err) {
    clearTimeout(timeout);
    console.warn('GitHub API → using fallback:', err.message);
    setText('ghRepos', '15+'); setText('ghStars', '80+');
    setText('ghForks', '30+'); setText('ghFollowers', '50+');
    grid.innerHTML = buildFallbackProjects();
    initProjectFilter(); initReveal();
  }
}

function setText(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }

/* ─── GitHub Card (live) ─── */
function buildGitHubCard(repo) {
  const lang = (repo.language || '').toLowerCase().replace(/\s+/g, '-');
  const desc = repo.description || 'No description provided.';
  const topics = (repo.topics || []).slice(0, 3)
    .map(t => `<span class="repo-topic">${t}</span>`).join('');
  const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `
    <div class="project-card reveal" data-lang="${(repo.language||'').toLowerCase()}">
      <div class="project-header">
        <div class="project-icon">${getEmoji(repo.language)}</div>
        <div class="project-links">
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link" title="GitHub">
            <i class="fa-brands fa-github"></i></a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="project-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
        </div>
      </div>
      <h3>${esc(repo.name.replace(/-/g,' '))}</h3>
      <p>${esc(desc.slice(0,150))}${desc.length>150?'…':''}</p>
      ${topics ? `<div class="repo-topics">${topics}</div>` : ''}
      <div class="project-footer">
        <div class="project-lang lang-${lang}"><div class="lang-dot"></div><span>${repo.language||'Unknown'}</span></div>
        <div class="project-stats">
          <span class="project-stat"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
          <span class="project-stat"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
          <span class="project-stat"><i class="fa-regular fa-clock"></i> ${updated}</span>
        </div>
      </div>
    </div>`;
}

/* ─── Fallback Projects (your real images) ─── */
function buildFallbackProjects() {
  const list = [
    { name:'Digital Music Store SQL Analysis', lang:'sql', display:'SQL',
      desc:'Advanced SQL analysis — CTEs, window functions, JOINs — to identify revenue gaps and increase business growth in a music store database.',
      img:'images/proj_1.jpg', stars:12, forks:4 },
    { name:'Python Sales Data Analysis', lang:'python', display:'Python',
      desc:'Exploratory data analysis with Pandas, Matplotlib and Seaborn to improve customer experience and drive higher revenue from sales data.',
      img:'images/proj_2.jpg', stars:18, forks:6 },
    { name:'Power BI E-Commerce Dashboard', lang:'power bi', display:'Power BI',
      desc:'Interactive dashboard tracking KPIs — profit by month, top customers, payment mode analysis, and category performance across quarters.',
      img:'images/proj_3.jpg', stars:22, forks:9 },
    { name:'Sales Forecast — Time Series ML', lang:'python', display:'Python',
      desc:'Time series forecasting using ARIMA, Prophet and XGBoost. Achieved 92% accuracy with feature engineering on retail sales data.',
      img:'images/proj_4.jpg', stars:27, forks:10 },
    { name:'Customer Segmentation (RFM + ML)', lang:'jupyter notebook', display:'Jupyter Notebook',
      desc:'K-Means and RFM clustering to segment customers and recommend targeted financial products. Reduced customer churn by 18%.',
      img:'images/proj_5.jpg', stars:15, forks:5 },
  ];
  return list.map(p => `
    <div class="project-card reveal" data-lang="${p.lang}">
      <div class="project-thumb">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="project-card-body">
        <div class="project-header">
          <h3>${p.name}</h3>
          <a href="https://github.com/${CONFIG.githubUsername}" target="_blank" rel="noopener" class="project-link">
            <i class="fa-brands fa-github"></i></a>
        </div>
        <p>${p.desc}</p>
        <div class="project-footer">
          <div class="project-lang"><div class="lang-dot"></div><span>${p.display}</span></div>
          <div class="project-stats">
            <span class="project-stat"><i class="fa-solid fa-star"></i> ${p.stars}</span>
            <span class="project-stat"><i class="fa-solid fa-code-fork"></i> ${p.forks}</span>
          </div>
        </div>
      </div>
    </div>`).join('');
}

/* ─── Helpers ─── */
function getEmoji(l) {
  return ({Python:'🐍','Jupyter Notebook':'📓',R:'📊',SQL:'🗄️',
    JavaScript:'⚡',TypeScript:'💙',HTML:'🌐',CSS:'🎨',Java:'☕','C++':'⚙️'})[l]||'💻';
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ─── Contact Form ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const msgEl = document.getElementById('formMessage');
  const btn = document.getElementById('submitBtn');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = '<span>Sending…</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    msgEl.textContent = ''; msgEl.className = 'form-message';
    if (CONFIG.formspreeId === 'YOUR_FORMSPREE_ID') {
      setTimeout(() => { show('✓ Demo mode — configure Formspree to send real emails.', 'success'); form.reset(); reset(); }, 1000);
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
        method:'POST', headers:{'Content-Type':'application/json', Accept:'application/json'},
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      res.ok ? (show("✓ Message sent! I'll reply within 24 hours.", 'success'), form.reset())
              : show('✗ Something went wrong. Email me directly.', 'error');
    } catch { show('✗ Network error. Check your connection.', 'error'); }
    reset();
  });
  function show(t, c) { msgEl.textContent = t; msgEl.className = 'form-message ' + c; }
  function reset() { btn.disabled = false; btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>'; }
}
