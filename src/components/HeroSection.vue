<template>
  <section style="max-width: 1440px; margin: 2rem auto; padding: 0 2rem">
    <div class="hero" style="margin: 0; border-radius: 24px">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9JuJlPv-U3qDfu3964lPjr0hXhjEzrZjJQHeRkFL3WcO2xGugjKG7vfU5iYm6qhnYH0dwWxdB1l6O3YBeCPKD0L_5mEHKV08gxPLv5IR4vaC2Zg10azF1e73ekE9QwaEKtqBymrCjO4fzLDOv-QFcGVImv02unjk0cO4BD71BVExBpVtv0jskP-laK2GljNl5k2M9ZiZy7unleXN_a5FulmXyohLM7sC4D6EzD44rQoV9Nbc8-g2tm6FBHLiDVAZ3j4gR3QM_224o"
        alt="Hero"
      />
      <div class="hero-overlay">
        <div>
          <div class="hero-badge">{{ $t('hero.badge') }}</div>
          <h1>{{ $t('hero.titlePre') }} <span>{{ $t('hero.titleHighlight') }}</span> {{ $t('hero.titlePost') }}</h1>
          <p>{{ $t('hero.subtitle') }}</p>
          <div class="hero-actions">
            <button class="btn-hero">{{ $t('hero.registerNow') }}</button>
            <button class="btn-ghost">{{ $t('hero.viewAgenda') }}</button>
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
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()
</script>

<style scoped>
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
    var(--hero-overlay-start) 0%,
    var(--hero-overlay-mid) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  transition: var(--transition-theme);
}

@media (max-width: 768px) {
  .hero {
    height: 420px;
    margin-top: 1rem;
  }

  .hero-overlay {
    padding: 2rem;
    background: linear-gradient(
      180deg,
      var(--hero-overlay-start) 0%,
      var(--hero-overlay-mid) 60%,
      transparent 100%
    );
  }

  .hero-dots {
    bottom: 1rem;
    right: 1.2rem;
  }
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
</style>
