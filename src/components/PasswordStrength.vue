<template>
  <div v-if="password.length > 0" class="strength-wrap">
    <div class="strength-bars">
      <span
        v-for="n in 4"
        :key="n"
        class="bar"
        :class="barClass(n)"
      ></span>
    </div>
    <span class="strength-label" :class="level.key">{{ level.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ password: string }>()

const score = computed(() => {
  const p = props.password
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const levels = [
  { key: 'weak',   label: 'Weak' },
  { key: 'fair',   label: 'Fair' },
  { key: 'good',   label: 'Good' },
  { key: 'strong', label: 'Strong' },
] as const

const level = computed(() => levels[Math.max(0, score.value - 1)] as { key: string; label: string })

function barClass(n: number) {
  if (n > score.value) return ''
  return level.value.key
}
</script>

<style scoped>
.strength-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.4rem;
}

.strength-bars {
  display: flex;
  gap: 4px;
  flex: 1;
}

.bar {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: var(--border);
  transition: background 0.3s;
}

.bar.weak   { background: #ef4444; }
.bar.fair   { background: #f59e0b; }
.bar.good   { background: #3b82f6; }
.bar.strong { background: var(--emerald); }

.strength-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.strength-label.weak   { color: #ef4444; }
.strength-label.fair   { color: #f59e0b; }
.strength-label.good   { color: #3b82f6; }
.strength-label.strong { color: var(--emerald); }
</style>
