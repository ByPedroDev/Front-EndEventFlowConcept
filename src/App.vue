<script setup lang="ts">
import { RouterView } from 'vue-router'
// Alteramos './components/...' para './views/...'
import EventFlow from './views/EventFlow.vue'
</script>

<template>
  <main>
    <EventFlow />
  </main>
  <RouterView />
</template>
