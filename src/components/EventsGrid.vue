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

    <div v-if="isPending" class="loading-state">
      <div class="spinner"></div>
      <p>Loading events...</p>
    </div>

    <div v-else-if="isError" class="error-state">
      <span class="material-symbols-outlined">error</span>
      <p>{{ error?.message || 'Failed to load events' }}</p>
    </div>

    <div v-else class="events-grid">
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
          <img :src="event.bannerUrl" :alt="event.name" />
          <div class="event-date-badge">
            <div class="day">{{ getDay(event.startsAt) }}</div>
            <div class="month">{{ getMonth(event.startsAt) }}</div>
          </div>
          <div class="event-cat-badge">{{ event.status }}</div>
        </div>

        <div class="event-body">
          <div class="event-title">{{ event.name }}</div>
          <div class="event-desc">{{ event.description }}</div>

          <div class="event-footer">
            <div class="event-meta">
              <span class="material-symbols-outlined">location_on</span>{{ event.address }}
            </div>
            <div class="event-meta">
              <span class="material-symbols-outlined">group</span>{{ event.maxParticipants }}
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
                  <span class="stat-label">Date</span>
                  <span class="stat-value">{{ formatDate(event.startsAt) }} — {{ formatDate(event.endsAt) }}</span>
                </div>
              </div>
              <div class="expanded-stat">
                <span class="material-symbols-outlined">group</span>
                <div>
                  <span class="stat-label">Capacity</span>
                  <span class="stat-value">{{ event.maxParticipants }} participants</span>
                </div>
              </div>
            </div>

            <div class="expanded-status">
              <span class="material-symbols-outlined">info</span>
              <div>
                <span class="stat-label">Status</span>
                <span class="stat-value status-{{ event.status.toLowerCase() }}">{{ event.status }}</span>
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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useEvents } from '@/api/composables/useEvents'

const { t: $t } = useI18n()

const { data: events, isPending, isError, error } = useEvents()

function getDay(iso: string) {
  return new Date(iso).getDate().toString()
}

function getMonth(iso: string) {
  return new Date(iso).toLocaleString('en-US', { month: 'short' }).toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const expandedId = ref<string | null>(null)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

function startExpand(id: string) {
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

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--text-muted);
  gap: 1rem;
}

.error-state .material-symbols-outlined {
  font-size: 2rem;
  color: #ef4444;
}

.loading-state .spinner,
.spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--border-strong);
  border-top-color: var(--emerald);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.expanded-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  padding-bottom: 0.8rem;
}

.expanded-status .material-symbols-outlined {
  font-size: 1rem;
  color: var(--emerald);
  flex-shrink: 0;
}
</style>
