<template>
  <header :class="{ hidden }" @mouseenter="hidden = false">
    <div class="nav-inner">
      <RouterLink to="/" class="logo">EventFlow<span class="logo-dot">.</span></RouterLink>

      <nav class="desktop-nav">
        <a href="#" class="active">{{ $t('nav.discover') }}</a>
        <a href="#">{{ $t('nav.schedule') }}</a>
        <a href="#">{{ $t('nav.speakers') }}</a>
        <a href="#">{{ $t('nav.venues') }}</a>
      </nav>

      <div class="nav-actions">
        <button class="lang-toggle" @click="toggleLocale" :title="currentLocale === 'pt' ? 'Switch to English' : 'Mudar para Português'">
          {{ currentLocale === 'pt' ? 'EN' : 'PT' }}
        </button>
        <button class="theme-toggle" @click="toggle" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <span class="theme-emoji">{{ isDark ? '🌙' : '☀️' }}</span>
        </button>
        <RouterLink to="/login" class="btn-signin desktop-only">{{ $t('nav.signIn') }}</RouterLink>
        <RouterLink to="/create-event" class="btn-primary desktop-only">{{ $t('nav.createEvent') }}</RouterLink>
        <button class="icon-btn desktop-only">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <button class="icon-btn desktop-only">
          <span class="material-symbols-outlined">account_circle</span>
        </button>
        <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile drawer renderizado fora do header para evitar problemas de stacking context -->
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="menuOpen" class="mobile-overlay" @click="menuOpen = false"></div>
    </Transition>

    <Transition name="drawer">
      <div v-if="menuOpen" class="mobile-drawer">
        <nav class="drawer-nav">
          <a href="#" class="active" @click="menuOpen = false">{{ $t('nav.discover') }}</a>
          <a href="#" @click="menuOpen = false">{{ $t('nav.schedule') }}</a>
          <a href="#" @click="menuOpen = false">{{ $t('nav.speakers') }}</a>
          <a href="#" @click="menuOpen = false">{{ $t('nav.venues') }}</a>
        </nav>
        <div class="drawer-actions">
          <RouterLink to="/login" class="btn-signin-full" @click="menuOpen = false">{{ $t('nav.signIn') }}</RouterLink>
          <RouterLink to="/create-event" class="btn-primary-full" @click="menuOpen = false">{{ $t('nav.createEvent') }}</RouterLink>
          <button class="lang-toggle-full" @click="toggleLocale">
            {{ currentLocale === 'pt' ? '🌐 English' : '🌐 Português' }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import { setLocale } from '@/i18n'

const { isDark, toggle } = useTheme()
const { t: $t, locale } = useI18n()
const menuOpen = ref(false)
const hidden = ref(false)

const currentLocale = computed(() => locale.value)
function toggleLocale() {
  setLocale(locale.value === 'pt' ? 'en' : 'pt')
}

let lastY = 0
function onScroll() {
  const y = window.scrollY
  hidden.value = y > lastY && y > 80
  lastY = y
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-nav);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), var(--transition-theme);
}

header.hidden {
  transform: translateY(-100%);
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
  text-decoration: none;
  flex-shrink: 0;
}

.logo-dot {
  color: var(--emerald);
  font-size: 1.8rem;
  line-height: 1;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.desktop-nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.2s;
}

.desktop-nav a.active,
.desktop-nav a:hover {
  color: var(--emerald);
}

.desktop-nav a.active {
  position: relative;
}

.desktop-nav a.active::after {
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

.lang-toggle {
  height: 38px;
  padding: 0 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.lang-toggle:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
  background: var(--emerald-glow);
}

.theme-toggle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: var(--bg-elevated);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
  overflow: hidden;
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: var(--emerald-border);
  background: var(--emerald-glow);
  transform: scale(1.08);
}

.theme-emoji {
  font-size: 1.1rem;
  line-height: 1;
  display: block;
  animation: theme-spin 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes theme-spin {
  0%   { transform: rotate(-90deg) scale(0.5); opacity: 0; }
  100% { transform: rotate(0deg)   scale(1);   opacity: 1; }
}

.btn-signin {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border-strong);
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-signin:hover {
  color: var(--emerald);
  border-color: var(--emerald-border);
  background: var(--emerald-glow);
}

/* ── Hamburger ── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Mobile breakpoint ── */
@media (max-width: 768px) {
  .nav-inner { padding: 0 1.2rem; }
  .desktop-nav { display: none; }
  .desktop-only { display: none !important; }
  .hamburger { display: flex; }
  .lang-toggle { display: none; }
}
</style>

<style>
/* Estilos globais do drawer (fora do scoped pois é via Teleport no body) */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 200;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: var(--bg-card);
  border-left: 1px solid var(--border-strong);
  z-index: 201;
  display: flex;
  flex-direction: column;
  padding: 5rem 1.5rem 2rem;
  gap: 0;
  overflow-y: auto;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
}

.drawer-nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s;
}

.drawer-nav a.active,
.drawer-nav a:hover {
  color: var(--emerald);
}

.drawer-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 2rem;
}

.btn-signin-full {
  display: block;
  text-align: center;
  padding: 0.8rem;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  color: var(--text-muted);
  text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-signin-full:hover {
  color: var(--emerald);
  border-color: var(--emerald-border);
  background: var(--emerald-glow);
}

.btn-primary-full {
  display: block;
  width: 100%;
  padding: 0.85rem;
  background: var(--emerald);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  text-align: center;
}

.btn-primary-full:hover {
  background: var(--emerald-dim);
}

.lang-toggle-full {
  display: block;
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.lang-toggle-full:hover {
  color: var(--emerald);
  border-color: var(--emerald-border);
  background: var(--emerald-glow);
}

/* Transições do drawer */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
