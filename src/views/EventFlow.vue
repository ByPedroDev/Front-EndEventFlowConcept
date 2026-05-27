<template>
  <!-- NAV -->
  <header>
    <div class="nav-inner">
      <div class="logo">EventFlow<span class="logo-dot">.</span></div>
      <nav>
        <a href="#" class="active">Discover</a>
        <a href="#">Schedule</a>
        <a href="#">Speakers</a>
        <a href="#">Venues</a>
      </nav>
      <div class="nav-actions">
        <button class="btn-primary">Create Event</button>
        <button class="icon-btn">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <button class="icon-btn">
          <span class="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- HERO -->
    <section style="max-width: 1440px; margin: 2rem auto; padding: 0 2rem">
      <div class="hero" style="margin: 0; border-radius: 24px">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9JuJlPv-U3qDfu3964lPjr0hXhjEzrZjJQHeRkFL3WcO2xGugjKG7vfU5iYm6qhnYH0dwWxdB1l6O3YBeCPKD0L_5mEHKV08gxPLv5IR4vaC2Zg10azF1e73ekE9QwaEKtqBymrCjO4fzLDOv-QFcGVImv02unjk0cO4BD71BVExBpVtv0jskP-laK2GljNl5k2M9ZiZy7unleXN_a5FulmXyohLM7sC4D6EzD44rQoV9Nbc8-g2tm6FBHLiDVAZ3j4gR3QM_224o"
          alt="Hero"
        />
        <div class="hero-overlay">
          <div>
            <div class="hero-badge">Featured Experience</div>
            <h1>The Future of <span>Global FinTech</span> 2024</h1>
            <p>
              Join over 5,000 industry leaders for the most influential financial technology
              conference of the year.
            </p>
            <div class="hero-actions">
              <button class="btn-hero">Register Now</button>
              <button class="btn-ghost">View Agenda</button>
            </div>
          </div>
        </div>
        <div class="hero-dots">
          <span class="active"></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>

    <!-- SEARCH -->
    <section style="max-width: 1440px; margin: 2rem auto; padding: 0 2rem">
      <div class="search-bar">
        <div class="search-row">
          <div class="search-input-wrap">
            <span class="material-symbols-outlined search-icon">search</span>
            <input class="search-input" type="text" placeholder="Find your next experience..." />
          </div>
          <button class="filter-btn">
            <span class="material-symbols-outlined" style="font-size: 1.1rem">calendar_today</span>
            Any Date
          </button>
          <button class="filter-btn">
            <span class="material-symbols-outlined" style="font-size: 1.1rem">category</span>
            Category
          </button>
          <button class="filter-btn-icon">
            <span class="material-symbols-outlined" style="font-size: 1.1rem">tune</span>
          </button>
        </div>
        <div class="chips">
          <span class="chip active">#Technology</span>
          <span class="chip">#Wellness</span>
          <span class="chip">#Business</span>
          <span class="chip">#Music</span>
          <span class="chip">#Workshops</span>
        </div>
      </div>
    </section>

    <!-- SPEAKERS COVERFLOW -->
    <section class="speakers-section">
      <div class="section" style="padding-bottom: 0">
        <div class="section-header">
          <div>
            <div class="section-label">— Keynote Lineup</div>
            <h2>Featured Speakers</h2>
            <p>World-class thinkers shaping tomorrow's agenda</p>
          </div>
          <a href="#" class="view-all"
            >View All
            <span class="material-symbols-outlined" style="font-size: 1rem">arrow_forward</span></a
          >
        </div>
      </div>

      <div class="coverflow-container" id="coverflow">
        <div class="coverflow-track" id="covTrack">
          <!-- Cards injected by JS -->
        </div>
      </div>

      <div class="coverflow-nav">
        <button class="cov-btn" id="covPrev">
          <span class="material-symbols-outlined"></span>
        </button>
        <div class="cov-dots" id="covDots"></div>
        <button class="cov-btn" id="covNext">
          <span class="material-symbols-outlined"></span>
        </button>
      </div>
    </section>

    <!-- EVENTS GRID -->
    <section class="section">
      <div class="section-header">
        <div>
          <div class="section-label">— Upcoming</div>
          <h2>Upcoming Events</h2>
          <p>Handpicked experiences tailored for you</p>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem">
          <div class="view-toggle">
            <button>
              <span class="material-symbols-outlined" style="font-size: 1.1rem">grid_view</span>
            </button>
            <button>
              <span class="material-symbols-outlined" style="font-size: 1.1rem">view_list</span>
            </button>
          </div>
          <a href="#" class="view-all"
            >View All
            <span class="material-symbols-outlined" style="font-size: 1rem">arrow_forward</span></a
          >
        </div>
      </div>

      <div class="events-grid">
        <!-- Card 1 -->
        <div class="event-card">
          <div class="event-img">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVEXg69OmBIJtNR3IqF1IkrG0CPH2_0Af1rDEpfFzWn9voZFzWNCB1R5POLYYpbboBouxizZ8P6k4NHTrZak33yii-oVxOMssEdiOAqlggWHEKK0KSCR4KELWJJlFRHDKvRQbxMXsYMNx_IperD-GBqzD234n5XE_5T0lF4ARrRe1kPMoCD-nOvd6Bu7lGC1qS91FL0thAzJG0VQSA4Np-Zyq76T4xIdeuuTAMt-h3O8UIDUTRvSJZTCzeST24FFlnIgTJ9CTYJL4W"
              alt="Workshop"
            />
            <div class="event-date-badge">
              <div class="day">24</div>
              <div class="month">OCT</div>
            </div>
          </div>
          <div class="event-body">
            <div class="event-cat">
              <span class="material-symbols-outlined" style="font-size: 0.9rem">label</span>Workshop
            </div>
            <div class="event-title">Advanced Design Systems Workshop</div>
            <div class="event-desc">
              Master the art of creating scalable components and tokens for enterprise SaaS
              products.
            </div>
            <div class="event-footer">
              <div class="event-meta">
                <span class="material-symbols-outlined">location_on</span>Creative Hub, Berlin
              </div>
              <div class="event-meta"><span class="material-symbols-outlined">group</span>120+</div>
            </div>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="event-card">
          <div class="event-img">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnprHnhI17hC3LiratNtLycBIVDQkMPpemyQu_MIyksZ3O5E4hl9uyYPsE08h-ddOJSdF8Bomk5wHmYdkInUp9sBSKqCYbtng6GQPM778EwNkKx1zwgjn6JZpTsbc4orZMKpFJIsYxB7b0pHvzigLY1Vkvptnz4XLsgmzQd0vauHmJfSRkC9R7_KjLA2pPy-twxAGgk_yjEFSCLpRyt_wM_Ol3_AVSkURz476RK9C9De6YBnhMY2ow5p8QFt-Bb-yJkKzhCv1NnNeG"
              alt="Festival"
            />
            <div class="event-date-badge">
              <div class="day">12</div>
              <div class="month">NOV</div>
            </div>
          </div>
          <div class="event-body">
            <div class="event-cat">
              <span class="material-symbols-outlined" style="font-size: 0.9rem">label</span>Festival
            </div>
            <div class="event-title">Digital Arts &amp; Music Expo</div>
            <div class="event-desc">
              A sensory journey blending immersive digital installations with global electronic
              sounds.
            </div>
            <div class="event-footer">
              <div class="event-meta">
                <span class="material-symbols-outlined">location_on</span>Sonar Dome, Barcelona
              </div>
              <div class="event-meta"><span class="material-symbols-outlined">group</span>2.5k</div>
            </div>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="event-card">
          <div class="event-img">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0EsVhNFiWT3J7WpYLxmSsuv8-P65nhn0BBap0n0getaLzYtO20RyZElA30hjaWsV_ArRUP_VEXAu2Lu_TbwPLpfDaf5WmoPnMXoFOMPGitWcFzN4BQx6CkHmHHrTiqZlpk0Ep2M8uUIvpVB-SP-kNuEmxBA5DW0HuHfnFUiyZNry9JlYFg6ad4gFz2UXCe-63xzbXaGjgxn7DUH8JoVCF1pZBa3SGiI962Mp7pnSd1gPAB65MSK52Iovms1qxfuu3xhRfdIf0aJkI"
              alt="Conference"
            />
            <div class="event-date-badge">
              <div class="day">05</div>
              <div class="month">DEC</div>
            </div>
          </div>
          <div class="event-body">
            <div class="event-cat">
              <span class="material-symbols-outlined" style="font-size: 0.9rem">label</span
              >Conference
            </div>
            <div class="event-title">Executive Leadership Summit</div>
            <div class="event-desc">
              Strategic insights for the next generation of C-suite executives and change makers.
            </div>
            <div class="event-footer">
              <div class="event-meta">
                <span class="material-symbols-outlined">location_on</span>The Ritz, London
              </div>
              <div class="event-meta"><span class="material-symbols-outlined">group</span>450</div>
            </div>
          </div>
        </div>
        <!-- Card 4 -->
        <div class="event-card">
          <div class="event-img">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOtsljKnV__vIzi1tQZ442lzSofmbhfovLTbHd1qpASPEbXUhVqNhm3WAnf5dAUzRULtO_IE36iYsPgw5yScY6Jld3borL5HU4lYqmb0qnc-ugwSe9OqvUXMUT8YFWGaYbMhl_ip6BSSQDps1hqXG7zh2msTFQ9na7SZxkhspkdag4gC2pFQzlx84BslzXrFJ-APF9_d0Igrcb4j2jNiS4ElBhs5fKCi-0hoZ1C-NisIYYcKTW2B8MtH8wYXOpodnFNe2R0BPDBOoz"
              alt="Networking"
            />
            <div class="event-date-badge">
              <div class="day">18</div>
              <div class="month">JAN</div>
            </div>
          </div>
          <div class="event-body">
            <div class="event-cat">
              <span class="material-symbols-outlined" style="font-size: 0.9rem">label</span
              >Networking
            </div>
            <div class="event-title">Founder's Supper Club</div>
            <div class="event-desc">
              An intimate evening of peer-to-peer networking over curated culinary experiences.
            </div>
            <div class="event-footer">
              <div class="event-meta">
                <span class="material-symbols-outlined">location_on</span>SOHO House, NYC
              </div>
              <div class="event-meta"><span class="material-symbols-outlined">group</span>25</div>
            </div>
          </div>
        </div>
        <!-- Card 5 -->
        <div class="event-card">
          <div class="event-img">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgPxSVs1N7xDQRwybwo6MRhWBsIoVQIzGKy45fogShQG1WI-AjkQOg8ZxRjP6qM7kF7RX78T_16gvYHToLgxBqylPHDMFX5P9nL5Vw7rmCK97moxiGo1aZcUGu_7X-7asYb9DGFixDQEq-QlhULAzhMCOZqhcYAlkDzwyhrUFYxnKcLN7YoMhrg3QIvQz1ayY1zNBOd8cpNI_gMGzKpMAwRYepbCFVNiznM-s1sV9mY4ZeszA7ZjPMmG5lfokpW_y0hzDY4ZN7ZvTH"
              alt="Awards"
            />
            <div class="event-date-badge">
              <div class="day">02</div>
              <div class="month">FEB</div>
            </div>
          </div>
          <div class="event-body">
            <div class="event-cat">
              <span class="material-symbols-outlined" style="font-size: 0.9rem">label</span
              >Celebration
            </div>
            <div class="event-title">Startup of the Year Awards</div>
            <div class="event-desc">
              Celebrating the most innovative startups and disruptive technologies of the season.
            </div>
            <div class="event-footer">
              <div class="event-meta">
                <span class="material-symbols-outlined">location_on</span>Sky Garden, Seoul
              </div>
              <div class="event-meta"><span class="material-symbols-outlined">group</span>800</div>
            </div>
          </div>
        </div>
        <!-- Card 6 -->
        <div class="event-card">
          <div class="event-img">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIHV4UePuMCdBc76zqStUcbX17Nv-o9Sg6ddwYDTnb_uroFWDJnVYRC69SZJ39RouXC71JHXY3xJ8ItJVrWngd4rmYIfqV7Ff9qaxM2h2phcE_cYo-Vvs8rEXpjxyD72FF6desc8BwLcSYiVPxfbQ3tiAgfiYGqAAkz9GhJ0tsuIS6n85Xu3KNPFbpgdcBTQ10cjkxwWUqYy0d1hO_isAk5AH9HQBV7pqI6GN_eN_TRfIhV52me-W9sVe8BFoi8HhkEoE13C_ioWci"
              alt="Bootcamp"
            />
            <div class="event-date-badge">
              <div class="day">15</div>
              <div class="month">MAR</div>
            </div>
          </div>
          <div class="event-body">
            <div class="event-cat">
              <span class="material-symbols-outlined" style="font-size: 0.9rem">label</span>Learning
            </div>
            <div class="event-title">Product Strategy Bootcamp</div>
            <div class="event-desc">
              Intensive 3-day workshop on building high-growth products that users love.
            </div>
            <div class="event-footer">
              <div class="event-meta">
                <span class="material-symbols-outlined">location_on</span>WeWork, San Francisco
              </div>
              <div class="event-meta"><span class="material-symbols-outlined">group</span>75</div>
            </div>
          </div>
        </div>
      </div>

      <div class="load-more-wrap">
        <button class="btn-outline">Load More Events</button>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo">EventFlow<span class="logo-dot">.</span></div>
        <p>© 2024 EventFlow Ecosystem. All rights reserved.</p>
      </div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
        <a href="#">API Docs</a>
      </div>
    </div>
  </footer>

  <!-- FAB -->
  <button class="fab">
    <span class="material-symbols-outlined">add</span>
  </button>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

// 1. Dados puros: ficam de fora do onMounted
const speakers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief AI Officer · DeepMind',
    topic: '🧠 The Conscious Machine',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Marcus Adeyemi',
    role: 'Founder & CEO · Nexus Capital',
    topic: '💹 Web3 & Financial Futures',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Design Director · Apple',
    topic: '✦ Spatial Computing UX',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Elena Russo',
    role: 'Partner · Sequoia Capital',
    topic: '🚀 Scaling to a Billion',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'James Okafor',
    role: 'CTO · Stripe',
    topic: '⚡ Payments Infrastructure',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  },
]

let current = 2 // center

// 2. TUDO que mexe com o HTML vai DENTRO do onMounted
onMounted(() => {
  // Capturamos os elementos aqui dentro, onde garantimos que o HTML já existe
  const track = document.getElementById('covTrack') as HTMLElement
  const dotsEl = document.getElementById('covDots') as HTMLElement
  const prevBtn = document.getElementById('covPrev') as HTMLElement
  const nextBtn = document.getElementById('covNext') as HTMLElement

  // Trava de segurança: se não encontrar o HTML, para por aqui para evitar erros
  if (!track || !dotsEl) return

  function buildCards() {
    track.innerHTML = ''
    dotsEl.innerHTML = ''

    speakers.forEach((sp, i) => {
      const card = document.createElement('div')
      card.className = 'speaker-card' + (i === current ? ' active' : '')
      card.innerHTML = `
        <div class="speaker-img-wrap">
          <img src="${sp.img}" alt="${sp.name}" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face'"/>
          <div class="speaker-img-overlay"></div>
        </div>
        <div class="speaker-body">
          <div class="speaker-name">${sp.name}</div>
          <div class="speaker-role">${sp.role}</div>
          <div class="speaker-topic">${sp.topic}</div>
        </div>
      `
      card.addEventListener('click', () => {
        current = i
        updateCoverflow()
      })
      track.appendChild(card)

      const dot = document.createElement('div')
      dot.className = 'cov-dot' + (i === current ? ' active' : '')
      dot.addEventListener('click', () => {
        current = i
        updateCoverflow()
      })
      dotsEl.appendChild(dot)
    })
  }

  function updateCoverflow() {
    // Adicionamos <HTMLElement> para o TypeScript saber que ele pode alterar o ".style"
    const cards = track.querySelectorAll('.speaker-card') as NodeListOf<HTMLElement>
    const dots = dotsEl.querySelectorAll('.cov-dot') as NodeListOf<HTMLElement>

    const cardW = 260
    const gap = 80

    cards.forEach((card, i) => {
      const offset = i - current
      const absOffset = Math.abs(offset)

      const tx = offset * (cardW * 0.62 + gap)
      const ry = offset === 0 ? 0 : offset < 0 ? 38 : -38
      const scale = offset === 0 ? 1 : Math.max(0.72, 1 - absOffset * 0.14)
      const tz = offset === 0 ? 0 : -absOffset * 80
      const zIndex = 10 - absOffset

      card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`
      card.style.zIndex = zIndex.toString() // TS exige que o zIndex seja uma string
      card.className = 'speaker-card' + (i === current ? ' active' : '')
    })

    dots.forEach((dot, i) => {
      dot.className = 'cov-dot' + (i === current ? ' active' : '')
    })
  }

  // Event Listeners dos botões e teclado
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + speakers.length) % speakers.length
      updateCoverflow()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % speakers.length
      updateCoverflow()
    })
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      current = (current - 1 + speakers.length) % speakers.length
      updateCoverflow()
    }
    if (e.key === 'ArrowRight') {
      current = (current + 1) % speakers.length
      updateCoverflow()
    }
  })

  // Chip toggle
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'))
      chip.classList.add('active')
    })
  })

  // Inicializa o carrossel
  buildCards()
  updateCoverflow()
})
</script>

<style>
/* O CSS vai aqui */
:root {
  --bg: #0a0f0d;
  --bg-card: #111712;
  --bg-elevated: #161d18;
  --emerald: #10b981;
  --emerald-dim: #059669;
  --emerald-glow: rgba(16, 185, 129, 0.18);
  --emerald-border: rgba(16, 185, 129, 0.28);
  --text: #f0faf5;
  --text-muted: #7a9987;
  --text-dim: #4a6457;
  --border: rgba(255, 255, 255, 0.07);
  --border-strong: rgba(255, 255, 255, 0.12);
  --shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
  --radius: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

h1,
h2,
h3,
h4 {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* ─── NAV ─── */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 15, 13, 0.82);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.04em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.logo-dot {
  color: var(--emerald);
  font-size: 1.8rem;
  line-height: 1;
}
nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}
nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.2s;
}
nav a.active,
nav a:hover {
  color: var(--emerald);
}
nav a.active {
  position: relative;
}
nav a.active::after {
  content: '';
  position: absolute;
  bottom: -22px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--emerald);
  border-radius: 2px;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.btn-primary {
  background: var(--emerald);
  color: #fff;
  border: none;
  padding: 0.55rem 1.4rem;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.btn-primary:hover {
  background: var(--emerald-dim);
  box-shadow: 0 0 20px var(--emerald-glow);
}
.icon-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}
.icon-btn:hover {
  color: var(--emerald);
}

/* ─── HERO ─── */
.hero {
  position: relative;
  height: 520px;
  margin: 2rem 2rem 0;
  border-radius: 24px;
  overflow: hidden;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
}
.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.35) saturate(0.8);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 15, 13, 0.97) 0%,
    rgba(10, 15, 13, 0.6) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--emerald-glow);
  border: 1px solid var(--emerald-border);
  color: var(--emerald);
  padding: 0.3rem 0.9rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  width: fit-content;
}
.hero-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--emerald);
  border-radius: 50%;
  animation: pulse-dot 1.8s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.7);
  }
}
.hero h1 {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  line-height: 1.05;
  max-width: 680px;
  margin-bottom: 1.2rem;
  color: #fff;
}
.hero h1 span {
  color: var(--emerald);
}
.hero p {
  color: rgba(240, 250, 245, 0.65);
  max-width: 480px;
  font-size: 1.05rem;
  margin-bottom: 2rem;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.btn-hero {
  background: var(--emerald);
  color: #fff;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
}
.btn-hero:hover {
  background: var(--emerald-dim);
  transform: translateY(-1px);
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.4);
}
.btn-ghost {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.85rem 2rem;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(8px);
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
}
.hero-dots {
  position: absolute;
  bottom: 2rem;
  right: 2.5rem;
  display: flex;
  gap: 0.5rem;
}
.hero-dots span {
  height: 3px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.25);
  transition: all 0.3s;
}
.hero-dots span.active {
  width: 2.5rem;
  background: var(--emerald);
}
.hero-dots span:not(.active) {
  width: 1rem;
}

/* ─── SECTION ─── */
.section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 2rem;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}
.section-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--emerald);
  margin-bottom: 0.5rem;
}
.section-header h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: var(--text);
}
.section-header p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}
.view-all {
  color: var(--emerald);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: gap 0.2s;
  white-space: nowrap;
}
.view-all:hover {
  gap: 0.6rem;
}

/* ─── SEARCH ─── */
.search-bar {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  margin: 0 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.search-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.search-input-wrap {
  position: relative;
  flex: 1;
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
  font-size: 1.1rem;
}
.search-input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 3rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.search-input:focus {
  border-color: var(--emerald-border);
  box-shadow: 0 0 0 3px var(--emerald-glow);
}
.search-input::placeholder {
  color: var(--text-dim);
}
.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.3rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}
.filter-btn:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
}
.filter-btn-icon {
  background: var(--emerald);
  color: #fff;
  border: none;
  padding: 0.9rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.filter-btn-icon:hover {
  background: var(--emerald-dim);
}
.chips {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1.2rem;
}
.chip {
  padding: 0.35rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s;
}
.chip.active {
  background: var(--emerald-glow);
  border-color: var(--emerald-border);
  color: var(--emerald);
}
.chip:not(.active) {
  background: var(--bg-elevated);
  border-color: var(--border);
  color: var(--text-muted);
}
.chip:not(.active):hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
}

/* ─── COVERFLOW SPEAKERS ─── */
.speakers-section {
  background: linear-gradient(180deg, var(--bg) 0%, #0c1510 50%, var(--bg) 100%);
  padding: 5rem 0;
  overflow: hidden;
}
.coverflow-container {
  position: relative;
  width: 100%;
  height: 440px;
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
.coverflow-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}
.speaker-card {
  position: absolute;
  width: 260px;
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
  user-select: none;
}
.speaker-card.active {
  border-color: var(--emerald-border);
  box-shadow:
    0 0 0 1px var(--emerald-border),
    0 30px 80px rgba(0, 0, 0, 0.8),
    0 0 60px var(--emerald-glow);
  z-index: 10;
}
.speaker-card:not(.active) {
  filter: brightness(0.55) saturate(0.6);
}
.speaker-img-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.speaker-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.speaker-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg-card) 0%, transparent 60%);
}
.speaker-body {
  padding: 1.2rem 1.4rem 1.4rem;
}
.speaker-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 0.2rem;
}
.speaker-role {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}
.speaker-topic {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  font-size: 0.75rem;
  color: var(--emerald);
  font-weight: 600;
  letter-spacing: 0.03em;
}
.speaker-card.active .speaker-topic {
  background: var(--emerald-glow);
  border-color: var(--emerald-border);
}
.coverflow-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
}
.cov-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: var(--bg-card);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.1rem;
}
.cov-btn:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
  background: var(--emerald-glow);
}
.cov-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.cov-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-dim);
  transition: all 0.3s;
  cursor: pointer;
}
.cov-dot.active {
  background: var(--emerald);
  width: 20px;
  border-radius: 3px;
}

/* ─── EVENTS GRID ─── */
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 1024px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}

.event-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}
.event-card:hover {
  border-color: var(--emerald-border);
  transform: translateY(-4px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 30px var(--emerald-glow);
}
.event-img {
  height: 180px;
  position: relative;
  overflow: hidden;
}
.event-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.75) saturate(0.85);
  transition:
    transform 0.5s,
    filter 0.3s;
}
.event-card:hover .event-img img {
  transform: scale(1.05);
  filter: brightness(0.85) saturate(1);
}
.event-date-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(10, 15, 13, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 0.35rem 0.7rem;
  text-align: center;
}
.event-date-badge .day {
  font-family: 'Syne', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--emerald);
  line-height: 1;
}
.event-date-badge .month {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.event-body {
  padding: 1.4rem;
}
.event-cat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.7rem;
  color: var(--emerald);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.event-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}
.event-desc {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
.event-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-muted);
  font-size: 0.8rem;
}
.event-meta .material-symbols-outlined {
  font-size: 1rem;
}

/* ─── LOAD MORE ─── */
.load-more-wrap {
  text-align: center;
  margin-top: 3rem;
}
.btn-outline {
  background: none;
  border: 1px solid var(--border-strong);
  color: var(--text-muted);
  padding: 0.8rem 2rem;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
  background: var(--emerald-glow);
}

/* ─── FOOTER ─── */
footer {
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}
.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.footer-brand .logo {
  margin-bottom: 0.3rem;
}
.footer-brand p {
  color: var(--text-dim);
  font-size: 0.8rem;
}
.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.footer-links a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: var(--emerald);
}

/* ─── FAB ─── */
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  background: var(--emerald);
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
  transition: all 0.2s;
  z-index: 50;
}
.fab:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 40px rgba(16, 185, 129, 0.5);
}

/* ─── GLOW BG ACCENT ─── */
.glow-accent {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  opacity: 0.12;
}

/* ─── VIEW TOGGLE ─── */
.view-toggle {
  display: flex;
  gap: 0.4rem;
}
.view-toggle button {
  padding: 0.45rem;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  border-radius: 8px;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}
.view-toggle button:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
}
</style>
