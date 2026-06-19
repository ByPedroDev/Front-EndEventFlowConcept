<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import StatsBar from '@/components/StatsBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import SpeakersSection from '@/components/SpeakersSection.vue'
import EventsGrid from '@/components/EventsGrid.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div>
    <NavHeader />
    <main>
      <HeroSection />
      <StatsBar />
      <SearchBar />
      <SpeakersSection />
      <EventsGrid />
    </main>
    <FooterSection />
    <button class="fab">
      <span class="material-symbols-outlined">add</span>
    </button>
  </div>
</template>

<style scoped>
main {
  display: block;
  padding: 1.5rem 0;
}

main > * + * {
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  main {
    padding: 1rem 0;
  }

  main > * + * {
    margin-top: 1rem;
  }
}

.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  background: var(--emerald);
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
  transition: all 0.2s;
  z-index: 50;
}

.fab:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 40px rgba(16, 185, 129, 0.5);
}
</style>
