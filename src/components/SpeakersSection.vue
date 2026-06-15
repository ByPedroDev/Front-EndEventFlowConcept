<template>
  <section class="speakers-section">
    <div class="section-inner">
      <div class="section-header">
        <div>
          <div class="section-label">— Keynote Lineup</div>
          <h2>Featured Speakers</h2>
          <p>World-class thinkers shaping tomorrow's agenda</p>
        </div>
        <a href="#" class="view-all">
          View All
          <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>

    <div class="coverflow-scene" @keydown.left="prev" @keydown.right="next" tabindex="0">
      <div class="coverflow-track">
        <div
          v-for="(speaker, i) in speakers"
          :key="speaker.name"
          class="speaker-card"
          :class="{ active: i === current }"
          :style="cardStyle(i)"
          @click="current = i"
        >
          <div class="card-img">
            <img :src="speaker.img" :alt="speaker.name" />
            <div class="card-img-fade"></div>
          </div>
          <div class="card-body">
            <div class="card-name">{{ speaker.name }}</div>
            <div class="card-role">{{ speaker.role }}</div>
            <div class="card-topic">{{ speaker.topic }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="coverflow-nav">
      <button class="nav-btn" @click="prev">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <div class="nav-dots">
        <span
          v-for="(_, i) in speakers"
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
import { ref } from 'vue'

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

const current = ref(2)

function prev() {
  current.value = (current.value - 1 + speakers.length) % speakers.length
}

function next() {
  current.value = (current.value + 1) % speakers.length
}

const CARD_W = 260
const GAP = 60

function cardStyle(i: number): Record<string, string | number> {
  const offset = i - current.value
  const abs = Math.abs(offset)

  const tx = offset * (CARD_W * 0.58 + GAP)
  const tz = abs === 0 ? 0 : -abs * 100
  const ry = offset === 0 ? 0 : offset < 0 ? 42 : -42
  const scale = offset === 0 ? 1 : Math.max(0.68, 1 - abs * 0.15)

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

.view-all .material-symbols-outlined {
  font-size: 1rem;
}

.view-all:hover {
  gap: 0.6rem;
}

/* ── Coverflow scene ── */
.coverflow-scene {
  position: relative;
  width: 100%;
  height: 420px;
  perspective: 1100px;
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
  width: 260px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
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
}

.card-img {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.card-img-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg-card) 0%, transparent 55%);
  transition: var(--transition-theme);
}

.card-body {
  padding: 1.2rem 1.4rem 1.5rem;
}

.card-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.card-role {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.card-topic {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.45rem 0.8rem;
  font-size: 0.75rem;
  color: var(--emerald);
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: background 0.3s, border-color 0.3s;
}

.speaker-card.active .card-topic {
  background: var(--emerald-glow);
  border-color: var(--emerald-border);
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

.nav-btn .material-symbols-outlined {
  font-size: 1.3rem;
}

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
