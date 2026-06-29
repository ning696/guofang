<script setup lang="ts">
import GlassPanel from '../base/GlassPanel.vue'
import type { PatrolRecord } from '../../mocks/home'

defineProps<{
  records: PatrolRecord[]
}>()
</script>

<template>
  <GlassPanel class="recent-panel">
    <h2>最近巡课</h2>
    <div class="recent-scroll-container">
      <div class="recent-row">
        <article
          v-for="(record, index) in records"
          :key="`${record.course}-${index}`"
          class="course-card"
          :class="{ dimmed: record.dimmed }"
        >
          <strong class="course-title">{{ record.course }}</strong>
          <span v-if="record.teacher" class="course-meta">{{ record.teacher }}</span>
          <span class="course-meta">{{ record.room }}</span>
        </article>
      </div>
    </div>
  </GlassPanel>
</template>

<style scoped>
.recent-panel {
  position: relative;
  height: 216px;
  padding: 24px 30px;
  overflow: hidden;
}

h2 {
  margin: 0 0 16px;
  color: #191c1e;
  font: 600 24px/32px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.recent-scroll-container {
  height: 136px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
}

.recent-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.recent-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.recent-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.recent-scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.12);
}

.recent-row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 220px;
  gap: 20px;
  height: 120px;
}

.course-card {
  display: grid;
  place-items: center;
  align-content: center;
  height: 120px;
  padding: 20px 16px;
  box-sizing: border-box;
  border: 0.06rem solid #e3e9f6;
  border-radius: 0.75rem;
  background: linear-gradient(0deg, #eff5fd 0%, #ebf0fd 100%);
}

.course-card:hover {
  box-sizing: border-box;
  border: 0.06rem solid #1947ff;
  border-radius: 0.75rem;
  background: linear-gradient(0deg, #eff5fd 0%, #ebf0fd 100%);
  box-shadow: 0rem 0.63rem 1.25rem 0rem rgba(190, 198, 223, 0.5);
}

.course-card.dimmed {
  opacity: 0.48;
}

.course-title {
  width: 100%;
  overflow: hidden;
  color: #000;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 1.13rem;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  letter-spacing: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-meta {
  margin-top: 6px;
  color: #373737;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 0.88rem;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: normal;
}

@media (max-width: 1440px) {
  .recent-row {
    grid-auto-flow: initial;
    grid-auto-columns: initial;
    grid-template-columns: repeat(4, minmax(170px, 1fr));
  }
}

@media (max-width: 1040px) {
  .recent-panel {
    height: auto;
  }

  .recent-scroll-container {
    height: auto;
    overflow-x: hidden;
    overflow-y: visible;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .recent-row {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    height: auto;
  }
}

@media (max-width: 560px) {
  .recent-panel {
    padding: 20px 18px;
  }

  .recent-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
