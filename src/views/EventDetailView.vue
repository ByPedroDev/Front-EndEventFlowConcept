<template>
  <div class="detail-page">
    <div class="detail-bg-glow"></div>

    <div v-if="isPending" class="detail-state">
      <span class="material-symbols-outlined state-icon">progress_activity</span>
      <p>{{ $t('eventDetail.loading') || 'Loading...' }}</p>
    </div>

    <div v-else-if="isError" class="detail-state">
      <span class="material-symbols-outlined state-icon">error_outline</span>
      <p>{{ error?.message || $t('eventDetail.error') || 'Could not load event' }}</p>
    </div>

    <div v-else-if="!event" class="detail-state">
      <span class="material-symbols-outlined state-icon">search_off</span>
      <p>{{ $t('eventDetail.notFound') || 'Event not found' }}</p>
    </div>

    <template v-else>
      <div class="detail-hero">
        <img :src="event.bannerUrl" :alt="event.name" class="hero-img" />
        <div class="hero-overlay"></div>

        <RouterLink to="/" class="back-btn">
          <span class="material-symbols-outlined">arrow_back</span>
          {{ $t('eventDetail.back') }}
        </RouterLink>

        <div class="hero-content">
          <div class="hero-badges">
            <span class="badge-status" :class="event.status">
              {{ $t(`eventDetail.status.${event.status}`, event.status) }}
            </span>
          </div>
          <h1>{{ event.name }}</h1>
          <div class="hero-meta">
            <span class="hero-meta-item">
              <span class="material-symbols-outlined">calendar_today</span>
              {{ formattedDate }}
            </span>
            <span class="hero-meta-sep">·</span>
            <span class="hero-meta-item">
              <span class="material-symbols-outlined">schedule</span>
              {{ formattedTime }}
            </span>
            <span class="hero-meta-sep">·</span>
            <span class="hero-meta-item">
              <span class="material-symbols-outlined">location_on</span>
              {{ event.address }}
            </span>
          </div>
        </div>
      </div>

      <div class="detail-container">
        <section class="detail-section">
          <h2 class="section-title">{{ $t('eventDetail.about') }}</h2>
          <p class="detail-desc">{{ event.description }}</p>
        </section>

        <section class="detail-section">
          <h2 class="section-title">{{ $t('eventDetail.dateTime') }}</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="material-symbols-outlined info-icon">calendar_today</span>
              <div>
                <div class="info-label">{{ $t('eventDetail.date') }}</div>
                <div class="info-value">{{ fullDate }}</div>
              </div>
            </div>
            <div class="info-item">
              <span class="material-symbols-outlined info-icon">schedule</span>
              <div>
                <div class="info-label">{{ $t('eventDetail.time') }}</div>
                <div class="info-value">{{ formattedTime }}</div>
              </div>
            </div>
            <div class="info-item">
              <span class="material-symbols-outlined info-icon">hourglass_empty</span>
              <div>
                <div class="info-label">{{ $t('eventDetail.duration') }}</div>
                <div class="info-value">{{ duration }}</div>
              </div>
            </div>
            <div class="info-item">
              <span class="material-symbols-outlined info-icon">group</span>
              <div>
                <div class="info-label">{{ $t('eventDetail.capacity') }}</div>
                <div class="info-value">{{ event.maxParticipants }} {{ $t('eventDetail.people') }}</div>
              </div>
            </div>
          </div>
        </section>

        <section class="detail-section">
          <h2 class="section-title">{{ $t('eventDetail.location') }}</h2>
          <div class="location-card">
            <span class="material-symbols-outlined">location_on</span>
            <span class="location-address">{{ event.address }}</span>
          </div>
        </section>

        <div class="detail-actions">
          <button class="btn-register" @click="handleRegister">
            <span class="material-symbols-outlined">confirmation_number</span>
            {{ $t('eventDetail.registerNow') }}
          </button>
          <button class="btn-share" @click="handleShare">
            <span class="material-symbols-outlined">share</span>
            {{ $t('eventDetail.shareEvent') }}
          </button>
        </div>
      </div>

      <!-- Confirm registration modal -->
      <Teleport to="body">
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-card">
            <div v-if="checkinMutation.isSuccess.value" class="modal-body">
              <span class="modal-icon success">check_circle</span>
              <h3 class="modal-title">{{ $t('eventDetail.registered') }}</h3>
              <p class="modal-message">An email with your confirmation was sent. Please confirm it before all vacancies expire.</p>
              <button class="modal-btn" @click="closeModal">OK</button>
            </div>

            <div v-else-if="checkinMutation.isError.value" class="modal-body">
              <span class="modal-icon error">error</span>
              <h3 class="modal-title">{{ $t('eventDetail.error') || 'Error' }}</h3>
              <p class="modal-message">{{ checkinMutation.error.value?.message || 'Something went wrong' }}</p>
              <div class="modal-actions">
                <button class="modal-btn" @click="closeModal">Cancel</button>
                <button class="modal-btn primary" @click="handleConfirmRegistration">Try Again</button>
              </div>
            </div>

            <div v-else class="modal-body">
              <span class="modal-icon">confirmation_number</span>
              <h3 class="modal-title">Confirm Registration</h3>
              <p class="modal-message">An email with your confirmation will be sent. Please confirm it before all vacancies expire.</p>
              <button
                class="modal-btn primary"
                :disabled="checkinMutation.isPending.value"
                @click="handleConfirmRegistration"
              >
                <span v-if="checkinMutation.isPending.value" class="material-symbols-outlined spinning">progress_activity</span>
                <span v-else class="material-symbols-outlined">check</span>
                {{ checkinMutation.isPending.value ? 'Registering...' : 'Confirm Registration' }}
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useEvents, useCheckin } from '@/api/composables/useEvents'
import { useAuthToken } from '@/api/composables/useAuth'

const { t: $t } = useI18n()
const route = useRoute()
const router = useRouter()
const { isAuthenticated } = useAuthToken()

const { data: events, isPending, isError, error } = useEvents()
const checkinMutation = useCheckin()
const showModal = ref(false)

const event = computed(() => {
  if (!events.value) return undefined
  return events.value.find(e => e.id === route.params.id)
})

const formattedDate = computed(() => {
  if (!event.value) return ''
  return new Date(event.value.startsAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

const fullDate = computed(() => {
  if (!event.value) return ''
  return new Date(event.value.startsAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
})

const formattedTime = computed(() => {
  if (!event.value) return ''
  const opts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }
  const s = new Date(event.value.startsAt).toLocaleTimeString('en-US', opts)
  const e = new Date(event.value.endsAt).toLocaleTimeString('en-US', opts)
  return `${s} – ${e}`
})

const duration = computed(() => {
  if (!event.value) return ''
  const diff = new Date(event.value.endsAt).getTime() - new Date(event.value.startsAt).getTime()
  const hours = Math.round(diff / (1000 * 60 * 60))
  if (hours >= 24) {
    const days = Math.round(hours / 24)
    return `${days} day${days > 1 ? 's' : ''}`
  }
  return `${hours} hour${hours > 1 ? 's' : ''}`
})

function handleRegister() {
  if (!event.value) return
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  checkinMutation.reset()
  showModal.value = true
}

function handleConfirmRegistration() {
  if (!event.value) return
  checkinMutation.mutate(event.value.id)
}

function closeModal() {
  showModal.value = false
}

function handleShare() {
  if (!event.value) return
  if (navigator.share) {
    navigator.share({ title: event.value.name, url: window.location.href })
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

/* ── State (loading / error / not-found) ── */
.detail-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: var(--text-muted);
  text-align: center;
  gap: 1rem;
  padding: 2rem;
}

.state-icon {
  font-size: 3rem !important;
  color: var(--emerald);
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
.badge-status.draft     { background: rgba(148,163,184,0.15); color: #94a3b8; border: 1px solid rgba(148,163,184,0.3); }
.badge-status.cancelled { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }

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

/* ── Content ── */
.detail-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
  position: relative;
  z-index: 1;
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

.detail-section:last-of-type {
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
}

/* ── Info grid ── */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.info-icon {
  font-size: 1.2rem !important;
  color: var(--emerald);
  flex-shrink: 0;
}

.info-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-dim);
  line-height: 1;
  margin-bottom: 0.15rem;
}

.info-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}

/* ── Location ── */
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

.location-address {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}

/* ── Actions ── */
.detail-actions {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 2.5rem;
}

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

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-card {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 20px;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-icon {
  font-size: 3rem !important;
  color: var(--emerald);
  margin-bottom: 1rem;
}

.modal-icon.success { color: #10b981; }
.modal-icon.error { color: #ef4444; }

.modal-title {
  font-size: 1.15rem;
  color: var(--text);
  margin-bottom: 0.6rem;
}

.modal-message {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 0.7rem;
  width: 100%;
}

.modal-btn {
  width: 100%;
  padding: 0.75rem;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.2s;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-muted);
}

.modal-btn:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.modal-btn.primary {
  background: var(--emerald);
  color: #fff;
  border: none;
  box-shadow: 0 0 20px var(--emerald-glow);
}

.modal-btn.primary:hover {
  background: var(--emerald-dim);
}

.modal-btn.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.modal-btn .material-symbols-outlined { font-size: 1rem; }

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinning {
  animation: spin 1s linear infinite;
}
</style>
