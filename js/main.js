/* ============================================
   HASSAN AHMED PORTFOLIO — MAIN.JS
   Features: GitHub API, Typewriter, Animations,
   Dark Mode, Skill Bars, Counters, Contact Form
============================================ */

'use strict';

/* ─── Config ─── */
const CONFIG = {
  githubUsername: 'Hassan141998',
  formspreeId: 'YOUR_FORMSPREE_ID', // Replace: https://formspree.io
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
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('done');
    }, 800);
  });
}

/* ─── Theme Toggle ─── */
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

/* ─── Custom Cursor ─── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

/* ─── Navbar ─── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.toggle('active',
        link.getAttribute('href') === '#' + current);
    });
  });
}

/* ─── Hamburger ─── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ─── Typewriter ─── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  let textIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = CONFIG.typingTexts[textIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = CONFIG.pauseDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % CONFIG.typingTexts.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

/* ─── Reveal on Scroll ─── */
function initReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Skill Bars ─── */
function initSkillBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });
      }
    });
  }, { threshold: 0.3 });

  const grid = document.getElementById('skillsGrid');
  if (grid) observer.observe(grid);
}

/* ─── Counters ─── */
function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(num => {
          animateCounter(num);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start = Date.now();
  const update = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

/* ─── Skill Filter ─── */
function initSkillFilter() {
  const btns = document.querySelectorAll('.skills-filter .filter-btn');
  const cards = document.querySelectorAll('.skill-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        card.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });
}

/* ─── Project Filter ─── */
function initProjectFilter() {
  document.querySelectorAll('.projects-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.projects-filter .filter-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter').toLowerCase();
      document.querySelectorAll('.project-card').forEach(card => {
        const lang = (card.getAttribute('data-lang') || '').toLowerCase();
        card.classList.toggle('hidden', filter !== 'all' && lang !== filter);
      });
    });
  });
}

/* ─── GitHub API ─── */
async function fetchGitHub() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  try {
    // Fetch user info and repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${CONFIG.githubUsername}`),
      fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=18`)
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

    const [user, repos] = await Promise.all([userRes.json(), reposRes.json()]);

    // Update stats
    const stars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const forks = repos.reduce((sum, r) => sum + r.forks_count, 0);
    document.getElementById('ghRepos').textContent = user.public_repos || repos.length;
    document.getElementById('ghStars').textContent = stars;
    document.getElementById('ghForks').textContent = forks;
    document.getElementById('ghFollowers').textContent = user.followers;

    // Filter out forked repos and build cards
    const filteredRepos = repos.filter(r => !r.fork && r.name !== CONFIG.githubUsername);

    if (filteredRepos.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text2);padding:2rem">No repositories found.</p>';
      return;
    }

    grid.innerHTML = filteredRepos.map(repo => buildProjectCard(repo)).join('');
    initProjectFilter(); // re-init filter after DOM update
    initReveal(); // re-init reveal for new cards
  } catch (err) {
    grid.innerHTML = buildFallbackProjects();
    initReveal();
    console.warn('GitHub API unavailable, showing fallback projects:', err);
  }
}

function buildProjectCard(repo) {
  const lang = (repo.language || '').toLowerCase().replace(' ', '-');
  const langLabel = repo.language || 'Unknown';
  const desc = repo.description || 'No description provided.';
  const topics = (repo.topics || []).slice(0, 3);
  const topicHtml = topics.map(t =>
    `<span style="font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:50px;border:1px solid var(--border);color:var(--text3)">${t}</span>`
  ).join('');
  const repoEmoji = getRepoEmoji(repo.language);

  return `
    <div class="project-card reveal" data-lang="${(repo.language||'').toLowerCase()}">
      <div class="project-header">
        <div class="project-icon">${repoEmoji}</div>
        <div class="project-links">
          <a href="${repo.html_url}" target="_blank" class="project-link" title="View on GitHub">
            <i class="fa-brands fa-github"></i>
          </a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link" title="Live demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
        </div>
      </div>
      <h3>${escapeHtml(repo.name.replace(/-/g,' '))}</h3>
      <p>${escapeHtml(desc.substring(0, 140))}${desc.length > 140 ? '…' : ''}</p>
      ${topicHtml ? `<div style="display:flex;gap:0.4rem;flex-wrap:wrap">${topicHtml}</div>` : ''}
      <div class="project-footer">
        <div class="project-lang lang-${lang}">
          <div class="lang-dot"></div>
          <span>${langLabel}</span>
        </div>
        <div class="project-stats">
          <span class="project-stat"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
          <span class="project-stat"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
          <span class="project-stat"><i class="fa-solid fa-eye"></i> ${repo.watchers_count}</span>
        </div>
      </div>
    </div>`;
}

function buildFallbackProjects() {
  const projects = [
    { name: 'Digital Music Store SQL Analysis', lang: 'SQL', desc: 'Analyzed music store data using advanced SQL queries to identify gaps and increase business growth.', img: 'images/proj_1.jpg', stars: 12, forks: 4 },
    { name: 'Python Sales Data Analysis', lang: 'Python', desc: 'Performed exploratory data analysis on sales data using Python to improve the customer experience.', img: 'images/proj_2.jpg', stars: 18, forks: 6 },
    { name: 'Power BI Sales Dashboard', lang: 'Power BI', desc: 'Designed a Power BI dashboard for Madhav Store to track and analyze online sales data across India.', img: 'images/proj_3.jpg', stars: 9, forks: 3 },
    { name: 'Sales Forecast Time Series', lang: 'Python', desc: 'Used multiple ML models to forecast retail store sales and performed time series analysis with 92% accuracy.', img: 'images/proj_4.jpg', stars: 22, forks: 8 },
    { name: 'Customer Segmentation ML', lang: 'Jupyter Notebook', desc: 'Developed a clustering ML model to give recommendations of financial products to target customer groups.', img: 'images/proj_5.jpg', stars: 15, forks: 5 },
  ];
  return projects.map(p => `
    <div class="project-card reveal" data-lang="${p.lang.toLowerCase()}">
      <div class="project-thumb">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentElement.style.display='none'">
      </div>
      <div class="project-card-body">
        <div class="project-header">
          <h3>${p.name}</h3>
          <div class="project-links">
            <a href="https://github.com/${CONFIG.githubUsername}" target="_blank" class="project-link">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <p>${p.desc}</p>
        <div class="project-footer">
          <div class="project-lang"><div class="lang-dot"></div><span>${p.lang}</span></div>
          <div class="project-stats">
            <span class="project-stat"><i class="fa-solid fa-star"></i> ${p.stars}</span>
            <span class="project-stat"><i class="fa-solid fa-code-fork"></i> ${p.forks}</span>
          </div>
        </div>
      </div>
    </div>`).join('');
}

function getRepoEmoji(lang) {
  const map = {
    'Python': '🐍', 'Jupyter Notebook': '📓',
    'R': '📊', 'SQL': '🗄️',
    'JavaScript': '⚡', 'TypeScript': '💙',
    'HTML': '🌐', 'CSS': '🎨',
    'Java': '☕', 'C++': '⚙️',
    'Shell': '🐚', 'Dockerfile': '🐳',
  };
  return map[lang] || '💻';
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[m]));
}

/* ─── Contact Form (Formspree) ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  const btn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = '<span>Sending…</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    msg.textContent = '';
    msg.className = 'form-message';

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    // Check if Formspree ID is configured
    if (CONFIG.formspreeId === 'YOUR_FORMSPREE_ID') {
      // Simulate success for demo
      setTimeout(() => {
        showFormMsg('✓ Message sent! (Configure Formspree to enable real emails)', 'success');
        form.reset();
        btn.disabled = false;
        btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
      }, 1200);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showFormMsg('✓ Message sent! I\'ll get back to you within 24 hours.', 'success');
        form.reset();
      } else {
        showFormMsg('✗ Something went wrong. Please try emailing me directly.', 'error');
      }
    } catch {
      showFormMsg('✗ Network error. Please check your connection.', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
    }
  });

  function showFormMsg(text, type) {
    msg.textContent = text;
    msg.className = 'form-message ' + type;
  }
}
