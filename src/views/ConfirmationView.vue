<template>
  <div class="confirmation-page">
    <div class="confirmation-bg-glow"></div>

    <div class="confirmation-card">
      <template v-if="isPending">
        <span class="confirmation-icon spinning">
          <span class="material-symbols-outlined">progress_activity</span>
        </span>
        <h1 class="confirmation-title">Confirming...</h1>
        <p class="confirmation-message">Please wait while we confirm your presence.</p>
      </template>

      <template v-else-if="isError">
        <span class="confirmation-icon error">
          <span class="material-symbols-outlined">error</span>
        </span>
        <h1 class="confirmation-title">Confirmation Failed</h1>
        <p class="confirmation-message">{{ error?.message || 'Something went wrong' }}</p>
        <RouterLink to="/" class="confirmation-btn">Back to Home</RouterLink>
      </template>

      <template v-else>
        <span class="confirmation-icon success">
          <span class="material-symbols-outlined">check_circle</span>
        </span>
        <h1 class="confirmation-title">You confirmed your presence successfully!</h1>
        <p class="confirmation-message">Thank you for confirming. We look forward to seeing you at the event.</p>
        <RouterLink to="/" class="confirmation-btn">Back to Home</RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { useConfirmCheckin } from '@/api/composables/useEvents'

const route = useRoute()
const { isPending, isError, error } = useConfirmCheckin(route.params.confirmationId as string)
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  position: relative;
  padding: 2rem;
}

.confirmation-bg-glow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.confirmation-card {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 1;
}

.confirmation-icon {
  display: block;
  margin-bottom: 1.2rem;
}

.confirmation-icon .material-symbols-outlined {
  font-size: 3.5rem;
}

.confirmation-icon.success .material-symbols-outlined {
  color: #10b981;
}

.confirmation-icon.error .material-symbols-outlined {
  color: #ef4444;
}

.confirmation-icon.spinning .material-symbols-outlined {
  color: var(--emerald);
}

.confirmation-title {
  font-size: 1.3rem;
  color: var(--text);
  margin-bottom: 0.7rem;
  line-height: 1.4;
}

.confirmation-message {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.confirmation-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 2rem;
  background: var(--emerald);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 20px var(--emerald-glow);
}

.confirmation-btn:hover {
  background: var(--emerald-dim);
  transform: translateY(-1px);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.confirmation-icon.spinning .material-symbols-outlined {
  animation: spin 1s linear infinite;
}
</style>
