<template>
  <section style="max-width: 1440px; margin: 2rem auto; padding: 0 2rem">
    <div class="search-bar">
      <div class="search-row">
        <div class="search-input-wrap">
          <span class="material-symbols-outlined search-icon">search</span>
          <input class="search-input" type="text" :placeholder="$t('search.placeholder')" />
        </div>
        <button class="filter-btn">
          <span class="material-symbols-outlined" style="font-size: 1.1rem">calendar_today</span>
          {{ $t('search.anyDate') }}
        </button>
        <button class="filter-btn">
          <span class="material-symbols-outlined" style="font-size: 1.1rem">category</span>
          {{ $t('search.category') }}
        </button>
        <button class="filter-btn-icon">
          <span class="material-symbols-outlined" style="font-size: 1.1rem">tune</span>
        </button>
      </div>
      <div class="chips">
        <span
          v-for="chip in chips"
          :key="chip"
          class="chip"
          :class="{ active: activeChip === chip }"
          @click="activeChip = chip"
          >{{ chip }}</span
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()
const chips = ['#Technology', '#Wellness', '#Business', '#Music', '#Workshops']
const activeChip = ref('#Technology')
</script>

<style scoped>
.search-bar {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  margin: 0 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .search-bar {
    margin: 0;
    border-radius: 16px;
    padding: 1.2rem 1rem;
  }

  .search-row {
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .search-input-wrap {
    flex: 1 1 100%;
  }

  .filter-btn {
    flex: 1;
    justify-content: center;
  }

  .filter-btn-icon {
    flex-shrink: 0;
  }
}

.search-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input-wrap {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 3rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: var(--emerald-border);
  box-shadow: 0 0 0 3px var(--emerald-glow);
}

.search-input::placeholder {
  color: var(--text-dim);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.3rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
}

.filter-btn-icon {
  background: var(--emerald);
  color: #fff;
  border: none;
  padding: 0.9rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}

.filter-btn-icon:hover {
  background: var(--emerald-dim);
}

.chips {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1.2rem;
}

.chip {
  padding: 0.35rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s;
}

.chip.active {
  background: var(--emerald-glow);
  border-color: var(--emerald-border);
  color: var(--emerald);
}

.chip:not(.active) {
  background: var(--bg-elevated);
  border-color: var(--border);
  color: var(--text-muted);
}

.chip:not(.active):hover {
  border-color: var(--emerald-border);
  color: var(--emerald);
}
</style>
