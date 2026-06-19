<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo">EventFlow<span class="logo-dot">.</span></div>
        <p>{{ $t('footer.copyright') }}</p>
      </div>
      <div class="footer-links">
        <a href="#">{{ $t('footer.privacy') }}</a>
        <a href="#">{{ $t('footer.terms') }}</a>
        <a href="#">{{ $t('footer.help') }}</a>
        <a href="#">{{ $t('footer.api') }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()
</script>

<style scoped>
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

.logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.04em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}

.logo-dot {
  color: var(--emerald);
  font-size: 1.8rem;
  line-height: 1;
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

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.2rem;
  }

  .footer-links {
    justify-content: center;
    gap: 1.2rem;
  }
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
</style>
