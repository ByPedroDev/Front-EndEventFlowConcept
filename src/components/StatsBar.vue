<template>
  <section class="stats-wrap">
    <div class="stats-bar">
      <div v-for="stat in stats" :key="stat.label" class="stat-item">
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '12k+', label: 'Events Created' },
  { value: '80k+', label: 'Attendees' },
  { value: '140+', label: 'Cities' },
  { value: '4.9★', label: 'Avg. Rating' },
]
</script>

<style scoped>
.stats-wrap {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 16px;
  overflow: hidden;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.4rem 1rem;
  gap: 0.2rem;
  border-right: 1px solid var(--border);
  transition: background 0.2s;
}

.stat-item:last-child {
  border-right: none;
}

.stat-item:hover {
  background: var(--bg-elevated);
}

.stat-value {
  font-family: 'Syne', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--emerald);
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
}

@media (max-width: 640px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-item:nth-child(2) {
    border-right: none;
  }

  .stat-item:nth-child(1),
  .stat-item:nth-child(2) {
    border-bottom: 1px solid var(--border);
  }
}
</style>
