<template>
  <div class="create-page">
    <div class="create-bg-glow"></div>

    <RouterLink to="/" class="back-btn">
      <span class="material-symbols-outlined">arrow_back</span>
      {{ $t('createEvent.back') }}
    </RouterLink>

    <div class="create-container">
      <!-- Header -->
      <div class="page-header">
        <div class="logo">EventFlow<span class="logo-dot">.</span></div>
        <h1>{{ $t('createEvent.title') }}</h1>
        <p>{{ $t('createEvent.subtitle') }}</p>
      </div>

      <!-- Step indicator -->
      <div class="step-indicator">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="step-item"
          :class="{ active: i === currentStep, done: i < currentStep }"
          @click="goToStep(i)"
        >
          <div class="step-circle">
            <span v-if="i < currentStep" class="material-symbols-outlined">check</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="step-label">{{ step.label }}</span>
        </div>
        <div class="step-line">
          <div class="step-line-fill" :style="{ width: progressWidth }"></div>
        </div>
      </div>

      <!-- Card com os steps -->
      <div class="form-card">

          <!-- Step 1: Sobre o Evento -->
          <div v-if="currentStep === 0" key="0" class="step-content" :class="{ 'slide-right': slideRight }">
            <div class="step-header">
              <span class="step-icon">🎯</span>
              <div>
                <h2>{{ $t('createEvent.steps.about') }}</h2>
                <p>{{ $t('createEvent.fields.eventNamePlaceholder') }}</p>
              </div>
            </div>
            <div class="fields">
              <div class="form-group">
                <label>{{ $t('createEvent.fields.eventName') }} <span class="required">*</span></label>
                <div class="input-wrap">
                  <span class="material-symbols-outlined input-icon">edit</span>
                  <input
                    v-model="form.nome"
                    type="text"
                    :placeholder="$t('createEvent.fields.eventNamePlaceholder')"
                    class="form-input"
                    required
                    maxlength="100"
                  />
                  <span class="char-count">{{ form.nome.length }}/100</span>
                </div>
              </div>

              <div class="form-group">
                <label>{{ $t('createEvent.fields.description') }} <span class="required">*</span></label>
                <div class="textarea-wrap">
                  <textarea
                    v-model="form.descricao"
                    :placeholder="$t('createEvent.fields.descriptionPlaceholder')"
                    class="form-textarea"
                    rows="5"
                    maxlength="1000"
                  ></textarea>
                  <span class="char-count textarea-count">{{ form.descricao.length }}/1000</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Local & Capacidade -->
          <div v-else-if="currentStep === 1" key="1" class="step-content" :class="{ 'slide-right': slideRight }">
            <div class="step-header">
              <span class="step-icon">📍</span>
              <div>
                <h2>{{ $t('createEvent.steps.location') }}</h2>
                <p>{{ $t('createEvent.fields.addressPlaceholder') }}</p>
              </div>
            </div>
            <div class="fields">
              <div class="form-group">
                <label>{{ $t('createEvent.fields.address') }} <span class="required">*</span></label>
                <div class="input-wrap">
                  <span class="material-symbols-outlined input-icon">location_on</span>
                  <input
                    v-model="form.endereco"
                    type="text"
                    :placeholder="$t('createEvent.fields.addressPlaceholder')"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>{{ $t('createEvent.fields.maxParticipants') }} <span class="required">*</span></label>
                <div class="input-wrap">
                  <span class="material-symbols-outlined input-icon">group</span>
                  <input
                    v-model.number="form.max_participants"
                    type="number"
                    min="1"
                    placeholder="e.g. 500"
                    class="form-input"
                  />
                </div>
                <div v-if="form.max_participants" class="capacity-preview">
                  <span class="material-symbols-outlined">info</span>
                  Up to <strong>{{ form.max_participants.toLocaleString() }}</strong> attendees
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Datas -->
          <div v-else-if="currentStep === 2" key="2" class="step-content" :class="{ 'slide-right': slideRight }">
            <div class="step-header">
              <span class="step-icon">📅</span>
              <div>
                <h2>{{ $t('createEvent.steps.dates') }}</h2>
                <p>{{ $t('createEvent.fields.startDate') }}</p>
              </div>
            </div>
            <div class="fields">
              <div class="form-group">
                <label>{{ $t('createEvent.fields.startDate') }} <span class="required">*</span></label>
                <div class="input-wrap">
                  <span class="material-symbols-outlined input-icon">calendar_today</span>
                  <input
                    v-model="form.starts_at"
                    type="datetime-local"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>{{ $t('createEvent.fields.endDate') }} <span class="required">*</span></label>
                <div class="input-wrap">
                  <span class="material-symbols-outlined input-icon">event_available</span>
                  <input
                    v-model="form.ends_at"
                    type="datetime-local"
                    class="form-input"
                    :min="form.starts_at"
                  />
                </div>
              </div>

              <div v-if="duration" class="duration-badge">
                <span class="material-symbols-outlined">schedule</span>
                Duration: <strong>{{ duration }}</strong>
              </div>
            </div>
          </div>

          <!-- Step 4: Banner & Status -->
          <div v-else-if="currentStep === 3" key="3" class="step-content" :class="{ 'slide-right': slideRight }">
            <div class="step-header">
              <span class="step-icon">🖼️</span>
              <div>
                <h2>{{ $t('createEvent.steps.media') }}</h2>
                <p>{{ $t('createEvent.fields.eventBanner') }}</p>
              </div>
            </div>
            <div class="fields">
              <!-- File upload -->
              <div class="form-group">
                <label>{{ $t('createEvent.fields.eventBanner') }}</label>
                <div
                  class="file-drop"
                  :class="{ 'has-file': bannerPreview, dragging: isDragging }"
                  @dragover.prevent="isDragging = true"
                  @dragleave="isDragging = false"
                  @drop.prevent="onDrop"
                  @click="fileInput?.click()"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="onFileChange"
                  />
                  <Transition name="fade" mode="out-in">
                    <div v-if="bannerPreview" key="preview" class="file-preview">
                      <img :src="bannerPreview" alt="Banner preview" />
                      <button class="remove-banner" @click.stop="removeBanner">
                        <span class="material-symbols-outlined">close</span>
                      </button>
                      <div class="preview-overlay">
                        <span class="material-symbols-outlined">photo_camera</span>
                        {{ $t('createEvent.fields.changeBanner') }}
                      </div>
                    </div>
                    <div v-else key="placeholder" class="file-placeholder">
                      <span class="material-symbols-outlined upload-icon">cloud_upload</span>
                      <p>Drag & drop or <span class="link-text">browse</span></p>
                      <span class="file-hint">PNG, JPG up to 10MB</span>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Status -->
              <div class="form-group">
                <label>Status <span class="required">*</span></label>
                <div class="status-options">
                  <label
                    v-for="opt in statusOptions"
                    :key="opt.value"
                    class="status-option"
                    :class="{ selected: form.status === opt.value }"
                  >
                    <input v-model="form.status" type="radio" :value="opt.value" />
                    <span class="status-dot" :class="opt.value"></span>
                    <div>
                      <span class="status-name">{{ opt.label }}</span>
                      <span class="status-desc">{{ opt.desc }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 5: Revisão -->
          <div v-else-if="currentStep === 4" key="4" class="step-content" :class="{ 'slide-right': slideRight }">
            <div class="step-header">
              <span class="step-icon">✅</span>
              <div>
                <h2>{{ $t('createEvent.review.title') }}</h2>
                <p>{{ $t('createEvent.review.subtitle') }}</p>
              </div>
            </div>
            <div class="review-grid">
              <div v-if="bannerPreview" class="review-banner">
                <img :src="bannerPreview" alt="Banner" />
              </div>
              <div class="review-items">
                <div class="review-item">
                  <span class="review-label">{{ $t('createEvent.review.eventName') }}</span>
                  <span class="review-value">{{ form.nome || '—' }}</span>
                </div>
                <div class="review-item">
                  <span class="review-label">{{ $t('createEvent.review.description') }}</span>
                  <span class="review-value review-desc">{{ form.descricao || '—' }}</span>
                </div>
                <div class="review-item">
                  <span class="review-label">{{ $t('createEvent.review.location') }}</span>
                  <span class="review-value">{{ form.endereco || '—' }}</span>
                </div>
                <div class="review-item">
                  <span class="review-label">{{ $t('createEvent.review.capacity') }}</span>
                  <span class="review-value">{{ form.max_participants ? form.max_participants.toLocaleString() + ' ' + $t('createEvent.review.people') : '—' }}</span>
                </div>
                <div class="review-item">
                  <span class="review-label">{{ $t('createEvent.review.startDate') }}</span>
                  <span class="review-value">{{ formatDate(form.starts_at) }}</span>
                </div>
                <div class="review-item">
                  <span class="review-label">{{ $t('createEvent.review.endDate') }}</span>
                  <span class="review-value">{{ formatDate(form.ends_at) }}</span>
                </div>
                <div class="review-item">
                  <span class="review-label">{{ $t('createEvent.review.status') }}</span>
                  <span class="review-value">
                    <span class="status-dot" :class="form.status"></span>
                    {{ statusOptions.find(o => o.value === form.status)?.label || '—' }}
                  </span>
                </div>
              </div>
            </div>
          </div>


        <!-- Navegação -->
        <div class="form-nav">
          <button v-if="currentStep > 0" class="btn-back" @click="goBack">
            <span class="material-symbols-outlined">arrow_back</span>
            {{ $t('createEvent.nav.back') }}
          </button>
          <div class="nav-right">
            <button v-if="currentStep < steps.length - 1" class="btn-next" @click="goNext">
              {{ $t('createEvent.nav.next') }}
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <button v-else class="btn-publish" @click="handleSubmit">
              <span class="material-symbols-outlined">rocket_launch</span>
              {{ $t('createEvent.nav.publish') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const steps = computed(() => [
  { label: $t('createEvent.steps.about') },
  { label: $t('createEvent.steps.location') },
  { label: $t('createEvent.steps.dates') },
  { label: $t('createEvent.steps.media') },
  { label: $t('createEvent.steps.review') },
])

const statusOptions = computed(() => [
  { value: 'draft',     label: $t('createEvent.status.draft'),     desc: $t('createEvent.status.draftDesc') },
  { value: 'published', label: $t('createEvent.status.published'), desc: $t('createEvent.status.publishedDesc') },
  { value: 'started',   label: $t('createEvent.status.started'),   desc: $t('createEvent.status.startedDesc') },
  { value: 'finished',  label: $t('createEvent.status.finished'),  desc: $t('createEvent.status.finishedDesc') },
  { value: 'cancelled', label: $t('createEvent.status.cancelled'), desc: $t('createEvent.status.cancelledDesc') },
])

const form = ref({
  nome: '',
  descricao: '',
  endereco: '',
  max_participants: null as number | null,
  starts_at: '',
  ends_at: '',
  status: 'draft',
  banner_url: null as File | null,
})

const currentStep = ref(0)
const slideRight = ref(false)
const bannerPreview = ref<string | null>(null)
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const progressWidth = computed(() => {
  if (steps.value.length <= 1) return '0%'
  return `${(currentStep.value / (steps.value.length - 1)) * 100}%`
})

const duration = computed(() => {
  if (!form.value.starts_at || !form.value.ends_at) return null
  const diff = new Date(form.value.ends_at).getTime() - new Date(form.value.starts_at).getTime()
  if (diff <= 0) return null
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
})

function goNext() {
  slideRight.value = false
  if (currentStep.value < steps.value.length - 1) currentStep.value++
}

function goBack() {
  slideRight.value = true
  if (currentStep.value > 0) currentStep.value--
}

function goToStep(i: number) {
  slideRight.value = i < currentStep.value
  currentStep.value = i
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) setFile(file)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) setFile(file)
}

function setFile(file: File) {
  form.value.banner_url = file
  bannerPreview.value = URL.createObjectURL(file)
}

function removeBanner() {
  form.value.banner_url = null
  bannerPreview.value = null
  if (fileInput.value) fileInput.value.value = ''
}

function formatDate(dt: string) {
  if (!dt) return '—'
  return new Date(dt).toLocaleString('en-US', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function handleSubmit() {
  console.log('Submit event:', form.value)
  // TODO: integrate with backend
}
</script>

<style scoped>
.create-page {
  min-height: 100vh;
  background: var(--bg);
  padding: 5rem 1rem 3rem;
  position: relative;
}

.create-bg-glow {
  position: fixed;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.back-btn {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
  z-index: 10;
}

.back-btn .material-symbols-outlined { font-size: 1.1rem; }
.back-btn:hover { color: var(--emerald); }

.create-container {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ── Header ── */
.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
}

.logo-dot { color: var(--emerald); }

.page-header h1 {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: var(--text);
  margin-bottom: 0.4rem;
}

.page-header p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* ── Step indicator ── */
.step-indicator {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

.step-line {
  position: absolute;
  top: 18px;
  left: 2rem;
  right: 2rem;
  height: 2px;
  background: var(--border-strong);
  z-index: 0;
}

.step-line-fill {
  height: 100%;
  background: var(--emerald);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 1;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 2px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: all 0.35s;
}

.step-circle .material-symbols-outlined { font-size: 1rem; }

.step-item.active .step-circle {
  background: var(--emerald);
  border-color: var(--emerald);
  color: #fff;
  box-shadow: 0 0 0 4px var(--emerald-glow);
}

.step-item.done .step-circle {
  background: var(--emerald-glow);
  border-color: var(--emerald-border);
  color: var(--emerald);
}

.step-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.3s;
}

.step-item.active .step-label { color: var(--emerald); }
.step-item.done .step-label { color: var(--text-muted); }

/* ── Card ── */
.form-card {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 24px;
  padding: 2.5rem 2.2rem;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

/* ── Step content ── */
.step-content { width: 100%; }

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.step-icon { font-size: 2rem; line-height: 1; }

.step-header h2 {
  font-size: 1.3rem;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.step-header p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* ── Fields ── */
.fields {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 600;
}

.required { color: var(--emerald); }

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.9rem;
  color: var(--text-dim);
  font-size: 1.05rem;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 0.85rem 3rem 0.85rem 2.8rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  border-color: var(--emerald-border);
  box-shadow: 0 0 0 3px var(--emerald-glow);
}

.form-input::placeholder { color: var(--text-dim); }

/* datetime-local color fix */
.form-input[type="datetime-local"] { color-scheme: dark; }
:root.light .form-input[type="datetime-local"] { color-scheme: light; }

.char-count {
  position: absolute;
  right: 0.9rem;
  font-size: 0.72rem;
  color: var(--text-dim);
  pointer-events: none;
}

.textarea-wrap {
  position: relative;
}

.form-textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s, box-shadow 0.2s;
  line-height: 1.6;
}

.form-textarea:focus {
  border-color: var(--emerald-border);
  box-shadow: 0 0 0 3px var(--emerald-glow);
}

.form-textarea::placeholder { color: var(--text-dim); }

.textarea-count {
  position: absolute;
  bottom: 0.6rem;
  right: 0.8rem;
  font-size: 0.72rem;
  color: var(--text-dim);
  pointer-events: none;
}

/* capacity preview */
.capacity-preview {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-muted);
  font-size: 0.82rem;
  padding: 0.5rem 0.8rem;
  background: var(--bg-elevated);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.capacity-preview .material-symbols-outlined { font-size: 0.9rem; color: var(--emerald); }

/* duration badge */
.duration-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--emerald-glow);
  border: 1px solid var(--emerald-border);
  border-radius: 10px;
  color: var(--emerald);
  font-size: 0.85rem;
}

.duration-badge .material-symbols-outlined { font-size: 1rem; }

/* ── File drop ── */
.file-drop {
  border: 2px dashed var(--border-strong);
  border-radius: 16px;
  min-height: 180px;
  cursor: pointer;
  transition: all 0.25s;
  overflow: hidden;
  position: relative;
}

.file-drop:hover,
.file-drop.dragging {
  border-color: var(--emerald-border);
  background: var(--emerald-glow);
}

.file-drop.has-file {
  border-style: solid;
  border-color: var(--emerald-border);
}

.file-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  height: 180px;
  color: var(--text-muted);
}

.upload-icon {
  font-size: 2.5rem !important;
  color: var(--text-dim);
  transition: color 0.2s, transform 0.2s;
}

.file-drop:hover .upload-icon,
.file-drop.dragging .upload-icon {
  color: var(--emerald);
  transform: translateY(-4px);
}

.file-placeholder p { font-size: 0.9rem; font-weight: 500; }
.link-text { color: var(--emerald); font-weight: 600; }
.file-hint { font-size: 0.75rem; color: var(--text-dim); }

.file-preview {
  position: relative;
  width: 100%;
  height: 220px;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s;
}

.preview-overlay .material-symbols-outlined { font-size: 1.5rem; }
.file-preview:hover .preview-overlay { opacity: 1; }

.remove-banner {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0,0,0,0.7);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.2s;
}

.remove-banner .material-symbols-outlined { font-size: 1rem; }
.remove-banner:hover { background: rgba(239,68,68,0.8); }

/* ── Status options ── */
.status-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.status-option {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1.1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.status-option input[type="radio"] { display: none; }

.status-option:hover {
  border-color: var(--border-strong);
}

.status-option.selected {
  border-color: var(--emerald-border);
  background: var(--emerald-glow);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.draft     { background: #6b7280; }
.status-dot.published { background: #10b981; }
.status-dot.started   { background: #3b82f6; }
.status-dot.finished  { background: #8b5cf6; }
.status-dot.cancelled { background: #ef4444; }

.status-name {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

.status-desc {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}

/* ── Review ── */
.review-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-banner {
  border-radius: 14px;
  overflow: hidden;
  height: 180px;
}

.review-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-items {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.review-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border);
}

.review-item:last-child { border-bottom: none; }

.review-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
  min-width: 80px;
}

.review-value {
  font-size: 0.88rem;
  color: var(--text);
  text-align: right;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.review-desc {
  text-align: right;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Form navigation ── */
.form-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.nav-right { margin-left: auto; }

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.2rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back .material-symbols-outlined { font-size: 1rem; }
.btn-back:hover { border-color: var(--border-strong); color: var(--text); }

.btn-next {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.8rem;
  background: var(--emerald);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 20px var(--emerald-glow);
}

.btn-next .material-symbols-outlined { font-size: 1rem; }
.btn-next:hover {
  background: var(--emerald-dim);
  transform: translateY(-1px);
  box-shadow: 0 0 30px rgba(16,185,129,0.35);
}

.btn-publish {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.8rem;
  background: var(--emerald);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 20px var(--emerald-glow);
}

.btn-publish .material-symbols-outlined { font-size: 1rem; }
.btn-publish:hover {
  background: var(--emerald-dim);
  transform: translateY(-1px);
  box-shadow: 0 0 30px rgba(16,185,129,0.4);
}

/* ── Animação dos steps (keyframes, sem depender de transitionend) ── */
@keyframes step-slide-left {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: none; }
}

@keyframes step-slide-right {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: none; }
}

.step-content {
  animation: step-slide-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.step-content.slide-right {
  animation-name: step-slide-right;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Mobile ── */
@media (max-width: 640px) {
  .create-page { padding: 4.5rem 1rem 2rem; }

  .form-card { padding: 1.5rem 1.2rem; border-radius: 18px; }

  .step-label { display: none; }

  .step-indicator { padding: 0; }

  .step-line { left: 1.5rem; right: 1.5rem; }

  .back-btn { top: 1rem; left: 1rem; }
}
</style>
