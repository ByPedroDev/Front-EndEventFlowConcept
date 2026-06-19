<template>
  <div class="detail-page">
    <div class="detail-bg-glow"></div>

    <!-- Hero -->
    <div class="detail-hero">
      <img :src="event.img" :alt="event.title" class="hero-img" />
      <div class="hero-overlay"></div>

      <RouterLink to="/" class="back-btn">
        <span class="material-symbols-outlined">arrow_back</span>
        {{ $t('eventDetail.back') }}
      </RouterLink>

      <div class="hero-content">
        <div class="hero-badges">
          <span class="badge-cat">{{ event.category }}</span>
          <span class="badge-status" :class="event.status">{{ $t(`eventDetail.status.${event.status}`, $t('eventDetail.status.open')) }}</span>
        </div>
        <h1>{{ event.title }}</h1>
        <div class="hero-meta">
          <span class="hero-meta-item">
            <span class="material-symbols-outlined">calendar_today</span>
            {{ event.day }} {{ event.monthFull }} {{ event.year }}
          </span>
          <span class="hero-meta-sep">·</span>
          <span class="hero-meta-item">
            <span class="material-symbols-outlined">schedule</span>
            {{ event.time }}
          </span>
          <span class="hero-meta-sep">·</span>
          <span class="hero-meta-item">
            <span class="material-symbols-outlined">location_on</span>
            {{ event.location }}
          </span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="detail-container">
      <div class="detail-layout">

        <!-- Main column -->
        <div class="detail-main">

          <!-- About -->
          <section class="detail-section">
            <h2 class="section-title">{{ $t('eventDetail.about') }}</h2>
            <p class="detail-desc">{{ event.description }}</p>
            <p class="detail-desc">{{ event.descriptionLong }}</p>
          </section>

          <!-- What to expect -->
          <section class="detail-section">
            <h2 class="section-title">{{ $t('eventDetail.whatToExpect') }}</h2>
            <div class="highlights-grid">
              <div v-for="h in event.highlights" :key="h.label" class="highlight-card">
                <span class="material-symbols-outlined highlight-icon">{{ h.icon }}</span>
                <div>
                  <div class="highlight-label">{{ h.label }}</div>
                  <div class="highlight-value">{{ h.value }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Speakers -->
          <section class="detail-section">
            <h2 class="section-title">{{ $t('eventDetail.speakers') }}</h2>
            <div class="speakers-list">
              <div v-for="s in event.speakerDetails" :key="s.name" class="speaker-card">
                <div class="speaker-avatar">{{ s.initials }}</div>
                <div>
                  <div class="speaker-name">{{ s.name }}</div>
                  <div class="speaker-role">{{ s.role }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Location -->
          <section class="detail-section">
            <h2 class="section-title">{{ $t('eventDetail.location') }}</h2>
            <div class="location-card">
              <span class="material-symbols-outlined">location_on</span>
              <div>
                <div class="location-name">{{ event.venueName }}</div>
                <div class="location-address">{{ event.location }}</div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="detail-sidebar">
          <div class="ticket-card">
            <div class="ticket-header">
              <div class="ticket-price">{{ event.price }}</div>
              <div class="ticket-label">{{ $t('eventDetail.perPerson') }}</div>
            </div>

            <div class="ticket-info">
              <div class="ticket-row">
                <span class="material-symbols-outlined">calendar_today</span>
                <div>
                  <span class="t-label">{{ $t('eventDetail.date') }}</span>
                  <span class="t-value">{{ event.day }} {{ event.monthFull }}, {{ event.year }}</span>
                </div>
              </div>
              <div class="ticket-row">
                <span class="material-symbols-outlined">schedule</span>
                <div>
                  <span class="t-label">{{ $t('eventDetail.time') }}</span>
                  <span class="t-value">{{ event.time }}</span>
                </div>
              </div>
              <div class="ticket-row">
                <span class="material-symbols-outlined">hourglass_empty</span>
                <div>
                  <span class="t-label">{{ $t('eventDetail.duration') }}</span>
                  <span class="t-value">{{ event.duration }}</span>
                </div>
              </div>
              <div class="ticket-row">
                <span class="material-symbols-outlined">group</span>
                <div>
                  <span class="t-label">{{ $t('eventDetail.attendees') }}</span>
                  <span class="t-value">{{ event.attendees }} {{ $t('eventDetail.registered') }}</span>
                </div>
              </div>
            </div>

            <div class="capacity-bar-wrap">
              <div class="capacity-bar-labels">
                <span>{{ $t('eventDetail.spotsLeft') }}</span>
                <span class="capacity-num">{{ event.spotsLeft }}</span>
              </div>
              <div class="capacity-bar">
                <div class="capacity-fill" :style="{ width: event.capacityPct + '%' }"></div>
              </div>
            </div>

            <button class="btn-register" @click="handleRegister">
              <span class="material-symbols-outlined">confirmation_number</span>
              {{ $t('eventDetail.registerNow') }}
            </button>

            <button class="btn-share" @click="handleShare">
              <span class="material-symbols-outlined">share</span>
              {{ $t('eventDetail.shareEvent') }}
            </button>
          </div>

          <!-- Tags -->
          <div class="tags-wrap">
            <span v-for="tag in event.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const route = useRoute()
const id = Number(route.params.id)

const allEvents = [
  {
    id: 1,
    title: 'Advanced Design Systems Workshop',
    category: 'Workshop',
    description: 'Master the art of creating scalable components and tokens for enterprise SaaS products.',
    descriptionLong: 'This intensive workshop is designed for senior designers and front-end engineers who want to level up their design system skills. You will work hands-on with real component libraries, explore tokenization strategies, and learn how to build for accessibility and theme-ability from day one.',
    location: 'Creative Hub, Berlin',
    venueName: 'Creative Hub Berlin',
    attendees: '120+',
    day: '24',
    month: 'OCT',
    monthFull: 'October',
    year: '2025',
    time: '09:00 – 18:00',
    duration: '2 days',
    price: '€ 299',
    status: 'published',
    statusLabel: 'Open',
    spotsLeft: '32 / 120',
    capacityPct: 73,
    speakers: ['Sarah Lin', 'Marc Dubois'],
    speakerDetails: [
      { name: 'Sarah Lin', role: 'Head of Design @ Figma', initials: 'SL' },
      { name: 'Marc Dubois', role: 'System Architect @ Shopify', initials: 'MD' },
    ],
    highlights: [
      { icon: 'devices', label: 'Format', value: 'In-person + Live stream' },
      { icon: 'quiz', label: 'Level', value: 'Intermediate / Advanced' },
      { icon: 'workspace_premium', label: 'Certificate', value: 'Yes, included' },
      { icon: 'lunch_dining', label: 'Meals', value: 'Lunch provided' },
    ],
    tags: ['Design Systems', 'Figma', 'Tokens', 'Frontend', 'Workshop'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVEXg69OmBIJtNR3IqF1IkrG0CPH2_0Af1rDEpfFzWn9voZFzWNCB1R5POLYYpbboBouxizZ8P6k4NHTrZak33yii-oVxOMssEdiOAqlggWHEKK0KSCR4KELWJJlFRHDKvRQbxMXsYMNx_IperD-GBqzD234n5XE_5T0lF4ARrRe1kPMoCD-nOvd6Bu7lGC1qS91FL0thAzJG0VQSA4Np-Zyq76T4xIdeuuTAMt-h3O8UIDUTRvSJZTCzeST24FFlnIgTJ9CTYJL4W',
  },
  {
    id: 2,
    title: 'Digital Arts & Music Expo',
    category: 'Festival',
    description: 'A sensory journey blending immersive digital installations with global electronic sounds.',
    descriptionLong: 'Three days of continuous creative programming featuring interactive art installations, live music performances, and workshops from some of the world\'s most innovative digital artists. The expo spans three interconnected venues across the Sonar district.',
    location: 'Sonar Dome, Barcelona',
    venueName: 'Sonar Dome',
    attendees: '2.5k',
    day: '12',
    month: 'NOV',
    monthFull: 'November',
    year: '2025',
    time: '12:00 – 02:00',
    duration: '3 days',
    price: '€ 120',
    status: 'published',
    statusLabel: 'Open',
    spotsLeft: '840 / 2500',
    capacityPct: 66,
    speakers: ['DJ Hana', 'Collective B', 'Ariel Moss'],
    speakerDetails: [
      { name: 'DJ Hana', role: 'Electronic Music Producer', initials: 'DH' },
      { name: 'Collective B', role: 'Digital Art Studio', initials: 'CB' },
      { name: 'Ariel Moss', role: 'Immersive Experience Designer', initials: 'AM' },
    ],
    highlights: [
      { icon: 'music_note', label: 'Performances', value: '40+ live acts' },
      { icon: 'palette', label: 'Installations', value: '15 interactive' },
      { icon: 'restaurant', label: 'Food & Drink', value: 'Full bar & food village' },
      { icon: 'camera', label: 'Photo Policy', value: 'Photography welcome' },
    ],
    tags: ['Music', 'Digital Art', 'Festival', 'Electronic', 'Barcelona'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnprHnhI17hC3LiratNtLycBIVDQkMPpemyQu_MIyksZ3O5E4hl9uyYPsE08h-ddOJSdF8Bomk5wHmYdkInUp9sBSKqCYbtng6GQPM778EwNkKx1zwgjn6JZpTsbc4orZMKpFJIsYxB7b0pHvzigLY1Vkvptnz4XLsgmzQd0vauHmJfSRkC9R7_KjLA2pPy-twxAGgk_yjEFSCLpRyt_wM_Ol3_AVSkURz476RK9C9De6YBnhMY2ow5p8QFt-Bb-yJkKzhCv1NnNeG',
  },
  {
    id: 3,
    title: 'Executive Leadership Summit',
    category: 'Conference',
    description: 'Strategic insights for the next generation of C-suite executives and change makers.',
    descriptionLong: 'A full day of curated keynotes, panel debates and closed-door roundtables tackling the challenges facing modern business leadership. Attendees represent Fortune 500 companies, scale-ups and government agencies from across 30 countries.',
    location: 'The Ritz, London',
    venueName: 'The Ritz London',
    attendees: '450',
    day: '05',
    month: 'DEC',
    monthFull: 'December',
    year: '2025',
    time: '08:30 – 20:00',
    duration: '1 day',
    price: '£ 850',
    status: 'published',
    statusLabel: 'Open',
    spotsLeft: '78 / 450',
    capacityPct: 83,
    speakers: ['Emma Clarke', 'Tom Reed'],
    speakerDetails: [
      { name: 'Emma Clarke', role: 'CEO @ Meridian Group', initials: 'EC' },
      { name: 'Tom Reed', role: 'Former CTO @ Goldman Sachs', initials: 'TR' },
    ],
    highlights: [
      { icon: 'mic', label: 'Keynotes', value: '8 world-class speakers' },
      { icon: 'handshake', label: 'Networking', value: 'Dedicated sessions' },
      { icon: 'dinner_dining', label: 'Gala Dinner', value: 'Included' },
      { icon: 'article', label: 'Materials', value: 'Exclusive playbook' },
    ],
    tags: ['Leadership', 'Strategy', 'Executive', 'Conference', 'London'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0EsVhNFiWT3J7WpYLxmSsuv8-P65nhn0BBap0n0getaLzYtO20RyZElA30hjaWsV_ArRUP_VEXAu2Lu_TbwPLpfDaf5WmoPnMXoFOMPGitWcFzN4BQx6CkHmHHrTiqZlpk0Ep2M8uUIvpVB-SP-kNuEmxBA5DW0HuHfnFUiyZNry9JlYFg6ad4gFz2UXCe-63xzbXaGjgxn7DUH8JoVCF1pZBa3SGiI962Mp7pnSd1gPAB65MSK52Iovms1qxfuu3xhRfdIf0aJkI',
  },
  {
    id: 4,
    title: "Founder's Supper Club",
    category: 'Networking',
    description: 'An intimate evening of peer-to-peer networking over curated culinary experiences.',
    descriptionLong: 'A carefully curated dinner bringing together 25 founders and operators in a private setting. The format is designed to spark genuine conversations — no pitch decks, no name badges, just founders talking to founders over exceptional food and wine.',
    location: 'SOHO House, NYC',
    venueName: 'SOHO House New York',
    attendees: '25',
    day: '18',
    month: 'JAN',
    monthFull: 'January',
    year: '2026',
    time: '19:00 – 23:00',
    duration: '4 hours',
    price: '$ 180',
    status: 'published',
    statusLabel: 'Limited',
    spotsLeft: '4 / 25',
    capacityPct: 84,
    speakers: ['Alex Vega', 'Rina Park'],
    speakerDetails: [
      { name: 'Alex Vega', role: 'Founder @ Launchpad.io', initials: 'AV' },
      { name: 'Rina Park', role: 'Partner @ Sequoia Capital', initials: 'RP' },
    ],
    highlights: [
      { icon: 'diversity_3', label: 'Format', value: 'Intimate roundtable' },
      { icon: 'wine_bar', label: 'Includes', value: 'Dinner + open bar' },
      { icon: 'lock', label: 'Access', value: 'Application required' },
      { icon: 'star', label: 'Capacity', value: '25 founders max' },
    ],
    tags: ['Networking', 'Founders', 'Startups', 'NYC', 'Dinner'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOtsljKnV__vIzi1tQZ442lzSofmbhfovLTbHd1qpASPEbXUhVqNhm3WAnf5dAY5yScY6Jld3borL5HU4lYqmb0qnc-ugwSe9OqvUXMUT8YFWGaYbMhl_ip6BSSQDps1hqXG7zh2msTFQ9na7SZxkhspkdag4gC2pFQzlx84BslzXrFJ-APF9_d0Igrcb4j2jNiS4ElBhs5fKCi-0hoZ1C-NisIYYcKTW2B8MtH8wYXOpodnFNe2R0BPDBOoz',
  },
  {
    id: 5,
    title: 'Startup of the Year Awards',
    category: 'Celebration',
    description: 'Celebrating the most innovative startups and disruptive technologies of the season.',
    descriptionLong: 'The annual Startup of the Year Awards recognises the most impactful new companies across 12 categories, from DeepTech to Climate. Join 800 attendees for a night of celebration, live demos, and an after-party on the rooftop of Sky Garden.',
    location: 'Sky Garden, Seoul',
    venueName: 'Sky Garden Seoul',
    attendees: '800',
    day: '02',
    month: 'FEB',
    monthFull: 'February',
    year: '2026',
    time: '18:00 – 00:00',
    duration: '6 hours',
    price: 'Free',
    status: 'published',
    statusLabel: 'Open',
    spotsLeft: '312 / 800',
    capacityPct: 61,
    speakers: ['Ji-won Oh', 'Nadia Santos', 'Luca Ferrari'],
    speakerDetails: [
      { name: 'Ji-won Oh', role: 'Minister of Digital Innovation, Korea', initials: 'JO' },
      { name: 'Nadia Santos', role: 'CEO @ ClimateTech Ventures', initials: 'NS' },
      { name: 'Luca Ferrari', role: 'Partner @ Index Ventures', initials: 'LF' },
    ],
    highlights: [
      { icon: 'emoji_events', label: 'Categories', value: '12 award categories' },
      { icon: 'rocket_launch', label: 'Live Demos', value: '20 finalist pitches' },
      { icon: 'celebration', label: 'After-party', value: 'Rooftop Sky Garden' },
      { icon: 'live_tv', label: 'Livestream', value: 'Free global access' },
    ],
    tags: ['Startups', 'Awards', 'Innovation', 'Free', 'Seoul'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgPxSVs1N7xDQRwybwo6MRhWBsIoVQIzGKy45fogShQG1WI-AjkQOg8ZxRjP6qM7kF7RX78T_16gvYHToLgxBqylPHDMFX5P9nL5Vw7rmCK97moxiGo1aZcUGu_7X-7asYb9DGFixDQEq-QlhULAzhMCOZqhcYAlkDzwyhrUFYxnKcLN7YoMhrg3QIvQz1ayY1zNBOd8cpNI_gMGzKpMAwRYepbCFVNiznM-s1sV9mY4ZeszA7ZjPMmG5lfokpW_y0hzDY4ZN7ZvTH',
  },
  {
    id: 6,
    title: 'Product Strategy Bootcamp',
    category: 'Learning',
    description: 'Intensive 3-day workshop on building high-growth products that users love.',
    descriptionLong: 'A cohort-based bootcamp limited to 75 participants. Each day covers a distinct pillar: discovery & research, roadmap & prioritisation, and growth loops. You\'ll leave with a complete product strategy document for your own product, reviewed by industry mentors.',
    location: 'WeWork, San Francisco',
    venueName: 'WeWork SOMA',
    attendees: '75',
    day: '15',
    month: 'MAR',
    monthFull: 'March',
    year: '2026',
    time: '09:00 – 17:00',
    duration: '3 days',
    price: '$ 499',
    status: 'published',
    statusLabel: 'Open',
    spotsLeft: '28 / 75',
    capacityPct: 63,
    speakers: ['Chris Yang', 'Mia Torres'],
    speakerDetails: [
      { name: 'Chris Yang', role: 'VP Product @ Linear', initials: 'CY' },
      { name: 'Mia Torres', role: 'Product Lead @ Stripe', initials: 'MT' },
    ],
    highlights: [
      { icon: 'groups', label: 'Cohort', value: '75 participants max' },
      { icon: 'person', label: 'Mentorship', value: '1:1 sessions included' },
      { icon: 'description', label: 'Output', value: 'Your own strategy doc' },
      { icon: 'workspace_premium', label: 'Certificate', value: 'Yes, on completion' },
    ],
    tags: ['Product', 'Strategy', 'Bootcamp', 'Growth', 'San Francisco'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIHV4UePuMCdBc76zqStUcbX17Nv-o9Sg6ddwYDTnb_uroFWDJnVYRC69SZJ39RouXC71JHXY3xJ8ItJVrWngd4rmYIfqV7Ff9qaxM2h2phcE_cYo-Vvs8rEXpjxyD72FF6desc8BwLcSYiVPxfbQ3tiAgfiYGqAAkz9GhJ0tsuIS6n85Xu3KNPFbpgdcBTQ10cjkxwWUqYy0d1hO_isAk5AH9HQBV7pqI6GN_eN_TRfIhV52me-W9sVe8BFoi8HhkEoE13C_ioWci',
  },
]

const event = computed(() => allEvents.find(e => e.id === id) ?? allEvents[0]!)

function handleRegister() {
  console.log('Register for event:', event.value.id)
}

function handleShare() {
  if (navigator.share) {
    navigator.share({ title: event.value.title, url: window.location.href })
  } else {
    navigator.clipboard.writeText(window.location.href)
  }
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: var(--bg);
  position: relative;
}

.detail-bg-glow {
  position: fixed;
  top: -200px;
  right: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── Hero ── */
.detail-hero {
  position: relative;
  height: clamp(320px, 50vh, 480px);
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5) saturate(0.8);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg) 0%, transparent 60%);
}

.back-btn {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.45rem 1rem 0.45rem 0.7rem;
  border-radius: 30px;
  transition: background 0.2s, color 0.2s;
  z-index: 2;
}

.back-btn .material-symbols-outlined { font-size: 1rem; }
.back-btn:hover { background: rgba(0, 0, 0, 0.55); color: #fff; }

.hero-content {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 2;
}

.hero-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.badge-cat {
  padding: 0.2rem 0.75rem;
  background: var(--emerald-glow);
  border: 1px solid var(--emerald-border);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--emerald);
}

.badge-status {
  padding: 0.2rem 0.75rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.badge-status.published { background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
.badge-status.started   { background: rgba(59,130,246,0.15); color: #3b82f6; border: 1px solid rgba(59,130,246,0.3); }
.badge-status.finished  { background: rgba(139,92,246,0.15); color: #8b5cf6; border: 1px solid rgba(139,92,246,0.3); }

.hero-content h1 {
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  color: #fff;
  margin-bottom: 0.8rem;
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  line-height: 1.15;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.hero-meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(255,255,255,0.75);
  font-size: 0.85rem;
  font-weight: 500;
}

.hero-meta-item .material-symbols-outlined { font-size: 0.95rem; color: var(--emerald); }
.hero-meta-sep { color: rgba(255,255,255,0.3); }

/* ── Layout ── */
.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
  position: relative;
  z-index: 1;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 960px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
  .detail-sidebar {
    order: -1;
  }
}

@media (max-width: 640px) {
  .detail-container { padding: 2rem 1.2rem 4rem; }
  .hero-content { left: 1.2rem; right: 1.2rem; }
  .back-btn { top: 1rem; left: 1rem; }
}

/* ── Sections ── */
.detail-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border);
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-title {
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 1rem;
}

.detail-desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.7;
  margin-bottom: 0.8rem;
}

.detail-desc:last-child { margin-bottom: 0; }

/* highlights */
.highlights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.highlight-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.highlight-icon {
  font-size: 1.2rem !important;
  color: var(--emerald);
  flex-shrink: 0;
}

.highlight-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.2rem;
}

.highlight-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}

/* speakers */
.speakers-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.speaker-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: border-color 0.2s;
}

.speaker-card:hover { border-color: var(--emerald-border); }

.speaker-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--emerald-glow);
  border: 1px solid var(--emerald-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--emerald);
  flex-shrink: 0;
}

.speaker-name {
  font-weight: 600;
  color: var(--text);
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.speaker-role {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* location */
.location-card {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 1rem 1.2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.location-card .material-symbols-outlined {
  font-size: 1.2rem;
  color: var(--emerald);
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.location-name {
  font-weight: 600;
  color: var(--text);
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.location-address {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* ── Sidebar / Ticket card ── */
.detail-sidebar {
  position: sticky;
  top: 1.5rem;
}

.ticket-card {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 20px;
  padding: 1.8rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.ticket-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.ticket-price {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--emerald);
  line-height: 1;
  margin-bottom: 0.3rem;
}

.ticket-label {
  font-size: 0.78rem;
  color: var(--text-dim);
  font-weight: 500;
}

.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.4rem;
}

.ticket-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-muted);
}

.ticket-row .material-symbols-outlined {
  font-size: 1.05rem;
  color: var(--emerald);
  flex-shrink: 0;
}

.t-label {
  display: block;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-dim);
  line-height: 1;
  margin-bottom: 0.15rem;
}

.t-value {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}

/* capacity bar */
.capacity-bar-wrap {
  margin-bottom: 1.4rem;
}

.capacity-bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.capacity-num { font-weight: 600; color: var(--emerald); }

.capacity-bar {
  height: 5px;
  background: var(--bg-elevated);
  border-radius: 10px;
  overflow: hidden;
}

.capacity-fill {
  height: 100%;
  background: var(--emerald);
  border-radius: 10px;
  transition: width 1s ease;
}

/* buttons */
.btn-register {
  width: 100%;
  padding: 0.9rem;
  background: var(--emerald);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  box-shadow: 0 0 30px var(--emerald-glow);
  margin-bottom: 0.7rem;
}

.btn-register .material-symbols-outlined { font-size: 1rem; }
.btn-register:hover {
  background: var(--emerald-dim);
  transform: translateY(-1px);
  box-shadow: 0 0 40px rgba(16,185,129,0.4);
}

.btn-share {
  width: 100%;
  padding: 0.75rem;
  background: var(--bg-elevated);
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-share .material-symbols-outlined { font-size: 1rem; }
.btn-share:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

/* tags */
.tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.2rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.75rem;
  color: var(--text-muted);
  cursor: default;
  transition: all 0.2s;
}

.tag:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
}
</style>
