<script setup lang="ts">
import GlassPanel from '../base/GlassPanel.vue'
import StatCard from './StatCard.vue'
import type { StatCard as StatCardData } from '../../mocks/home'

defineProps<{
  stats: StatCardData[]
}>()
</script>

<template>
  <GlassPanel class="stats-panel">
    <StatCard v-for="stat in stats" :key="stat.label" :stat="stat" />
  </GlassPanel>
</template>

<style scoped>
.stats-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
  height: 200px;
  padding: 30px;
}

@media (max-width: 1040px) {
  .stats-panel {
    grid-template-columns: 1fr;
    height: auto;
    gap: 16px;
  }
}

@media (max-width: 560px) {
  .stats-panel {
    padding: 18px;
  }
}
</style>
