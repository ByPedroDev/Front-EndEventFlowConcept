<template>
  <section class="speakers-section">
    <div class="section-inner">
      <div class="section-header">
        <div>
          <div class="section-label">{{ $t('featured.label') }}</div>
          <h2>{{ $t('featured.title') }}</h2>
          <p>{{ $t('featured.subtitle') }}</p>
        </div>
        <a href="#" class="view-all">
          {{ $t('featured.viewAll') }}
          <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>

    <div class="coverflow-scene" @keydown.left="prev" @keydown.right="next" tabindex="0">
      <div class="coverflow-track">
        <RouterLink
          v-for="(event, i) in events"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="speaker-card"
          :class="{ active: i === current }"
          :style="cardStyle(i)"
          @click.prevent="i !== current ? (current = i) : undefined"
        >
          <div class="card-img">
            <img :src="event.img" :alt="event.title" />
            <div class="card-img-fade"></div>
            <div class="card-date-badge">
              <div class="day">{{ event.day }}</div>
              <div class="month">{{ event.month }}</div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-cat">{{ event.category }}</div>
            <div class="card-name">{{ event.title }}</div>
            <div class="card-role">
              <span class="material-symbols-outlined">location_on</span>
              {{ event.location }}
            </div>
            <div class="card-topic">{{ event.price }}</div>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="coverflow-nav">
      <button class="nav-btn" @click="prev">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <div class="nav-dots">
        <span
          v-for="(_, i) in events"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="current = i"
        ></span>
      </div>
      <button class="nav-btn" @click="next">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const events = [
  {
    id: 1,
    title: 'Advanced Design Systems Workshop',
    category: 'Workshop',
    location: 'Creative Hub, Berlin',
    day: '24',
    month: 'OCT',
    price: '€ 299',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVEXg69OmBIJtNR3IqF1IkrG0CPH2_0Af1rDEpfFzWn9voZFzWNCB1R5POLYYpbboBouxizZ8P6k4NHTrZak33yii-oVxOMssEdiOAqlggWHEKK0KSCR4KELWJJlFRHDKvRQbxMXsYMNx_IperD-GBqzD234n5XE_5T0lF4ARrRe1kPMoCD-nOvd6Bu7lGC1qS91FL0thAzJG0VQSA4Np-Zyq76T4xIdeuuTAMt-h3O8UIDUTRvSJZTCzeST24FFlnIgTJ9CTYJL4W',
  },
  {
    id: 2,
    title: 'Digital Arts & Music Expo',
    category: 'Festival',
    location: 'Sonar Dome, Barcelona',
    day: '12',
    month: 'NOV',
    price: '€ 120',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnprHnhI17hC3LiratNtLycBIVDQkMPpemyQu_MIyksZ3O5E4hl9uyYPsE08h-ddOJSdF8Bomk5wHmYdkInUp9sBSKqCYbtng6GQPM778EwNkKx1zwgjn6JZpTsbc4orZMKpFJIsYxB7b0pHvzigLY1Vkvptnz4XLsgmzQd0vauHmJfSRkC9R7_KjLA2pPy-twxAGgk_yjEFSCLpRyt_wM_Ol3_AVSkURz476RK9C9De6YBnhMY2ow5p8QFt-Bb-yJkKzhCv1NnNeG',
  },
  {
    id: 3,
    title: 'Executive Leadership Summit',
    category: 'Conference',
    location: 'The Ritz, London',
    day: '05',
    month: 'DEC',
    price: '£ 850',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0EsVhNFiWT3J7WpYLxmSsuv8-P65nhn0BBap0n0getaLzYtO20RyZElA30hjaWsV_ArRUP_VEXAu2Lu_TbwPLpfDaf5WmoPnMXoFOMPGitWcFzN4BQx6CkHmHHrTiqZlpk0Ep2M8uUIvpVB-SP-kNuEmxBA5DW0HuHfnFUiyZNry9JlYFg6ad4gFz2UXCe-63xzbXaGjgxn7DUH8JoVCF1pZBa3SGiI962Mp7pnSd1gPAB65MSK52Iovms1qxfuu3xhRfdIf0aJkI',
  },
  {
    id: 4,
    title: "Founder's Supper Club",
    category: 'Networking',
    location: 'SOHO House, NYC',
    day: '18',
    month: 'JAN',
    price: '$ 180',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOtsljKnV__vIzi1tQZ442lzSofmbhfovLTbHd1qpASPEbXUhVqNhm3WAnf5dAY5yScY6Jld3borL5HU4lYqmb0qnc-ugwSe9OqvUXMUT8YFWGaYbMhl_ip6BSSQDps1hqXG7zh2msTFQ9na7SZxkhspkdag4gC2pFQzlx84BslzXrFJ-APF9_d0Igrcb4j2jNiS4ElBhs5fKCi-0hoZ1C-NisIYYcKTW2B8MtH8wYXOpodnFNe2R0BPDBOoz',
  },
  {
    id: 5,
    title: 'Startup of the Year Awards',
    category: 'Celebration',
    location: 'Sky Garden, Seoul',
    day: '02',
    month: 'FEB',
    price: 'Free',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgPxSVs1N7xDQRwybwo6MRhWBsIoVQIzGKy45fogShQG1WI-AjkQOg8ZxRjP6qM7kF7RX78T_16gvYHToLgxBqylPHDMFX5P9nL5Vw7rmCK97moxiGo1aZcUGu_7X-7asYb9DGFixDQEq-QlhULAzhMCOZqhcYAlkDzwyhrUFYxnKcLN7YoMhrg3QIvQz1ayY1zNBOd8cpNI_gMGzKpMAwRYepbCFVNiznM-s1sV9mY4ZeszA7ZjPMmG5lfokpW_y0hzDY4ZN7ZvTH',
  },
]

const current = ref(2)

function prev() {
  current.value = (current.value - 1 + events.length) % events.length
}
function next() {
  current.value = (current.value + 1) % events.length
}

const isMobile = ref(window.innerWidth <= 640)
const onResize = () => { isMobile.value = window.innerWidth <= 640 }
window.addEventListener('resize', onResize)
onUnmounted(() => window.removeEventListener('resize', onResize))

const CARD_W = 320
const GAP = 80
const CARD_W_MOBILE = 220
const GAP_MOBILE = 28

function cardStyle(i: number): Record<string, string | number> {
  const offset = i - current.value
  const abs = Math.abs(offset)

  if (isMobile.value) {
    const tx = offset * (CARD_W_MOBILE + GAP_MOBILE)
    const scale = abs === 0 ? 1 : Math.max(0.82, 1 - abs * 0.1)
    const opacity = abs > 1 ? 0 : abs === 1 ? 0.5 : 1
    return {
      transform: `translateX(${tx}px) scale(${scale})`,
      zIndex: 20 - abs,
      opacity,
      pointerEvents: abs > 1 ? 'none' : 'auto',
      width: `${CARD_W_MOBILE}px`,
    }
  }

  const tx = offset * (CARD_W * 0.52 + GAP)
  const tz = abs === 0 ? 0 : -abs * 120
  const ry = offset === 0 ? 0 : offset < 0 ? 38 : -38
  const scale = offset === 0 ? 1 : Math.max(0.7, 1 - abs * 0.13)

  return {
    transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
    zIndex: 20 - abs,
    opacity: abs > 2 ? 0 : 1,
    pointerEvents: abs > 2 ? 'none' : 'auto',
  }
}
</script>

<style scoped>
.speakers-section {
  background: linear-gradient(180deg, var(--bg) 0%, var(--speakers-mid) 50%, var(--bg) 100%);
  padding: 5rem 0 4rem;
  overflow: hidden;
  transition: var(--transition-theme);
}

.section-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3.5rem;
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

.view-all .material-symbols-outlined { font-size: 1rem; }
.view-all:hover { gap: 0.6rem; }

/* ── Coverflow scene ── */
.coverflow-scene {
  position: relative;
  width: 100%;
  height: 500px;
  perspective: 1400px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
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

/* ── Cards ── */
.speaker-card {
  position: absolute;
  width: 320px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
  transition:
    transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.4s,
    border-color 0.3s,
    box-shadow 0.4s;
  transform-style: preserve-3d;
  user-select: none;
  will-change: transform;
}

.speaker-card:not(.active) {
  filter: brightness(0.5) saturate(0.5);
}

.speaker-card.active {
  border-color: var(--emerald-border);
  box-shadow:
    0 0 0 1px var(--emerald-border),
    0 30px 80px rgba(0, 0, 0, 0.9),
    0 0 60px rgba(16, 185, 129, 0.2);
  cursor: default;
}

.card-img {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.speaker-card.active .card-img img {
  transform: scale(1.05);
}

.card-img-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg-card) 0%, transparent 55%);
  transition: var(--transition-theme);
}

.card-date-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.25rem 0.55rem;
  text-align: center;
}

.card-date-badge .day {
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: var(--emerald);
  line-height: 1;
}

.card-date-badge .month {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
}

.card-body {
  padding: 1.2rem 1.4rem 1.5rem;
}

.card-cat {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--emerald);
  margin-bottom: 0.4rem;
}

.card-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 0.35rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-role {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.9rem;
}

.card-role .material-symbols-outlined {
  font-size: 0.85rem;
  color: var(--emerald);
}

.card-topic {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.45rem 0.8rem;
  font-size: 0.8rem;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  color: var(--emerald);
  transition: background 0.3s, border-color 0.3s;
}

.speaker-card.active .card-topic {
  background: var(--emerald-glow);
  border-color: var(--emerald-border);
}

@media (max-width: 640px) {
  .section-inner { padding: 0 1.2rem; }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .coverflow-scene {
    height: 400px;
    perspective: 800px;
  }
}

/* ── Nav ── */
.coverflow-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.nav-btn {
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
}

.nav-btn .material-symbols-outlined { font-size: 1.3rem; }
.nav-btn:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
  background: var(--emerald-glow);
}

.nav-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-dim);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  width: 22px;
  border-radius: 3px;
  background: var(--emerald);
}
</style>
