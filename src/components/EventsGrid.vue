<template>
  <section class="section">
    <div class="section-header">
      <div>
        <div class="section-label">{{ $t('events.label') }}</div>
        <h2>{{ $t('events.title') }}</h2>
        <p>{{ $t('events.subtitle') }}</p>
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
          >{{ $t('events.viewAll') }}
          <span class="material-symbols-outlined" style="font-size: 1rem">arrow_forward</span></a
        >
      </div>
    </div>

    <div class="events-grid">
      <RouterLink
        v-for="event in events"
        :key="event.id"
        :to="`/events/${event.id}`"
        class="event-card"
        :class="{ expanded: expandedId === event.id }"
        @mouseenter="startExpand(event.id)"
        @mouseleave="cancelExpand"
      >
        <div class="event-img">
          <img :src="event.img" :alt="event.title" />
          <div class="event-date-badge">
            <div class="day">{{ event.day }}</div>
            <div class="month">{{ event.month }}</div>
          </div>
          <div class="event-cat-badge">{{ event.category }}</div>
        </div>

        <div class="event-body">
          <div class="event-title">{{ event.title }}</div>
          <div class="event-desc">{{ event.description }}</div>

          <div class="event-footer">
            <div class="event-meta">
              <span class="material-symbols-outlined">location_on</span>{{ event.location }}
            </div>
            <div class="event-meta">
              <span class="material-symbols-outlined">group</span>{{ event.attendees }}
            </div>
          </div>

          <!-- Expanded extra info -->
          <div
            class="event-expanded"
            :style="{
              maxHeight: expandedId === event.id ? '220px' : '0px',
              opacity: expandedId === event.id ? '1' : '0',
            }"
          >
            <div class="expanded-divider"></div>

            <div class="expanded-row">
              <div class="expanded-stat">
                <span class="material-symbols-outlined">schedule</span>
                <div>
                  <span class="stat-label">{{ $t('events.duration') }}</span>
                  <span class="stat-value">{{ event.duration }}</span>
                </div>
              </div>
              <div class="expanded-stat">
                <span class="material-symbols-outlined">confirmation_number</span>
                <div>
                  <span class="stat-label">{{ $t('events.price') }}</span>
                  <span class="stat-value">{{ event.price }}</span>
                </div>
              </div>
            </div>

            <div class="expanded-speakers">
              <span class="stat-label">{{ $t('events.speakers') }}</span>
              <div class="speaker-chips">
                <span v-for="s in event.speakers" :key="s" class="speaker-chip">{{ s }}</span>
              </div>
            </div>

            <div class="expanded-cta">
              <span class="material-symbols-outlined">open_in_new</span>
              {{ $t('events.viewDetails') }}
            </div>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="load-more-wrap">
      <button class="btn-outline">{{ $t('events.loadMore') }}</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

interface Event {
  id: number
  title: string
  category: string
  description: string
  location: string
  attendees: string
  day: string
  month: string
  img: string
  duration: string
  price: string
  speakers: string[]
}

const events: Event[] = [
  {
    id: 1,
    title: 'Advanced Design Systems Workshop',
    category: 'Workshop',
    description: 'Master the art of creating scalable components and tokens for enterprise SaaS products.',
    location: 'Creative Hub, Berlin',
    attendees: '120+',
    day: '24',
    month: 'OCT',
    duration: '2 days',
    price: '€ 299',
    speakers: ['Sarah Lin', 'Marc Dubois'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVEXg69OmBIJtNR3IqF1IkrG0CPH2_0Af1rDEpfFzWn9voZFzWNCB1R5POLYYpbboBouxizZ8P6k4NHTrZak33yii-oVxOMssEdiOAqlggWHEKK0KSCR4KELWJJlFRHDKvRQbxMXsYMNx_IperD-GBqzD234n5XE_5T0lF4ARrRe1kPMoCD-nOvd6Bu7lGC1qS91FL0thAzJG0VQSA4Np-Zyq76T4xIdeuuTAMt-h3O8UIDUTRvSJZTCzeST24FFlnIgTJ9CTYJL4W',
  },
  {
    id: 2,
    title: 'Digital Arts & Music Expo',
    category: 'Festival',
    description: 'A sensory journey blending immersive digital installations with global electronic sounds.',
    location: 'Sonar Dome, Barcelona',
    attendees: '2.5k',
    day: '12',
    month: 'NOV',
    duration: '3 days',
    price: '€ 120',
    speakers: ['DJ Hana', 'Collective B', 'Ariel Moss'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnprHnhI17hC3LiratNtLycBIVDQkMPpemyQu_MIyksZ3O5E4hl9uyYPsE08h-ddOJSdF8Bomk5wHmYdkInUp9sBSKqCYbtng6GQPM778EwNkKx1zwgjn6JZpTsbc4orZMKpFJIsYxB7b0pHvzigLY1Vkvptnz4XLsgmzQd0vauHmJfSRkC9R7_KjLA2pPy-twxAGgk_yjEFSCLpRyt_wM_Ol3_AVSkURz476RK9C9De6YBnhMY2ow5p8QFt-Bb-yJkKzhCv1NnNeG',
  },
  {
    id: 3,
    title: 'Executive Leadership Summit',
    category: 'Conference',
    description: 'Strategic insights for the next generation of C-suite executives and change makers.',
    location: 'The Ritz, London',
    attendees: '450',
    day: '05',
    month: 'DEC',
    duration: '1 day',
    price: '£ 850',
    speakers: ['Emma Clarke', 'Tom Reed'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0EsVhNFiWT3J7WpYLxmSsuv8-P65nhn0BBap0n0getaLzYtO20RyZElA30hjaWsV_ArRUP_VEXAu2Lu_TbwPLpfDaf5WmoPnMXoFOMPGitWcFzN4BQx6CkHmHHrTiqZlpk0Ep2M8uUIvpVB-SP-kNuEmxBA5DW0HuHfnFUiyZNry9JlYFg6ad4gFz2UXCe-63xzbXaGjgxn7DUH8JoVCF1pZBa3SGiI962Mp7pnSd1gPAB65MSK52Iovms1qxfuu3xhRfdIf0aJkI',
  },
  {
    id: 4,
    title: "Founder's Supper Club",
    category: 'Networking',
    description: 'An intimate evening of peer-to-peer networking over curated culinary experiences.',
    location: 'SOHO House, NYC',
    attendees: '25',
    day: '18',
    month: 'JAN',
    duration: '4 hours',
    price: '$ 180',
    speakers: ['Alex Vega', 'Rina Park'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOtsljKnV__vIzi1tQZ442lzSofmbhfovLTbHd1qpASPEbXUhVqNhm3WAnf5dAY5yScY6Jld3borL5HU4lYqmb0qnc-ugwSe9OqvUXMUT8YFWGaYbMhl_ip6BSSQDps1hqXG7zh2msTFQ9na7SZxkhspkdag4gC2pFQzlx84BslzXrFJ-APF9_d0Igrcb4j2jNiS4ElBhs5fKCi-0hoZ1C-NisIYYcKTW2B8MtH8wYXOpodnFNe2R0BPDBOoz',
  },
  {
    id: 5,
    title: 'Startup of the Year Awards',
    category: 'Celebration',
    description: 'Celebrating the most innovative startups and disruptive technologies of the season.',
    location: 'Sky Garden, Seoul',
    attendees: '800',
    day: '02',
    month: 'FEB',
    duration: '5 hours',
    price: 'Free',
    speakers: ['Ji-won Oh', 'Nadia Santos', 'Luca Ferrari'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgPxSVs1N7xDQRwybwo6MRhWBsIoVQIzGKy45fogShQG1WI-AjkQOg8ZxRjP6qM7kF7RX78T_16gvYHToLgxBqylPHDMFX5P9nL5Vw7rmCK97moxiGo1aZcUGu_7X-7asYb9DGFixDQEq-QlhULAzhMCOZqhcYAlkDzwyhrUFYxnKcLN7YoMhrg3QIvQz1ayY1zNBOd8cpNI_gMGzKpMAwRYepbCFVNiznM-s1sV9mY4ZeszA7ZjPMmG5lfokpW_y0hzDY4ZN7ZvTH',
  },
  {
    id: 6,
    title: 'Product Strategy Bootcamp',
    category: 'Learning',
    description: 'Intensive 3-day workshop on building high-growth products that users love.',
    location: 'WeWork, San Francisco',
    attendees: '75',
    day: '15',
    month: 'MAR',
    duration: '3 days',
    price: '$ 499',
    speakers: ['Chris Yang', 'Mia Torres'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIHV4UePuMCdBc76zqStUcbX17Nv-o9Sg6ddwYDTnb_uroFWDJnVYRC69SZJ39RouXC71JHXY3xJ8ItJVrWngd4rmYIfqV7Ff9qaxM2h2phcE_cYo-Vvs8rEXpjxyD72FF6desc8BwLcSYiVPxfbQ3tiAgfiYGqAAkz9GhJ0tsuIS6n85Xu3KNPFbpgdcBTQ10cjkxwWUqYy0d1hO_isAk5AH9HQBV7pqI6GN_eN_TRfIhV52me-W9sVe8BFoi8HhkEoE13C_ioWci',
  },
]

const expandedId = ref<number | null>(null)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

function startExpand(id: number) {
  hoverTimer = setTimeout(() => {
    expandedId.value = id
  }, 600)
}

function cancelExpand() {
  if (hoverTimer) clearTimeout(hoverTimer)
  expandedId.value = null
}
</script>

<style scoped>
.section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

@media (max-width: 768px) {
  .section { padding: 3rem 1.2rem; }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
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

.view-all:hover { gap: 0.6rem; }

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

/* ── Grid ── */
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .events-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .events-grid { grid-template-columns: 1fr; }
}

/* ── Card ── */
.event-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: inherit;
}

.event-card:hover {
  border-color: var(--emerald-border);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px var(--emerald-glow);
}

/* ── Imagem ── */
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
  transition: transform 0.5s, filter 0.3s;
}

.event-card:hover .event-img img {
  transform: scale(1.05);
  filter: brightness(0.85) saturate(1);
}

.event-date-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--bg-badge);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 0.35rem 0.7rem;
  text-align: center;
  transition: var(--transition-theme);
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

.event-cat-badge {
  position: absolute;
  bottom: 0.7rem;
  left: 0.8rem;
  background: var(--bg-badge);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-strong);
  border-radius: 6px;
  padding: 0.2rem 0.6rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--emerald);
}

/* ── Body ── */
.event-body { padding: 1.4rem; }

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
  transition: -webkit-line-clamp 0.2s;
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

.event-meta .material-symbols-outlined { font-size: 1rem; }

/* ── Expanded panel (height 0 → auto via max-height trick) ── */
.event-expanded {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 0.3s ease;
  opacity: 0;
}


.expanded-divider {
  height: 1px;
  background: var(--border);
  margin-top: 1rem;
}

.expanded-row {
  display: flex;
  gap: 1.5rem;
  padding: 0.9rem 0 0.7rem;
}

.expanded-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
}

.expanded-stat .material-symbols-outlined {
  font-size: 1rem;
  color: var(--emerald);
  flex-shrink: 0;
}

.stat-label {
  display: block;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-dim);
  line-height: 1;
  margin-bottom: 0.2rem;
}

.stat-value {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}

.expanded-speakers {
  padding-bottom: 0.8rem;
}

.speaker-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.speaker-chip {
  padding: 0.2rem 0.65rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.expanded-cta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--emerald);
  font-size: 0.8rem;
  font-weight: 600;
  padding-top: 0.4rem;
  border-top: 1px solid var(--border);
}

.expanded-cta .material-symbols-outlined { font-size: 0.95rem; }

.load-more-wrap {
  text-align: center;
  margin-top: 3rem;
}
</style>
