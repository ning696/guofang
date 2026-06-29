<script setup lang="ts">
import ClassroomCard from '../base/ClassroomCard.vue'
import GlassPanel from '../base/GlassPanel.vue'
import type { Classroom } from '../../mocks/home'

defineProps<{
  classrooms: Classroom[]
}>()
</script>

<template>
  <GlassPanel class="classroom-panel">
    <h2>教室巡课</h2>
    <div class="classroom-scroll-container">
      <div class="classroom-grid">
        <ClassroomCard
          v-for="(classroom, index) in classrooms"
          :key="`${classroom.name}-${classroom.tone}-${index}`"
          :name="classroom.name"
        />
      </div>
    </div>
    <div class="scrollbar-track">
      <span class="scrollbar-thumb" aria-hidden="true"></span>
    </div>
  </GlassPanel>
</template>

<style scoped>
.classroom-panel {
  position: relative;
  max-height: 420px;
  padding: 24px 30px 20px;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 0 24px;
  color: #191c1e;
  font: 600 24px/32px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  flex: 0 0 auto;
}

.classroom-scroll-container {
  flex: 0 1 auto;
  min-height: 0;
  max-height: 284px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 18px;
}

.classroom-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.classroom-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.classroom-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.classroom-scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.12);
}

.classroom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(222px, 1fr));
  gap: 20px;
}

.scrollbar-track {
  display: none;
}

.scrollbar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 110px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.08);
}

@media (max-width: 1320px) {
  .classroom-grid {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
}

@media (max-width: 1040px) {
  .classroom-panel {
    max-height: none;
    height: auto;
  }

  .classroom-scroll-container {
    max-height: none;
    overflow-y: visible;
  }

  .classroom-grid {
    grid-template-columns: repeat(3, minmax(180px, 1fr));
  }

  .scrollbar-track {
    display: none;
  }
}

@media (max-width: 720px) {
  .classroom-panel {
    padding: 20px 18px;
  }

  .classroom-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
